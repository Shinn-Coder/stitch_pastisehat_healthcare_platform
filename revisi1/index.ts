import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI, Content, Part } from '@google/generative-ai';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors());
app.use(express.json({ limit: '20mb' }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const CICI_SYSTEM_PROMPT = `Kamu adalah Cici, asisten kesehatan AI milik PastiSehat di RS Louis Surabaya.
Kepribadianmu: ramah, empatik, profesional, dan berbicara dalam Bahasa Indonesia yang hangat dan natural.

Tugasmu:
1. Dengarkan keluhan pasien dengan seksama.
2. Lakukan skrining awal berdasarkan gejala yang disebutkan.
3. Berikan saran umum (istirahat, minum air, dll).
4. Rekomendasikan spesialis dokter yang tepat jika diperlukan.
5. Jika pasien setuju untuk membuat janji temu, panggil tool "buat_janji_temu_dokter".

PENTING:
- Jangan pernah memberikan diagnosis medis definitif.
- Selalu ingatkan pasien untuk berkonsultasi langsung dengan dokter.
- Jika ada gejala darurat (nyeri dada hebat, sesak napas berat, pingsan), segera arahkan ke UGD.
- Ketika pasien mengkonfirmasi ingin booking dokter (misal: "ya", "iya", "saya mau", "tolong booking", "setuju"), LANGSUNG panggil tool buat_janji_temu_dokter.
- Jika ada gambar yang dikirim, analisis gambar tersebut sebagai bagian dari keluhan visual pasien (misal: foto ruam, luka, dll).

Format respons: kalimat natural, bisa gunakan emoji kesehatan sesekali. Jangan terlalu panjang per pesan.`;

const tools = [
  {
    functionDeclarations: [
      {
        name: 'buat_janji_temu_dokter',
        description: 'Membuat jadwal janji temu dokter untuk pasien. Panggil ini saat pasien setuju untuk booking.',
        parameters: {
          type: 'object',
          properties: {
            doctorName: { type: 'string', description: 'Nama dokter yang direkomendasikan' },
            specialization: { type: 'string', description: 'Spesialisasi dokter' },
            scheduledTime: { type: 'string', description: 'Waktu janji temu format ISO 8601. Default besok jam 10.' },
            summary: { type: 'string', description: 'Ringkasan gejala dan alasan konsultasi' },
          },
          required: ['doctorName', 'specialization', 'summary'],
        },
      },
    ],
  },
];

async function getOrCreateDemoUser(userId: string) {
  let user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        email: `demo_${userId.replace(/[^a-zA-Z0-9]/g, '')}@pastisehat.id`,
        password: 'demo_hashed',
        fullName: 'Pasien Demo',
        dob: new Date('1990-01-01'),
        address: 'Surabaya, Jawa Timur',
        medicalHistory: [],
      },
    });
  }
  return user;
}

async function executeTool(toolName: string, toolArgs: Record<string, string>, userId: string): Promise<string> {
  if (toolName === 'buat_janji_temu_dokter') {
    try {
      await getOrCreateDemoUser(userId);
      const scheduledDate = toolArgs.scheduledTime ? new Date(toolArgs.scheduledTime) : new Date(Date.now() + 24 * 60 * 60 * 1000);
      const appointment = await prisma.appointment.create({
        data: {
          userId,
          doctorName: toolArgs.doctorName,
          date: scheduledDate,
          summary: toolArgs.summary,
          status: 'Scheduled',
        },
      });
      console.log(`[Prisma] ✅ Appointment created: ${appointment.id}`);
      return JSON.stringify({ success: true, appointmentId: appointment.id, doctorName: appointment.doctorName, date: appointment.date.toISOString() });
    } catch (error) {
      console.error('[Prisma] Error:', error);
      return JSON.stringify({ success: false, error: 'Gagal membuat janji temu' });
    }
  }
  return JSON.stringify({ success: false, error: 'Tool tidak dikenal' });
}

// POST /api/chat
app.post('/api/chat', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { message, userId, history } = req.body;
    const imageFile = req.file;

    if (!message && !imageFile) return res.status(400).json({ error: 'Pesan atau gambar diperlukan' });

    const currentUserId = userId || 'demo-user-001';

    let chatHistory: Content[] = [];
    if (history) {
      try {
        const parsed = JSON.parse(history);
        chatHistory = parsed.map((msg: { role: string; content: string }) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }));
      } catch (_) {}
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: CICI_SYSTEM_PROMPT,
      tools: tools as any,
    });

    const chat = model.startChat({ history: chatHistory });

    const parts: Part[] = [];
    if (imageFile) {
      parts.push({ inlineData: { mimeType: imageFile.mimetype as any, data: imageFile.buffer.toString('base64') } });
    }
    if (message) parts.push({ text: message });

    let result = await chat.sendMessage(parts);
    let response = result.response;

    let finalReplyText = '';
    let appointmentCreated = false;
    let appointmentData: Record<string, string> | null = null;

    const candidates = response.candidates || [];
    let hasFunctionCall = false;
    for (const candidate of candidates) {
      for (const part of candidate.content?.parts || []) {
        if (part.functionCall) {
          hasFunctionCall = true;
          const { name, args } = part.functionCall;
          console.log(`[Tool Call] ${name}`, args);
          const toolResult = await executeTool(name, args as Record<string, string>, currentUserId);
          const toolResultParsed = JSON.parse(toolResult);
          if (toolResultParsed.success) { appointmentCreated = true; appointmentData = toolResultParsed; }
          const followUp = await chat.sendMessage([{ functionResponse: { name, response: toolResultParsed } }]);
          response = followUp.response;
        }
      }
    }

    finalReplyText = response.text();
    return res.json({ reply: finalReplyText, appointmentCreated, appointmentData, userId: currentUserId });
  } catch (error) {
    console.error('[/api/chat] Error:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan internal.', detail: error instanceof Error ? error.message : String(error) });
  }
});

// POST /api/chat/voice
app.post('/api/chat/voice', upload.single('audio'), async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'File audio diperlukan' });
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent([
      { inlineData: { mimeType: req.file.mimetype as any, data: req.file.buffer.toString('base64') } },
      { text: 'Transkripsi audio ini ke teks Bahasa Indonesia. Kembalikan HANYA teks transkripsi.' },
    ]);
    return res.json({ transcript: result.response.text().trim() });
  } catch (error) {
    console.error('[/api/chat/voice] Error:', error);
    return res.status(500).json({ error: 'Gagal memproses audio' });
  }
});

// GET /api/appointments/:userId
app.get('/api/appointments/:userId', async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.params.userId },
      orderBy: { date: 'desc' },
    });
    return res.json({ appointments });
  } catch (error) {
    return res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'pastisehat-backend', version: '2.0.0' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend PastiSehat berjalan di http://localhost:${PORT}`);
});
