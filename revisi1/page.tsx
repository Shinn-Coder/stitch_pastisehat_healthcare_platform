"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Activity, LayoutDashboard, Bot, History,
  Stethoscope, HelpCircle, Calendar, Settings, LogOut,
  Bell, UserCircle, User, Star, ImageIcon, Mic, Send,
  MicOff, X, CheckCircle, AlertCircle, Loader2
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type MessageRole = "user" | "ai";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  imagePreview?: string;
  timestamp: Date;
}

interface AppointmentData {
  appointmentId: string;
  doctorName: string;
  date: string;
}

// Dummy user ID (nanti diganti dengan auth session yang nyata)
const DEMO_USER_ID = "demo-user-pastisehat-001";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// ─── Komponen Pesan AI ────────────────────────────────────────
function AiMessage({ content }: { content: string }) {
  return (
    <div className="flex gap-4 max-w-3xl">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
        <Bot className="w-5 h-5 text-on-primary-container" />
      </div>
      <div className="glass-bubble-ai rounded-2xl rounded-tl-none p-5 text-on-surface-variant">
        <p className="font-body-md text-body-md whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

// ─── Komponen Pesan User ──────────────────────────────────────
function UserMessage({ content, imagePreview }: { content: string; imagePreview?: string }) {
  return (
    <div className="flex gap-4 max-w-3xl ml-auto flex-row-reverse">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
        <User className="w-5 h-5 text-white" />
      </div>
      <div className="bg-primary text-white rounded-2xl rounded-tr-none p-5 shadow-lg shadow-primary/20 space-y-2">
        {imagePreview && (
          <img src={imagePreview} alt="Foto keluhan" className="max-w-xs rounded-xl" />
        )}
        {content && <p className="font-body-md text-body-md">{content}</p>}
      </div>
    </div>
  );
}

// ─── Komponen Typing Indicator ────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex gap-4 max-w-3xl">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
        <Bot className="w-5 h-5 text-on-primary-container" />
      </div>
      <div className="flex gap-1.5 p-4 glass-bubble-ai rounded-2xl rounded-tl-none items-center">
        <div className="w-2 h-2 bg-outline-variant rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-outline-variant rounded-full animate-bounce [animation-delay:0.2s]" />
        <div className="w-2 h-2 bg-outline-variant rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
}

// ─── Toast Notifikasi ─────────────────────────────────────────
function AppointmentToast({ data, onClose }: { data: AppointmentData; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-32 right-6 z-50 bg-primary text-white rounded-2xl p-4 shadow-2xl shadow-primary/30 flex items-start gap-3 max-w-xs animate-in slide-in-from-bottom-4">
      <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-bold text-sm">✅ Janji Temu Dibuat!</p>
        <p className="text-xs opacity-80 mt-1">
          {data.doctorName} — {new Date(data.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
        <p className="text-xs opacity-60 mt-0.5">ID: {data.appointmentId.slice(0, 8)}...</p>
      </div>
      <button onClick={onClose} className="ml-auto opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function Cici() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "ai",
      content: "Halo! Saya Cici, asisten kesehatan AI Anda 👋\n\nBagaimana perasaan Anda hari ini? Ceritakan gejala yang Anda rasakan agar saya bisa membantu melakukan skrining awal.\n\nSesi ini bersifat privasi dan terenkripsi 🔒",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [appointmentToast, setAppointmentToast] = useState<AppointmentData | null>(null);
  const [detectedSymptoms, setDetectedSymptoms] = useState<string[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Auto-scroll ke bawah setiap ada pesan baru
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // ── Kirim pesan ke backend ──────────────────────────────────
  const handleKirimPesan = useCallback(async (pesanTeks: string, gambar?: File) => {
    const teks = pesanTeks.trim();
    if (!teks && !gambar) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: teks,
      imagePreview: gambar ? URL.createObjectURL(gambar) : undefined,
      timestamp: new Date(),
    };

    // Update state: tambah pesan user, bersihkan input
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setSelectedImage(null);
    setImagePreview(null);
    setIsLoading(true);

    // Deteksi gejala sederhana dari teks (bisa diperluas)
    const gejalaKeywords = ["pusing", "demam", "batuk", "pilek", "nyeri", "sakit", "mual", "sesak", "lelah", "lemas"];
    const ditemukan = gejalaKeywords.filter((g) => teks.toLowerCase().includes(g));
    if (ditemukan.length > 0) setDetectedSymptoms((prev) => [...new Set([...prev, ...ditemukan])]);

    try {
      // Ambil history untuk konteks percakapan
      const historyForApi = messages.map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content,
      }));

      const formData = new FormData();
      formData.append("message", teks);
      formData.append("userId", DEMO_USER_ID);
      formData.append("history", JSON.stringify(historyForApi));
      if (gambar) formData.append("image", gambar);

      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.reply || "Maaf, saya tidak bisa memproses pesan Anda saat ini.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Tampilkan toast jika ada appointment yang dibuat
      if (data.appointmentCreated && data.appointmentData) {
        setAppointmentToast(data.appointmentData);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "ai",
          content: "Maaf, terjadi kesalahan saat menghubungi server 😔 Pastikan backend sudah berjalan, lalu coba lagi ya.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  // ── Handle Submit (Enter atau klik Send) ────────────────────
  const handleSubmit = () => {
    if (!isLoading && (inputText.trim() || selectedImage)) {
      handleKirimPesan(inputText, selectedImage || undefined);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // ── Upload Gambar ───────────────────────────────────────────
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = ""; // reset input
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  // ── Rekam Suara ─────────────────────────────────────────────
  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          await uploadAudio(audioBlob);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        alert("Tidak bisa mengakses mikrofon. Pastikan izin mikrofon sudah diberikan.");
      }
    }
  };

  const uploadAudio = async (audioBlob: Blob) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const res = await fetch(`${BACKEND_URL}/api/chat/voice`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Transkripsi gagal");
      const data = await res.json();
      if (data.transcript) {
        // Langsung kirim transkripsi sebagai pesan
        await handleKirimPesan(data.transcript);
      }
    } catch (_) {
      alert("Gagal memproses rekaman suara. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">

      {/* ── Toast Notifikasi ── */}
      {appointmentToast && (
        <AppointmentToast data={appointmentToast} onClose={() => setAppointmentToast(null)} />
      )}

      {/* ── SideNavBar ── */}
      <aside className="hidden lg:flex flex-col h-screen sticky top-0 p-4 bg-surface-container-low w-72 shadow-sm border-r border-outline-variant">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary leading-none">PastiSehat</h1>
            <p className="text-label-sm font-label-sm text-outline">RS Louis Surabaya</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="/">
            <LayoutDashboard className="w-5 h-5" /><span className="font-label-md font-bold">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold shadow-sm" href="/cici">
            <Bot className="w-5 h-5" /><span className="font-label-md font-bold">Tanya Cici</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="/jadwal">
            <History className="w-5 h-5" /><span className="font-label-md font-bold">Riwayat</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <Stethoscope className="w-5 h-5" /><span className="font-label-md font-bold">Apotek</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <HelpCircle className="w-5 h-5" /><span className="font-label-md font-bold">Bantuan</span>
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant space-y-1">
          <button
            onClick={() => handleKirimPesan("Saya ingin booking dokter sekarang")}
            disabled={isLoading}
            className="w-full mb-4 py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold font-label-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all disabled:opacity-60"
          >
            <Calendar className="w-5 h-5" />
            Booking Sekarang
          </button>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <Settings className="w-5 h-5" /><span className="font-label-md font-bold">Pengaturan</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <LogOut className="w-5 h-5" /><span className="font-label-md font-bold">Keluar</span>
          </Link>
        </div>
      </aside>

      {/* ── Main Chat Canvas ── */}
      <main className="flex-1 flex flex-col relative h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">

        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-outline-variant sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant">
                <img alt="Cici AI" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBmM6rTrLlEdTtEz4ImM3hTevS1V2DphrNjWMJhFjkonSejRYghiW7VWJV3ualEQN-ZIBGm_VhZklmdMkMCLxy7VSdU1gpi0fokcdWO5-eh5pRDWzGCj3fsvmjHSr7re7RSxbYiI0Tov8V-RKApLPOZUVx-zHnYdL4vOvNRfXPF_ExjsOKTmKfV88rNJCvxL5YSW7VDhUWdQDLWAm4m8Di4Cjc6DSip06ar8IabjRL9i8VNDKRpYqs25olxXrjxAdMCVLfIv_pN5By" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-surface rounded-full" />
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md font-bold leading-tight">Tanya Cici</h2>
              <p className="text-label-sm font-label-sm text-primary flex items-center gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                AI Health Assistant Aktif
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
              <Bell className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center border border-outline-variant cursor-pointer">
              <UserCircle className="w-6 h-6 text-on-secondary-fixed" />
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <div id="ai-chat-box" className="flex-1 overflow-y-auto px-4 md:px-10 py-8 space-y-8 pb-40">
          {messages.map((msg) =>
            msg.role === "ai"
              ? <AiMessage key={msg.id} content={msg.content} />
              : <UserMessage key={msg.id} content={msg.content} imagePreview={msg.imagePreview} />
          )}
          {isLoading && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent">

          {/* Preview gambar terpilih */}
          {imagePreview && (
            <div className="max-w-4xl mx-auto mb-3 flex items-center gap-3 bg-surface-container rounded-2xl px-4 py-3 border border-outline-variant">
              <img src={imagePreview} alt="Preview" className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-label-sm font-bold text-on-surface">Foto terlampir</p>
                <p className="text-label-sm text-outline">{selectedImage?.name}</p>
              </div>
              <button onClick={clearImage} className="p-1.5 hover:bg-error-container rounded-full transition-colors text-error">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input field */}
          <div className={`max-w-4xl mx-auto glass-card rounded-3xl p-2 flex items-center gap-2 border transition-shadow ${isRecording ? "border-error shadow-lg shadow-error/20" : "border-outline-variant active-glow"}`}>
            <div className="flex items-center gap-1 px-2 border-r border-outline-variant/30">
              {/* Upload gambar */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant disabled:opacity-40"
                title="Upload foto gejala"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              {/* Rekam suara */}
              <button
                onClick={toggleRecording}
                disabled={isLoading && !isRecording}
                className={`p-2 rounded-full transition-colors ${isRecording ? "bg-error text-white animate-pulse" : "hover:bg-surface-container-high text-on-surface-variant"} disabled:opacity-40`}
                title={isRecording ? "Stop rekaman" : "Rekam suara"}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>

            <input
              className="flex-1 bg-transparent border-none focus:ring-0 text-body-md font-body-md px-4 outline-none placeholder:text-outline/60"
              placeholder={isRecording ? "🔴 Sedang merekam... klik ikon mic lagi untuk kirim" : "Tulis gejala atau pertanyaan Anda di sini..."}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || isRecording}
            />

            <button
              onClick={handleSubmit}
              disabled={isLoading || isRecording || (!inputText.trim() && !selectedImage)}
              className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </main>

      {/* ── Right Sidebar: Ringkasan Sesi ── */}
      <aside className="hidden xl:flex flex-col w-80 h-screen sticky top-0 p-6 bg-surface border-l border-outline-variant">
        <div className="mb-8">
          <h3 className="font-headline-md text-body-lg font-bold mb-4">Ringkasan Sesi</h3>
          <div className="glass-card rounded-2xl p-4 space-y-4">
            <div>
              <p className="text-label-sm font-label-bold text-outline uppercase tracking-wider mb-2">Gejala Terdeteksi</p>
              <div className="flex flex-wrap gap-2 min-h-[28px]">
                {detectedSymptoms.length === 0 ? (
                  <span className="text-label-sm text-outline italic">Belum ada gejala terdeteksi</span>
                ) : (
                  detectedSymptoms.map((g) => (
                    <span key={g} className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-[12px] font-bold capitalize">{g}</span>
                  ))
                )}
              </div>
            </div>
            <div>
              <p className="text-label-sm font-label-bold text-outline uppercase tracking-wider mb-1">Total Pesan</p>
              <p className="font-bold text-primary">{messages.length - 1} pesan</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-headline-md text-body-lg font-bold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {["Saya ingin booking dokter", "Apa obat untuk sakit kepala?", "Dokter apa yang tepat untuk saya?"].map((q) => (
              <button
                key={q}
                onClick={() => handleKirimPesan(q)}
                disabled={isLoading}
                className="w-full text-left px-4 py-3 rounded-xl bg-surface-container hover:bg-primary-container hover:text-on-primary-container transition-all text-label-sm font-bold border border-outline-variant disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-headline-md text-body-lg font-bold mb-4">Artikel Terkait</h3>
          <div className="space-y-4">
            <div className="group cursor-pointer">
              <div className="w-full h-24 rounded-2xl overflow-hidden mb-2">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCstb-HO6WbFbBypT3iGgaty5EkQESr7ms1dMQwVj2RQeU2g56dX-TR9jk7Nmh7o-RbbTKcOfkV_GN67uo-U-lvOXv_uPipt66xCnA29Bps7EvqV85tlFuyy3y4zsDTZzyO96xsT_EfkKEJHaZ8wyXWVHFj30bDO-i7Oo9x-ShXhi61QpD6e0Y6NgGW4uA5L7Ezotu8Dw1AwsWJPTtqLGBfIwAy6VZEsntDm2MVCMkWs4grKSPkp0gjJEOU4idQY7KTPPtEpFe09Ihm" alt="Artikel" />
              </div>
              <h5 className="text-label-bold font-bold leading-tight group-hover:text-primary transition-colors">5 Cara Meredakan Pusing di Rumah</h5>
            </div>
            <div className="group cursor-pointer">
              <div className="w-full h-24 rounded-2xl overflow-hidden mb-2">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0u0oAVaLjTbPSo_pjujJitwHnsNpvTZX7WN7h5dP-4RfU9qjVwETiX6qswEmB_KB1rg9RZ1JuMpRgX15qD65xeAPZmcI2GGFLgLipTZR6wBuYo4G-uriM7L-81wEe3TfFYTSplNLxkYOhd55OdjAhWX-k5jZ8Lwbk6JWrWr4O9mjzJH3jZXZJKjaXq6u2VlXP0tXMOKTsqJi7FYIMysGtJM5EpsTzrUK2a_HJz_vVIihA5U8Joqxk1yVvA8tClr63raShWEbP" alt="Artikel" />
              </div>
              <h5 className="text-label-bold font-bold leading-tight group-hover:text-primary transition-colors">Membedakan Flu dan Alergi Musiman</h5>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
