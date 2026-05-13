# 🚀 PastiSehat — Panduan Setup End-to-End

## Prerequisites
- Node.js 18+
- PostgreSQL (atau Docker)
- Google Gemini API Key (gratis di https://aistudio.google.com/apikey)

---

## 1. Setup Database (PostgreSQL)

### Opsi A: Docker (paling cepat)
```bash
docker run --name pastisehat-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=pastisehat_db \
  -p 5432:5432 -d postgres:15
```

### Opsi B: PostgreSQL lokal
Buat database baru bernama `pastisehat_db`.

---

## 2. Setup Backend

```bash
cd backend

# Install dependencies (termasuk @google/generative-ai dan multer yang baru ditambahkan)
npm install

# Buat file .env dari template
cp .env.example .env
# → Edit .env: isi GEMINI_API_KEY dan DATABASE_URL

# Jalankan migrasi Prisma (buat tabel User + Appointment)
npx prisma db push

# Jalankan backend
npm run dev
# ✅ Server berjalan di http://localhost:8000
```

---

## 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Buat file .env.local dari template
cp .env.local.example .env.local
# → Pastikan NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Jalankan frontend
npm run dev
# ✅ Frontend berjalan di http://localhost:3000
```

---

## 4. Tes End-to-End

1. Buka http://localhost:3000/cici
2. Ketik keluhan: *"Saya sudah 2 hari pusing dan sakit tenggorokan"*
3. Cici akan merespons dengan analisis dan rekomendasi dokter
4. Ketik: *"Iya saya mau booking dokter"*
5. Cici akan **otomatis memanggil tool** → data tersimpan ke PostgreSQL
6. Toast notifikasi hijau muncul: **Janji Temu Dibuat!** 🎉
7. Upload foto (mis. foto ruam) → Gemini akan menganalisis gambar
8. Klik ikon Mic → rekam suara → Gemini transkripsi otomatis

---

## 5. Arsitektur End-to-End

```
[Browser / Next.js]
      │
      │  POST /api/chat (FormData: message, userId, history, image?)
      ▼
[Express Backend :8000]
      │
      ├─→ [Gemini 2.0 Flash] ← sistem prompt Cici + tool definition
      │         │
      │         ▼ (jika pasien setuju booking)
      │    functionCall: buat_janji_temu_dokter(...)
      │         │
      ├─→ [Prisma ORM]
      │         │
      │         ▼
      └─→ [PostgreSQL] → tabel Appointment dibuat ✅
      │
      ▼
[Response JSON: { reply, appointmentCreated, appointmentData }]
      │
      ▼
[Frontend: tampilkan pesan + toast notifikasi]
```

---

## 6. API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/chat` | Chat dengan Cici (teks + gambar multipart) |
| POST | `/api/chat/voice` | Upload audio → transkripsi via Gemini |
| GET | `/api/appointments/:userId` | Ambil riwayat janji temu user |
| GET | `/health` | Health check server |
