import Link from "next/link";
import { 
  Stethoscope, LayoutDashboard, History, Bot, HelpCircle, Calendar, Settings, LogOut,
  Search, Bell, UserCircle, ChevronRight, CalendarDays, Plus, Clock, MapPin, Syringe,
  Microscope, Download, Smile, AlertTriangle, Check, Menu, FileText
} from "lucide-react";

export default function Jadwal() {
  return (
    <div className="flex min-h-screen bg-background text-on-surface font-body-md overflow-x-hidden">
      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col h-screen sticky top-0 p-gutter bg-surface-container-low w-64 shadow-sm border-r border-outline-variant">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md font-bold text-primary">PastiSehat</h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant">RS Louis Surabaya</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors group" href="/">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-label-md font-bold text-label-md">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold transition-all scale-[0.98]" href="/jadwal">
            <History className="w-5 h-5" />
            <span className="font-label-md font-bold text-label-md">Riwayat</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="/cici">
            <Bot className="w-5 h-5" />
            <span className="font-label-md font-bold text-label-md">Tanya Cici</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <Stethoscope className="w-5 h-5" />
            <span className="font-label-md font-bold text-label-md">Apotek</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <HelpCircle className="w-5 h-5" />
            <span className="font-label-md font-bold text-label-md">Bantuan</span>
          </Link>
        </nav>
        <div className="mt-auto space-y-2">
          <button className="w-full gradient-primary text-white font-label-bold text-label-bold py-3 rounded-xl mb-6 shadow-lg shadow-primary/20">
            Booking Sekarang
          </button>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <Settings className="w-5 h-5" />
            <span className="font-label-md font-bold text-label-md">Pengaturan</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <LogOut className="w-5 h-5" />
            <span className="font-label-md font-bold text-label-md">Keluar</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-background overflow-x-hidden">
        {/* TopNavBar */}
        <header className="sticky top-0 z-30 bg-surface h-16 border-b border-outline-variant px-gutter flex justify-between items-center w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-4 lg:hidden">
            <Menu className="text-primary w-6 h-6" />
            <span className="font-headline-md text-headline-md font-bold text-primary">PastiSehat</span>
          </div>
          <div className="hidden md:flex flex-1 max-w-md ml-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
              <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-body-md focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Cari jadwal atau dokter..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 mr-6">
              <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors font-bold" href="/">Dashboard</Link>
              <Link className="font-label-md text-label-md text-primary font-bold border-b-2 border-primary pb-1" href="/jadwal">Riwayat</Link>
              <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors font-bold" href="#">Booking</Link>
              <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors font-bold" href="#">Apotek</Link>
            </div>
            <button className="p-2 rounded-full hover:bg-surface-container-low transition-all">
              <Bell className="w-6 h-6 text-on-surface-variant" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10">
              <img alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQAnVcTlMd4u1Xf1topzZf2_Ro9026irkFxbhgCuuZCYdXBftovcBvjUTBDZOAMpDoLxy6sLhv7T_x3viWOdEIAYSx73PyUF_9lN3nWXUdeKslmqblIkjGTfTzYmMdu8ts9u_2zlr6VwUBe1b2XEQrpVuPKoV6rv5Oy8dnCD9riiXWAlAP-NbyL4qGPHhdwx125InvOxRJ4TcJF2Qmq32ZDgEgO0br37OVB20CWNBL_Q0_l9LYyn2bwNjCKGzdn9--6p-jLm2SFFdb" />
            </div>
          </div>
        </header>

        <div className="p-gutter max-w-container-max mx-auto w-full flex flex-col gap-gutter">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6">
            <div>
              <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
                <span className="font-label-sm font-bold text-label-sm">Beranda</span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-label-sm font-bold text-label-sm text-primary">Lihat Jadwal</span>
              </nav>
              <h2 className="font-display-lg text-display-lg text-on-surface">Jadwal Kunjungan</h2>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-outline-variant rounded-xl font-label-bold text-label-bold text-on-surface-variant glass-card hover:bg-surface-container-high transition-all">
                <CalendarDays className="w-5 h-5" /> Download Kalender
              </button>
              <button className="flex items-center gap-2 px-6 py-3 gradient-primary rounded-xl font-label-bold text-label-bold text-white shadow-lg shadow-primary/20 hover:opacity-90">
                <Plus className="w-5 h-5" /> Buat Janji Baru
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-8 flex flex-col gap-gutter">
              <section className="glass-card rounded-[24px] overflow-hidden flex flex-col md:flex-row group">
                <div className="w-full md:w-1/3 relative min-h-[200px]">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8FyEHpXztyOd7XufRjXII_VoV0LlbP7DQ31S7ASqMV1TsIXUGlqfKELre8wSuPbwPSbFZPYY_4pVyh0piM4PXgiH1nHiYOoFRF9XoGZsnnotXV3nbbFGDTQJxodBOEcEpVBvSfkDDm1MisLqrP8MqAy8VDLRuJLWmp3qwzfotKckFTmvhiFfkA2BKQ56F3SYaOiYGiI3EKqpZBahF5uVTgcuQRVJu22VxWlHdKMQpn1o8yYTfcO31nF7FXQRrSdOyfDRSzZjWMDdH" alt="Doctor" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden"></div>
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <span className="inline-block bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-3">Kunjungan Terdekat</span>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface mb-1">Pemeriksaan Jantung Rutin</h3>
                      <p className="text-on-surface-variant font-body-md flex items-center gap-2">
                        <UserCircle className="w-5 h-5 text-primary" />
                        dr. Armand Malik, Sp.JP
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-primary-container text-on-primary-container px-4 py-2 rounded-2xl text-center">
                        <p className="font-label-sm text-label-sm">Selasa</p>
                        <p className="font-headline-md text-headline-md font-bold">24 Okt</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[12px] text-outline font-bold">Waktu</p>
                        <p className="font-label-bold text-label-bold">09:00 - 10:30</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[12px] text-outline font-bold">Lokasi</p>
                        <p className="font-label-bold text-label-bold">Gedung B, Lt. 4</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-outline-variant/30">
                    <button className="flex-1 min-w-[140px] py-3 px-4 rounded-xl font-label-bold text-label-bold text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all">Reschedule</button>
                    <button className="flex-1 min-w-[140px] py-3 px-4 rounded-xl font-label-bold text-label-bold text-error border border-error/20 hover:bg-error/5 transition-all">Batalkan</button>
                    <button className="w-full md:w-auto px-6 py-3 gradient-primary text-white rounded-xl font-label-bold text-label-bold shadow-md shadow-primary/10">Lihat Detail</button>
                  </div>
                </div>
              </section>

              <section className="glass-card rounded-[24px] p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-headline-md text-headline-md text-on-surface">Mendatang & Riwayat</h3>
                  <div className="flex bg-surface-container-low rounded-lg p-1">
                    <button className="px-4 py-1.5 text-label-sm font-bold bg-white rounded-md shadow-sm">Semua</button>
                    <button className="px-4 py-1.5 text-label-sm font-bold text-on-surface-variant hover:text-on-surface">Mendatang</button>
                    <button className="px-4 py-1.5 text-label-sm font-bold text-on-surface-variant hover:text-on-surface">Selesai</button>
                  </div>
                </div>
                <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">
                  <div className="flex gap-6 relative group">
                    <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shrink-0 z-10 shadow-lg shadow-secondary/20">
                      <Syringe className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pb-6 border-b border-outline-variant/20">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-label-bold text-label-bold text-on-surface">Vaksinasi Booster Influenza</h4>
                          <p className="text-body-md text-on-surface-variant">Klinik Umum • dr. Sarah Wijaya</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary font-label-sm text-[11px] font-bold uppercase">Terjadwal</span>
                      </div>
                      <div className="flex items-center gap-4 text-on-surface-variant">
                        <span className="flex items-center gap-1.5 text-label-sm font-bold"><Calendar className="w-4 h-4" /> 12 Nov 2026</span>
                        <span className="flex items-center gap-1.5 text-label-sm font-bold"><Clock className="w-4 h-4" /> 14:30 WIB</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 relative group">
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center shrink-0 z-10">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pb-6 border-b border-outline-variant/20 opacity-80">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-label-bold text-label-bold text-on-surface">Medical Check-up Tahunan</h4>
                          <p className="text-body-md text-on-surface-variant">Pusat Diagnostik • dr. Kevin Sanjaya</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-[11px] font-bold uppercase">Selesai</span>
                      </div>
                      <div className="flex items-center gap-4 text-on-surface-variant">
                        <span className="flex items-center gap-1.5 text-label-sm font-bold"><Calendar className="w-4 h-4" /> 05 Sep 2026</span>
                        <button className="ml-auto text-primary font-label-bold text-label-sm flex items-center gap-1 hover:underline">Hasil Lab <Download className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 relative group">
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center shrink-0 z-10">
                      <Smile className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pb-6 opacity-80">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-label-bold text-label-bold text-on-surface">Pembersihan Karang Gigi</h4>
                          <p className="text-body-md text-on-surface-variant">Klinik Gigi • drg. Linda Putri</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-[11px] font-bold uppercase">Selesai</span>
                      </div>
                      <div className="flex items-center gap-4 text-on-surface-variant">
                        <span className="flex items-center gap-1.5 text-label-sm font-bold"><Calendar className="w-4 h-4" /> 18 Jul 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-gutter">
              <section className="glass-card rounded-[24px] p-8 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-headline-md text-headline-md text-on-surface">Oktober 2026</h4>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-surface-container-low rounded"><ChevronLeft className="w-5 h-5" /></button>
                    <button className="p-1 hover:bg-surface-container-low rounded"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  <div className="text-center text-[11px] font-bold text-outline uppercase">Min</div>
                  <div class="text-center text-[11px] font-bold text-outline uppercase">Sen</div>
                  <div className="text-center text-[11px] font-bold text-outline uppercase">Sel</div>
                  <div className="text-center text-[11px] font-bold text-outline uppercase">Rab</div>
                  <div className="text-center text-[11px] font-bold text-outline uppercase">Kam</div>
                  <div className="text-center text-[11px] font-bold text-outline uppercase">Jum</div>
                  <div className="text-center text-[11px] font-bold text-outline uppercase">Sab</div>
                  <div className="h-8"></div>
                  <div className="h-8"></div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">1</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">2</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">3</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">4</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">5</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">6</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">7</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">8</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">9</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">10</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">11</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">12</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">13</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">14</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">15</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">16</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">17</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">18</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">19</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">20</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">21</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">22</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">23</div>
                  <div className="h-8 flex items-center justify-center font-label-bold bg-primary text-white rounded-lg shadow-sm">24</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer relative">
                    25<div className="absolute bottom-1 w-1 h-1 rounded-full bg-secondary"></div>
                  </div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">26</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">27</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">28</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">29</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">30</div>
                  <div className="h-8 flex items-center justify-center font-label-sm font-bold rounded-lg hover:bg-surface-container-low cursor-pointer">31</div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
                    <div className="w-2 h-10 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="font-label-bold text-label-bold">Pemeriksaan Jantung</p>
                      <p className="text-[12px] text-on-surface-variant font-bold">Besok • 09:00 WIB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
                    <div className="w-2 h-10 rounded-full bg-secondary"></div>
                    <div className="flex-1">
                      <p className="font-label-bold text-label-bold">Vaksin Booster</p>
                      <p className="text-[12px] text-on-surface-variant font-bold">12 Nov • 14:30 WIB</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="relative rounded-[24px] p-8 text-white overflow-hidden shadow-xl shadow-secondary/20">
                <div className="absolute inset-0 gradient-primary -z-10"></div>
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-3xl"></div>
                <div className="relative z-10">
                  <AlertTriangle className="w-10 h-10 mb-4 opacity-80" />
                  <h4 className="font-headline-lg text-headline-lg font-bold mb-3">Butuh Bantuan Segera?</h4>
                  <p className="font-body-md text-white/80 mb-6">Layanan chat prioritas dengan tim medis RS Louis untuk pertanyaan mendesak.</p>
                  <button className="w-full py-4 bg-white text-primary font-label-bold text-label-bold rounded-xl shadow-lg hover:bg-on-primary-container transition-all">Chat Konsultasi</button>
                </div>
              </section>

              <section className="glass-card rounded-[24px] p-8">
                <h4 className="font-label-bold text-label-bold text-on-surface mb-4 uppercase tracking-wider">Persiapan Kunjungan</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded border-2 border-primary/30 bg-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-body-md text-on-surface font-bold">Bawa KTP & Kartu Asuransi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded border-2 border-primary/30 flex items-center justify-center shrink-0"></div>
                    <span className="text-body-md text-on-surface font-bold">Puasa 8 jam (untuk lab jantung)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded border-2 border-primary/30 flex items-center justify-center shrink-0"></div>
                    <span className="text-body-md text-on-surface font-bold">Membawa hasil rontgen terakhir</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
