'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, Calendar, Weight, Ruler, Activity, MapPin, Loader2, HeartPulse, Check } from 'lucide-react';

const MEDICAL_HISTORY_OPTIONS = ['GERD', 'Diabetes', 'Hipertensi', 'Asma', 'Kolesterol', 'Asam Urat', 'Jantung', 'Lainnya'];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    dob: '',
    weight: '',
    height: '',
    address: '',
    medicalHistory: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      router.push('/');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMedicalHistory = (option: string) => {
    setFormData((prev) => {
      const history = prev.medicalHistory.includes(option)
        ? prev.medicalHistory.filter((o) => o !== option)
        : [...prev.medicalHistory, option];
      return { ...prev, medicalHistory: history };
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal registrasi');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full glass-card rounded-3xl p-8 md:p-12 space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <HeartPulse className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-on-surface">Buat Akun</h1>
          <p className="text-outline mt-2">Mulai perjalanan kesehatan Anda bersama PastiSehat</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="nama@email.com"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" /> Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Nama Lengkap */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Nama Lengkap Pasien"
                required
              />
            </div>

            {/* Tanggal Lahir */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Tanggal Lahir
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
            </div>

            {/* Berat Badan */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
                <Weight className="w-4 h-4 text-primary" /> Berat Badan (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Misal: 65"
              />
            </div>

            {/* Tinggi Badan */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
                <Ruler className="w-4 h-4 text-primary" /> Tinggi Badan (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Misal: 170"
              />
            </div>
          </div>

          {/* Alamat */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Alamat
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
              placeholder="Alamat Lengkap"
              required
            ></textarea>
          </div>

          {/* Riwayat Penyakit */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Riwayat Penyakit
            </label>
            <div className="flex flex-wrap gap-2">
              {MEDICAL_HISTORY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleMedicalHistory(option)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border ${
                    formData.medicalHistory.includes(option)
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                      : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-primary'
                  }`}
                >
                  {formData.medicalHistory.includes(option) && <Check className="w-3 h-3" />}
                  {option}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-error/10 text-error text-sm p-4 rounded-xl border border-error/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 mt-4 shadow-xl shadow-primary/25"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
            {loading ? 'Sedang Mendaftar...' : 'Daftar Sekarang'}
          </button>
        </form>

        <div className="text-center text-outline">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}
