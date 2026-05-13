import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'pastisehat-backend' });
});

// Endpoint untuk AI Chat (Cici)
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    // TODO: Implement Google AI Studio SDK (Gemini Flash)
    // dengan prompt Cici yang sudah didefinisikan di Blueprint
    
    res.json({
      reply: "Ini adalah respon sementara dari Cici di backend. AI Studio SDK segera diintegrasikan.",
      originalMessage: message
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan internal" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
