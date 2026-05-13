'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Pill, Search, Bell, ShoppingCart, Upload, CheckCircle2,
  History, MessageSquare, Download, Filter,
  LayoutDashboard, Activity, User, LogOut, HeartPulse,
  ArrowRight, ShieldCheck, Stethoscope, AlertCircle,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function ApotekPage() {
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
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-surface-container-low border-r border-outline-variant p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-primary leading-tight">PastiSehat</h1>
            <p className="text-[10px] text-outline uppercase tracking-wider">RS Louis Surabaya</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/cici" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all">
            <Activity className="w-5 h-5" />
            <span className="font-medium">Tanya Cici</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all">
            <User className="w-5 h-5" />
            <span className="font-medium">Profil</span>
          </Link>
          <Link href="/apotek" className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
            <Pill className="w-5 h-5" />
            <span className="font-medium">Apotek</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-outline-variant/30 space-y-1">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-outline-variant bg-white/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input
              type="text"
              placeholder="Cari obat atau resep..."
              className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-on-surface leading-tight">{user.fullName}</p>
                <p className="text-[10px] text-on-surface-variant">Pasien</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-sm">
                {user.fullName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20">
                  <Pill className="w-3 h-3" /> Farmasi Digital
                </span>
                <h2 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">Manajemen Obat</h2>
                <p className="text-on-surface-variant text-lg max-w-2xl">
                  Kelola resep aktif Anda dan tebus obat secara instan melalui sistem terintegrasi RS Louis Surabaya.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 rounded-2xl glass-card font-bold flex items-center gap-2 text-primary hover:bg-white transition-all shadow-sm">
                  <Upload className="w-5 h-5" /> Unggah Resep
                </button>
                <button className="px-8 py-3 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-all flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" /> Tebus Semua
                </button>
              </div>
            </div>
          </section>

          {/* Active Prescriptions */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-on-surface">Resep Aktif (2)</h3>
              <Link href="#" className="text-primary font-bold hover:underline flex items-center gap-1 text-sm">
                Lihat Detail <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="glass-card rounded-[32px] p-8 inner-glow border-none shadow-sm relative overflow-hidden flex flex-col">
                <div className="absolute top-6 right-6">
                  <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold px-3 py-1 rounded-full">
                    SESUDAH MAKAN
                  </span>
                </div>
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Pill className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-on-surface">Metformin</h4>
                    <p className="text-xs text-on-surface-variant">Diabetes • 850mg</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Kuantitas:</span>
                    <span className="font-bold text-on-surface">30 Tablet</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Sisa Stok:</span>
                    <span className="text-secondary font-bold">12 Tablet</span>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Estimasi Harga</span>
                    <span className="text-xl font-bold text-primary">Rp 120.000</span>
                  </div>
                </div>
                <button className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:brightness-110 transition-all shadow-md">
                  Tebus Obat
                </button>
              </div>

              {/* Card 2 */}
              <div className="glass-card rounded-[32px] p-8 inner-glow border-none shadow-sm relative overflow-hidden flex flex-col">
                <div className="absolute top-6 right-6">
                  <span className="bg-error-container text-on-error-container text-[10px] font-bold px-3 py-1 rounded-full">
                    HABIS
                  </span>
                </div>
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                    <Pill className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-on-surface">Lisinopril</h4>
                    <p className="text-xs text-on-surface-variant">Hipertensi • 10mg</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Kuantitas:</span>
                    <span className="font-bold text-on-surface">20 Tablet</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Sisa Stok:</span>
                    <span className="text-error font-bold font-bold">0 Tablet</span>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Estimasi Harga</span>
                    <span className="text-xl font-bold text-primary">Rp 85.000</span>
                  </div>
                </div>
                <button className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/25 scale-[1.02]">
                  Tebus Obat Sekarang
                </button>
              </div>

              {/* Tips Card */}
              <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/10 flex flex-col justify-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-on-surface mb-2">Butuh Resep Baru?</h4>
                <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                  Bicara dengan Cici untuk konsultasi gejala atau buat janji temu dokter untuk mendapatkan resep baru.
                </p>
                <Link href="/cici" className="text-primary font-bold flex items-center justify-center gap-2 hover:underline">
                  Konsultasi Sekarang <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* History Table */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-on-surface">Riwayat Pembelian</h3>
              <div className="flex gap-2">
                <button className="p-2.5 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all">
                  <Filter className="w-5 h-5 text-on-surface-variant" />
                </button>
                <button className="p-2.5 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all">
                  <Download className="w-5 h-5 text-on-surface-variant" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 overflow-hidden rounded-[32px] glass-card border-none shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-outline-variant/30">
                        <th className="px-8 py-5 text-[10px] font-bold text-outline uppercase tracking-widest">ID PESANAN</th>
                        <th className="px-8 py-5 text-[10px] font-bold text-outline uppercase tracking-widest">DAFTAR OBAT</th>
                        <th className="px-8 py-5 text-[10px] font-bold text-outline uppercase tracking-widest">TANGGAL</th>
                        <th className="px-8 py-5 text-[10px] font-bold text-outline uppercase tracking-widest text-right">TOTAL</th>
                        <th className="px-8 py-5 text-[10px] font-bold text-outline uppercase tracking-widest text-center">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="px-8 py-6 font-bold text-primary">#RX-88210</td>
                        <td className="px-8 py-6">
                          <p className="font-bold text-on-surface">Paket Anti-Inflamasi</p>
                          <p className="text-xs text-on-surface-variant">Dexamethasone, Ibuprofen</p>
                        </td>
                        <td className="px-8 py-6 text-sm text-on-surface-variant">12 Mei 2024</td>
                        <td className="px-8 py-6 text-right font-bold text-on-surface">Rp 215.000</td>
                        <td className="px-8 py-6 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold border border-green-200">
                            <CheckCircle2 className="w-3 h-3" /> SELESAI
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="px-8 py-6 font-bold text-primary">#RX-87955</td>
                        <td className="px-8 py-6">
                          <p className="font-bold text-on-surface">Multivitamin Gold</p>
                          <p className="text-xs text-on-surface-variant">Vit C 1000mg, Zinc, Vit D3</p>
                        </td>
                        <td className="px-8 py-6 text-sm text-on-surface-variant">28 Apr 2024</td>
                        <td className="px-8 py-6 text-right font-bold text-on-surface">Rp 450.000</td>
                        <td className="px-8 py-6 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold border border-green-200">
                            <CheckCircle2 className="w-3 h-3" /> SELESAI
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <div className="rounded-[32px] p-8 gradient-primary text-white shadow-lg shadow-primary/20">
                  <h4 className="text-xs font-bold opacity-80 uppercase tracking-wider mb-4">Total Pengeluaran</h4>
                  <p className="text-4xl font-bold mb-2 tracking-tight">Rp 1.2M</p>
                  <p className="text-xs opacity-80">Akumulasi tahun 2024</p>
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-white" />
                      <span className="font-bold text-sm">Asuransi Aktif</span>
                    </div>
                    <p className="text-xs opacity-80">Prudential Health Platinum</p>
                  </div>
                </div>

                <div className="rounded-[32px] p-8 glass-card border-none shadow-sm">
                  <h4 className="text-lg font-bold text-on-surface mb-2">Bantuan Apoteker</h4>
                  <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                    Hubungi apoteker kami untuk konsultasi dosis atau interaksi obat.
                  </p>
                  <button className="w-full py-3.5 rounded-2xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" /> Chat Apoteker
                  </button>
                </div>
              </div>
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
    </div>
  );
}
