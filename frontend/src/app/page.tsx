'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { 
  Stethoscope, LayoutDashboard, Bot, History, 
  HelpCircle, Calendar, Settings, LogOut, 
  Bell, MapPin, PlusCircle, CalendarCheck, 
  ArrowUpRight, FileText, Pill, ChevronRight, 
  MessageCircle, Activity, HeartPulse
} from "lucide-react";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col h-screen sticky top-0 p-6 bg-surface-container-low w-64 shadow-sm border-r border-outline-variant">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-primary leading-tight">PastiSehat</h1>
            <p className="text-[10px] text-outline uppercase tracking-wider">RS Louis Surabaya</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/cici" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all">
            <Activity className="w-5 h-5" />
            <span className="font-medium">Tanya Cici</span>
          </Link>
          <Link href="/jadwal" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all">
            <History className="w-5 h-5" />
            <span className="font-medium">Riwayat</span>
          </Link>
          <Link href="/apotek" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all">
            <Pill className="w-5 h-5" />
            <span className="font-medium">Apotek</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-outline-variant/30 space-y-1">
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Pengaturan</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {/* TopAppBar */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-outline-variant">
          <div className="flex justify-between items-center w-full px-8 h-16">
            <div className="flex items-center gap-8">
              <span className="lg:hidden font-bold text-primary text-xl">PastiSehat</span>
              <div className="hidden md:flex items-center gap-6">
                <Link className="text-primary border-b-2 border-primary font-bold pb-1 text-sm" href="/">Dashboard</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-bold text-sm" href="/cici">Konsultasi AI</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-bold text-sm" href="/jadwal">Jadwal</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-bold text-sm" href="/apotek">Apotek</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-surface-container-low transition-all">
                <Bell className="w-5 h-5 text-on-surface-variant" />
              </button>
              <Link href="/profile" className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-surface-container-low transition-all border border-outline-variant group">
                <div className="w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-sm">
                  {user.fullName.charAt(0)}
                </div>
                <span className="font-bold text-sm hidden sm:inline group-hover:text-primary transition-colors">{user.fullName}</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
          {/* Hero Section */}
          <section className="relative rounded-[40px] overflow-hidden min-h-[420px] flex items-center p-8 lg:p-16 shadow-xl shadow-primary/5">
            <div className="absolute inset-0 z-0">
              <img alt="Hero background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQVb0jNgjI0F6ApZVWyvMewA456OhyfPu1IIkMRByIELCxK2V7C6X63zhUTif92l86-vgAroGV4hLqZiZXemSeDECyAFYWSaQgaiHMQeVglc9IZd14pOsNA-XZO3Z7rRm2cgS-qR4yyf2GKKrHrC-f7fdPFFe22yhhinE_RR1zzDRk21SBIxAKgGfjcKbtenoh7gfwK8b_tTnp9vWi8oxpgAo8jwEv9zyfATtEZboDqmgsY59ryd9sVKUI8X469wiY07dO97npJElD" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-2xl space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-none shadow-sm">
                <MapPin className="text-primary w-5 h-5" />
                <span className="font-bold text-xs text-primary uppercase tracking-wider">RS Louis Surabaya — Pusat Diagnostik</span>
              </div>
              <h2 className="text-5xl font-bold text-on-surface leading-tight tracking-tight">
                Selamat Datang, <br /><span className="text-primary">{user.fullName.split(' ')[0]}!</span>
              </h2>
              <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
                Kelola jadwal konsultasi, hasil laboratorium genomik, dan riwayat kesehatan Anda dalam satu platform medis yang terintegrasi.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/cici" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-all flex items-center gap-2">
                  <PlusCircle className="w-5 h-5" /> Konsultasi AI
                </Link>
                <Link href="/jadwal" className="bg-white text-primary border border-primary/20 px-8 py-4 rounded-2xl font-bold shadow-sm hover:bg-primary/5 transition-all flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Lihat Jadwal
                </Link>
              </div>
            </div>
          </section>

          {/* Quick Access Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/cici" className="lg:col-span-2 bg-primary rounded-[32px] p-8 text-white flex flex-col justify-between h-64 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95">
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <Bot className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30">
                  <span className="w-2 h-2 bg-error rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">LIVE</span>
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Tanya Cici AI</h3>
                <p className="text-sm opacity-80 leading-relaxed">AI Health Assistant kami siap membantu skrining awal gejala Anda secara instan.</p>
              </div>
            </Link>

            <Link href="/jadwal" className="glass-card rounded-[32px] p-8 flex flex-col justify-between h-64 border-none shadow-sm hover:shadow-md transition-all group active:scale-95">
              <div className="flex justify-between items-start">
                <div className="bg-secondary-fixed/50 p-4 rounded-2xl text-secondary">
                  <CalendarCheck className="w-8 h-8" />
                </div>
                <ArrowUpRight className="text-outline w-6 h-6 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Status Terakhir</p>
                <h3 className="text-xl font-bold text-on-surface">Cek Jadwal Rutin</h3>
                <p className="text-xs text-on-surface-variant mt-1">Pantau riwayat kunjungan medis Anda.</p>
              </div>
            </Link>

            <Link href="/apotek" className="glass-card rounded-[32px] p-8 flex flex-col justify-between h-64 border-none shadow-sm hover:shadow-md transition-all group active:scale-95">
              <div className="flex justify-between items-start">
                <div className="bg-tertiary-fixed/50 p-4 rounded-2xl text-tertiary">
                  <Pill className="w-8 h-8" />
                </div>
                <ArrowUpRight className="text-outline w-6 h-6 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-1">Apotek Digital</p>
                <h3 className="text-xl font-bold text-on-surface">Tebus Resep</h3>
                <p className="text-xs text-on-surface-variant mt-1">Obat Anda siap diantar atau diambil.</p>
              </div>
            </Link>
          </section>

          {/* Articles */}
          <section className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-on-surface tracking-tight">Edukasi Kesehatan</h2>
                <p className="text-on-surface-variant mt-2 font-medium">Wawasan medis terkini dari tim ahli RS Louis.</p>
              </div>
              <button className="text-primary font-bold flex items-center gap-1 hover:underline text-sm">
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Peran AI dalam Deteksi Dini Kanker Payudara", category: "Teknologi Medis", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKYrCk-psZKrqklxhp1-wPSQ60_p5E_IO3LnsKRj2niNu3RSvHVUGz26NyWadyVslzMgvFJNUry6FP6gxYwmKi5YTg3ZjRy5OCKyMSftwnrs2ugp-ylhY18MMGsihVbLccnxuBLbIKkQEdDvrzzHaCBuYYPxk52ukLNUotPbNASreetTljafnJfURjyKpiIeEjLoCrFEPbw45shhK-wLqIaHDJuk4hiSZKvD4Zq5lVjTgQvL4UTIi58p1F6nQObSRP0lRsXZE7tRXO", desc: "Bagaimana algoritma pembelajaran mendalam membantu radiolog mengidentifikasi anomali dengan akurasi tinggi." },
                { title: "Manajemen Stres di Era Digital: Panduan Praktis", category: "Kesehatan Mental", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtGID3zvQwyiRoFUFoUVn1IKJb64RdfvQFBNMR8s46Ne6-XxW9IaVuTkPLPKZUmP1v9po46LxDBPprjG98wLRY3OA1df_a0nznSP0CaCi_TPvxYfsnY3Z0KYd7ObRPgqLyB--f6mEFcvjMA-vUpvDueT8bct0yplzoSmNY-VMclU0JlJlbVShIaPdDtFf7DlD0jVNULMxiDH5RBbf90TK8RLdPF7_ggOg61Maj4wY6m_-JOa16lDxAzNPl5ueHEbxMVOdrKNMLaCff", desc: "Tips dari psikolog klinis kami tentang menjaga keseimbangan hormon kortisol di tengah kesibukan." },
                { title: "Genomik Nutrisi: Mengapa Diet Anda Unik", category: "Nutrisi & Diet", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk_bgOTpU_-84-4S0Zb0rLl3dcrKDxjPFkMiA8mbphQGm66sFgvE4VXOVSjMtAAcJvh9SHm1JlFMt-jzTpR6H0l3OVMx_f0IJkJy0eIRslqSlKV-x0P3dUMHfAzWBTLUhHhJe9_kpsr6P4fTszjy9G3kktt5nhaURSg3b4cGbup3OYTNGgD2WcVdbCaTiHkmhOogINE7MtQsY_aPfUQqxuSNrRNpZ9XMqmT74KvbN_EsDwhv1rQXHCEYLVcbcaKIt7Geam9_qeZWtM", desc: "Memahami bagaimana DNA Anda mempengaruhi cara tubuh merespons nutrisi dari makanan sehari-hari." }
              ].map((article, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="rounded-[32px] overflow-hidden aspect-[16/10] mb-6 shadow-sm group-hover:shadow-lg transition-all duration-500">
                    <img alt={article.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={article.img} />
                  </div>
                  <span className="px-4 py-1.5 bg-surface-container-high rounded-full font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">{article.category}</span>
                  <h3 className="text-xl font-bold mt-4 group-hover:text-primary transition-colors leading-snug">{article.title}</h3>
                  <p className="text-sm text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">{article.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-12 px-8 bg-surface-container-high border-t border-outline-variant/30">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-primary font-bold text-lg mb-1">PastiSehat</p>
              <p className="text-sm text-on-surface-variant italic">© 2024 RS Louis Surabaya. Terakreditasi KARS.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-on-surface-variant">
              <Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
              <Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
              <Link href="#" className="hover:text-primary transition-colors">Pusat Bantuan</Link>
              <Link href="#" className="hover:text-primary transition-colors">Kontak Kami</Link>
            </div>
          </div>
        </footer>
      </main>

      {/* FAB */}
      <Link href="/cici" className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center z-50 group">
        <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </Link>
    </div>
  );
}
