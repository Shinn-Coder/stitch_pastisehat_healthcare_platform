'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Stethoscope, LayoutDashboard, History, Bot, HelpCircle, Calendar, Settings, LogOut,
  Search, Bell, UserCircle, ChevronRight, CalendarDays, Plus, Clock, MapPin, Syringe,
  Microscope, Download, Smile, AlertTriangle, Check, Menu, FileText, ChevronLeft,
  HeartPulse, Activity, Pill
} from "lucide-react";

interface Appointment {
  id: string;
  doctorName: string;
  date: string;
  summary: string;
  status: string;
}

export default function JadwalPage() {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchAppointments = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/appointments/${parsedUser.id}`);
        const data = await res.json();
        if (res.ok) {
          setAppointments(data.appointments);
        }
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background text-on-surface font-body-md overflow-x-hidden">
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
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/cici" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all">
            <Activity className="w-5 h-5" />
            <span className="font-medium">Tanya Cici</span>
          </Link>
          <Link href="/jadwal" className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
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

      <main className="flex-1 flex flex-col min-w-0 bg-background overflow-x-hidden">
        {/* TopNavBar */}
        <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md h-16 border-b border-outline-variant px-8 flex justify-between items-center w-full">
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari jadwal atau dokter..." 
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

        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-on-surface-variant mb-2 text-xs font-bold uppercase tracking-wider">
                <span>Beranda</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-primary">Riwayat Jadwal</span>
              </nav>
              <h2 className="text-4xl font-bold text-on-surface tracking-tight">Jadwal Kunjungan</h2>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-outline-variant rounded-xl font-bold text-sm text-on-surface-variant glass-card hover:bg-white transition-all shadow-sm">
                <CalendarDays className="w-5 h-5 text-primary" /> Download Kalender
              </button>
              <Link href="/cici" className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                <Plus className="w-5 h-5" /> Buat Janji Baru
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Next Appointment Card */}
              {appointments.length > 0 && (
                <section className="glass-card rounded-[32px] overflow-hidden flex flex-col md:flex-row border-none shadow-sm group">
                  <div className="w-full md:w-1/3 relative min-h-[200px] bg-primary/5 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-primary/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div>
                        <span className="inline-block bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                          Kunjungan Terdekat
                        </span>
                        <h3 className="text-2xl font-bold text-on-surface mb-1">{appointments[0].doctorName}</h3>
                        <p className="text-on-surface-variant text-sm flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-primary" />
                          Pemeriksaan Terjadwal
                        </p>
                      </div>
                      <div className="bg-primary text-white px-5 py-3 rounded-2xl text-center shadow-lg shadow-primary/20">
                        <p className="text-[10px] font-bold uppercase opacity-80">{new Date(appointments[0].date).toLocaleDateString('id-ID', { weekday: 'short' })}</p>
                        <p className="text-2xl font-bold">{new Date(appointments[0].date).getDate()} {new Date(appointments[0].date).toLocaleDateString('id-ID', { month: 'short' })}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] text-outline font-bold uppercase">Waktu</p>
                          <p className="font-bold text-sm">{new Date(appointments[0].date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] text-outline font-bold uppercase">Lokasi</p>
                          <p className="font-bold text-sm">Gedung Utama, RS Louis</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-outline-variant/30">
                      <button className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all">Reschedule</button>
                      <button className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-error border border-error/20 hover:bg-error/5 transition-all">Batalkan</button>
                    </div>
                  </div>
                </section>
              )}

              {/* History List */}
              <section className="glass-card rounded-[32px] p-8 border-none shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-on-surface">Mendatang & Riwayat</h3>
                  <div className="flex bg-surface-container-low rounded-xl p-1">
                    <button className="px-4 py-1.5 text-xs font-bold bg-white rounded-lg shadow-sm text-primary">Semua</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-on-surface-variant">Mendatang</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-on-surface-variant">Selesai</button>
                  </div>
                </div>

                {loading ? (
                  <div className="py-12 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-outline">Memuat riwayat...</p>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/20">
                    {appointments.map((apt, index) => (
                      <div key={apt.id} className="flex gap-6 relative group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm ${index === 0 ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>
                          {index === 0 ? <Clock className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 pb-6 border-b border-outline-variant/20 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-on-surface">{apt.doctorName}</h4>
                              <p className="text-xs text-on-surface-variant mt-1 italic">"{apt.summary}"</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${index === 0 ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                              {apt.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-on-surface-variant mt-3">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tight">
                              <Calendar className="w-3.5 h-3.5" /> 
                              {new Date(apt.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tight">
                              <Clock className="w-3.5 h-3.5" /> 
                              {new Date(apt.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                            </span>
                            <button className="ml-auto text-primary text-[10px] font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
                              Hasil Lab <Download className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4 text-outline">
                      <History className="w-8 h-8" />
                    </div>
                    <p className="text-on-surface-variant font-medium">Belum ada riwayat janji temu.</p>
                  </div>
                )}
              </section>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Calendar Mockup */}
              <section className="glass-card rounded-[32px] p-8 border-none shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs">Mei 2024</h4>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-surface-container-low rounded"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-surface-container-low rounded"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-4 text-center">
                  {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((d) => (
                    <div key={d} className="text-[10px] font-bold text-outline">{d}</div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div key={i} className={`h-8 flex items-center justify-center text-xs font-bold rounded-lg cursor-pointer hover:bg-primary/5 ${i + 1 === new Date().getDate() ? 'bg-primary text-white shadow-md' : 'text-on-surface'}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </section>

              {/* Emergency Banner */}
              <section className="rounded-[32px] p-8 text-white relative overflow-hidden shadow-lg shadow-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary -z-10"></div>
                <AlertTriangle className="w-10 h-10 mb-4 opacity-80" />
                <h4 className="text-xl font-bold mb-2">Butuh Bantuan Segera?</h4>
                <p className="text-sm opacity-80 mb-6">Layanan chat prioritas dengan tim medis RS Louis untuk pertanyaan mendesak.</p>
                <Link href="/cici" className="block w-full py-4 bg-white text-primary font-bold text-sm rounded-2xl text-center shadow-lg hover:scale-105 transition-all">
                  Chat Konsultasi
                </Link>
              </section>

              {/* Preparation Checklist */}
              <section className="glass-card rounded-[32px] p-8 border-none shadow-sm">
                <h4 className="text-xs font-bold text-outline uppercase tracking-widest mb-6">Persiapan Kunjungan</h4>
                <ul className="space-y-4">
                  {[
                    "Bawa KTP & Kartu Asuransi",
                    "Puasa 8 jam (untuk cek darah)",
                    "Membawa hasil rontgen terakhir"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-lg border-2 border-primary/20 flex items-center justify-center shrink-0">
                        {i === 0 && <Check className="w-3 h-3 text-primary" />}
                      </div>
                      <span className="text-sm text-on-surface-variant font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
