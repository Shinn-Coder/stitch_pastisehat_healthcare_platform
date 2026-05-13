'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Calendar, Weight, Ruler, Activity, MapPin, 
  LogOut, Settings, History, LayoutDashboard, Pill, 
  HelpCircle, ChevronRight, CheckCircle2, FileText, Download,
  HeartPulse, ExternalLink, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

interface Appointment {
  id: string;
  doctorName: string;
  date: string;
  summary: string;
  status: string;
}

interface UserData {
  id: string;
  email: string;
  fullName: string;
  dob: string;
  weight: number;
  height: number;
  medicalHistory: string[];
  address: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
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

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-surface-container-low border-r border-outline-variant p-6">
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
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all group">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/cici" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all group">
            <Activity className="w-5 h-5" />
            <span className="font-medium">Tanya Cici</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
            <User className="w-5 h-5" />
            <span className="font-medium">Profil</span>
          </Link>
          <Link href="/apotek" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all group">
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
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-on-surface">Profil & Riwayat Medis</h2>
            <p className="text-on-surface-variant mt-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Data terverifikasi oleh RS Louis Surabaya
            </p>
          </div>
          <div className="flex items-center gap-4 bg-surface-container-low p-2 pr-6 rounded-full glass-card border-none shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-xl">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-on-surface leading-tight">{user.fullName}</p>
              <p className="text-xs text-on-surface-variant">ID: PS-{user.id.slice(0, 5).toUpperCase()}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vitals */}
          <div className="lg:col-span-4 space-y-6">
            <section className="glass-card rounded-[32px] p-8 inner-glow border-none shadow-sm">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-secondary-fixed/30 mx-auto mb-4 flex items-center justify-center text-secondary">
                  <User className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-on-surface">{user.fullName}</h3>
                <span className="inline-block px-4 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-xs font-bold mt-2">
                  Pasien Terdaftar
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-outline-variant/30">
                <div className="text-center">
                  <p className="text-[10px] text-outline uppercase tracking-wider font-bold mb-1">Usia</p>
                  <p className="text-2xl font-bold text-on-surface">{calculateAge(user.dob)} th</p>
                </div>
                <div className="text-center border-l border-outline-variant/30">
                  <p className="text-[10px] text-outline uppercase tracking-wider font-bold mb-1">GOL. DARAH</p>
                  <p className="text-2xl font-bold text-primary">B+</p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-medium flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary" /> Tinggi Badan
                  </span>
                  <span className="font-bold text-on-surface">{user.height || '-'} cm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-medium flex items-center gap-2">
                    <Weight className="w-4 h-4 text-primary" /> Berat Badan
                  </span>
                  <span className="font-bold text-on-surface">{user.weight || '-'} kg</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-on-surface-variant font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Alamat
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed bg-surface-container-low p-3 rounded-xl">
                  {user.address}
                </p>
              </div>
            </section>

            <section className="glass-card rounded-[32px] p-8 inner-glow border-none shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-on-surface uppercase tracking-widest text-sm">Riwayat Penyakit</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.medicalHistory.length > 0 ? (
                  user.medicalHistory.map((item) => (
                    <span key={item} className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface-variant font-bold text-xs border border-outline-variant/20">
                      {item}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-outline italic">Tidak ada riwayat penyakit tercatat.</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Appointments */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-on-surface">Jadwal & Janji Temu</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full shadow-md">Semua</button>
                <button className="px-4 py-2 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-full">Mendatang</button>
              </div>
            </div>

            {loading ? (
              <div className="glass-card rounded-[32px] p-12 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-outline">Memuat jadwal...</p>
              </div>
            ) : appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <article key={apt.id} className="glass-card rounded-[24px] p-6 inner-glow border-none shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <Calendar className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="text-[10px] text-outline font-bold uppercase tracking-tight">
                            {new Date(apt.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                          </p>
                          <h5 className="font-bold text-on-surface text-lg leading-snug">{apt.doctorName}</h5>
                          <p className="text-sm text-on-surface-variant">Status: <span className="text-primary font-bold">{apt.status}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold border border-green-200">
                        <CheckCircle2 className="w-4 h-4" />
                        AKTIF
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-outline-variant/30">
                      <div className="flex items-start gap-3 bg-surface-container-low p-4 rounded-2xl">
                        <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-outline uppercase mb-1">Catatan Cici</p>
                          <p className="text-sm text-on-surface-variant italic leading-relaxed">"{apt.summary}"</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 py-3 px-4 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                        <Download className="w-4 h-4" /> Hasil Lab
                      </button>
                      <button className="flex-1 py-3 px-4 bg-surface-container-high text-on-surface-variant rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-all">
                        <ExternalLink className="w-4 h-4" /> Detail
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-[32px] p-16 text-center border-none shadow-sm">
                <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4 text-outline">
                  <History className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-on-surface">Belum ada janji temu</h4>
                <p className="text-on-surface-variant mt-2 max-w-xs mx-auto">
                  Anda belum memiliki riwayat janji temu. Mulai bicara dengan Cici untuk membuat jadwal.
                </p>
                <Link href="/cici" className="inline-block mt-6 px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-all">
                  Tanya Cici Sekarang
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
