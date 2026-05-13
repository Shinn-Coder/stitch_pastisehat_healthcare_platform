import Image from "next/image";
import Link from "next/link";
import { 
  Stethoscope, LayoutDashboard, Bot, History, 
  HelpCircle, Calendar, Settings, LogOut, 
  Bell, MapPin, PlusCircle, CalendarCheck, 
  ArrowUpRight, FileText, Pill, ChevronRight, 
  MessageCircle 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-full">
      {/* SideNavBar Component */}
      <aside className="hidden lg:flex flex-col h-screen sticky top-0 p-md bg-surface-container-low dark:bg-surface-dim shadow-sm w-64 border-r border-outline-variant">
        <div className="flex items-center gap-3 px-4 py-8">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-primary">PastiSehat</h1>
            <p className="text-label-sm font-label-sm text-on-surface-variant">RS Louis Surabaya</p>
          </div>
        </div>
        <nav className="flex-1 px-2 space-y-2">
          {/* Dashboard Active */}
          <Link className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold scale-[0.98] transition-all" href="#">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-label-md text-label-bold">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <Bot className="w-5 h-5" />
            <span className="font-label-md text-label-bold">Tanya Cici</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <History className="w-5 h-5" />
            <span className="font-label-md text-label-bold">Riwayat</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <Pill className="w-5 h-5" />
            <span className="font-label-md text-label-bold">Apotek</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <HelpCircle className="w-5 h-5" />
            <span className="font-label-md text-label-bold">Bantuan</span>
          </Link>
        </nav>
        <div className="mt-auto px-2 pb-8 space-y-2">
          <button className="w-full bg-primary text-on-primary py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-6 hover:opacity-90 transition-opacity">
            <Calendar className="w-5 h-5" />
            Booking Sekarang
          </button>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <Settings className="w-5 h-5" />
            <span className="font-label-md text-label-bold">Pengaturan</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <LogOut className="w-5 h-5" />
            <span className="font-label-md text-label-bold">Keluar</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {/* TopAppBar Component */}
        <header className="bg-surface sticky top-0 z-30 border-b border-outline-variant">
          <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-16">
            <div className="flex items-center gap-8">
              <span className="lg:hidden text-headline-md font-headline-lg font-bold text-primary">PastiSehat</span>
              <div className="hidden md:flex items-center gap-6">
                <Link className="text-primary border-b-2 border-primary font-bold pb-1 font-label-md text-label-bold" href="#">Dashboard</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-bold" href="#">Booking</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-bold" href="#">Riwayat</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-bold" href="#">Apotek</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-surface-container-low transition-all">
                <Bell className="w-6 h-6 text-on-surface" />
              </button>
              <button className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-full hover:bg-surface-container-low transition-all border border-outline-variant">
                <img alt="User profile avatar" className="w-8 h-8 rounded-full border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq0JgzfQtDr0QHuk-m8YN6T9X_U3n_meT6HtVNYr1s10MIhjeVxh5Ji2PIOAz1-Kw56iQf5l28CqQUcvf0GJpRTLv73r8Tf0CKI9VEgWu9CNMB9rYZjcSlID4mISsmMxWKRcKjiBODAGstJ4BIgN2Dz52HGE6_Tx28qf6KuMU-gunreKN6O2wgZP-8sYkSaYoa9xAQXRIhOlwD3J78_VL-5P_3Uelyf8g8x0m7c5WaHITkj0c64tmSc_AAiS_tmlF6kohRFMu_mMOX" />
                <span className="font-label-bold text-label-bold hidden sm:inline">Dr. Louis</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-container-max mx-auto px-gutter py-8 space-y-12">
          {/* Hero Section */}
          <section className="relative rounded-[32px] overflow-hidden min-h-[400px] flex items-center p-8 lg:p-16">
            <div className="absolute inset-0 z-0">
              <img alt="Hero background" className="w-full h-full object-cover grayscale-[0.2]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQVb0jNgjI0F6ApZVWyvMewA456OhyfPu1IIkMRByIELCxK2V7C6X63zhUTif92l86-vgAroGV4hLqZiZXemSeDECyAFYWSaQgaiHMQeVglc9IZd14pOsNA-XZO3Z7rRm2cgS-qR4yyf2GKKrHrC-f7fdPFFe22yhhinE_RR1zzDRk21SBIxAKgGfjcKbtenoh7gfwK8b_tTnp9vWi8oxpgAo8jwEv9zyfATtEZboDqmgsY59ryd9sVKUI8X469wiY07dO97npJElD" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card inner-glow">
                <MapPin className="text-primary w-5 h-5" />
                <span className="font-label-bold text-label-bold text-primary">RS Louis Surabaya — Unit Onkologi</span>
              </div>
              <h2 className="font-display-lg text-display-lg text-on-surface leading-tight">
                Selamat Datang Kembali, <br /><span className="text-primary">Layanan Kesehatan Masa Depan.</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                Kelola jadwal konsultasi, hasil laboratorium genomik, dan riwayat kesehatan Anda dalam satu platform medis yang terintegrasi.
              </p>
              <div className="flex gap-4">
                <button className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all flex items-center gap-2">
                  <PlusCircle className="w-5 h-5" />
                  Konsultasi Baru
                </button>
                <button className="glass-card inner-glow text-primary px-8 py-4 rounded-2xl font-bold hover:bg-surface transition-all">
                  Lihat Jadwal
                </button>
              </div>
            </div>
          </section>

          {/* Dynamic Quick Access Grid */}
          <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="md:col-span-2 lg:col-span-2 bg-primary rounded-[24px] p-8 text-on-primary flex flex-col justify-between h-64 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="bg-white/20 p-3 rounded-2xl">
                  <Bot className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                  <span className="w-2 h-2 bg-error rounded-full animate-pulse"></span>
                  <span className="font-label-bold text-label-sm uppercase tracking-wider">LIVE</span>
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="font-headline-md text-headline-md mb-2">Tanya Cici</h3>
                <p className="font-body-md opacity-80">AI Health Assistant kami siap membantu diagnosa awal Anda.</p>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-2 glass-card rounded-[24px] p-8 flex flex-col justify-between h-64 border border-outline-variant hover:border-primary transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="bg-secondary-fixed p-3 rounded-2xl text-secondary">
                  <CalendarCheck className="w-8 h-8" />
                </div>
                <ArrowUpRight className="text-on-surface-variant w-6 h-6" />
              </div>
              <div>
                <p className="font-label-bold text-label-bold text-secondary mb-1">Janji Temu Berikutnya</p>
                <h3 className="font-headline-md text-headline-md text-on-surface">Besok, 09:00 WIB</h3>
                <p className="font-body-md text-on-surface-variant">Dr. Sarah Sp.PD — Poli Penyakit Dalam</p>
              </div>
            </div>

            <div className="md:col-span-1 lg:col-span-1 glass-card rounded-[24px] p-6 flex flex-col items-center justify-center gap-4 text-center border border-outline-variant hover:bg-surface-container transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <p className="font-label-bold text-label-bold">Hasil Lab</p>
                <p className="text-label-sm text-on-surface-variant">Tersedia 2 baru</p>
              </div>
            </div>

            <div className="md:col-span-1 lg:col-span-1 glass-card rounded-[24px] p-6 flex flex-col items-center justify-center gap-4 text-center border border-outline-variant hover:bg-surface-container transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                <Pill className="w-8 h-8" />
              </div>
              <div>
                <p className="font-label-bold text-label-bold">Resep Digital</p>
                <p className="text-label-sm text-on-surface-variant">Siap diambil</p>
              </div>
            </div>
          </section>

          {/* Articles Section */}
          <section className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Edukasi Kesehatan Terkurasi</h2>
                <p className="text-body-md text-on-surface-variant">Wawasan medis terkini dari tim ahli RS Louis.</p>
              </div>
              <button className="text-primary font-bold flex items-center gap-1 hover:underline">
                Lihat Semua Artikel
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Peran AI dalam Deteksi Dini Kanker Payudara", category: "Teknologi Medis", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKYrCk-psZKrqklxhp1-wPSQ60_p5E_IO3LnsKRj2niNu3RSvHVUGz26NyWadyVslzMgvFJNUry6FP6gxYwmKi5YTg3ZjRy5OCKyMSftwnrs2ugp-ylhY18MMGsihVbLccnxuBLbIKkQEdDvrzzHaCBuYYPxk52ukLNUotPbNASreetTljafnJfURjyKpiIeEjLoCrFEPbw45shhK-wLqIaHDJuk4hiSZKvD4Zq5lVjTgQvL4UTIi58p1F6nQObSRP0lRsXZE7tRXO", desc: "Bagaimana algoritma pembelajaran mendalam membantu radiolog mengidentifikasi anomali dengan akurasi 99%." },
                { title: "Manajemen Stres di Era Digital: Panduan Praktis", category: "Kesehatan Mental", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtGID3zvQwyiRoFUFoUVn1IKJb64RdfvQFBNMR8s46Ne6-XxW9IaVuTkPLPKZUmP1v9po46LxDBPprjG98wLRY3OA1df_a0nznSP0CaCi_TPvxYfsnY3Z0KYd7ObRPgqLyB--f6mEFcvjMA-vUpvDueT8bct0yplzoSmNY-VMclU0JlJlbVShIaPdDtFf7DlD0jVNULMxiDH5RBbf90TK8RLdPF7_ggOg61Maj4wY6m_-JOa16lDxAzNPl5ueHEbxMVOdrKNMLaCff", desc: "Tips dari psikolog klinis kami tentang menjaga keseimbangan hormon kortisol di tengah kesibukan." },
                { title: "Genomik Nutrisi: Mengapa Diet Anda Unik", category: "Nutrisi & Diet", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk_bgOTpU_-84-4S0Zb0rLl3dcrKDxjPFkMiA8mbphQGm66sFgvE4VXOVSjMtAAcJvh9SHm1JlFMt-jzTpR6H0l3OVMx_f0IJkJy0eIRslqSlKV-x0P3dUMHfAzWBTLUhHhJe9_kpsr6P4fTszjy9G3kktt5nhaURSg3b4cGbup3OYTNGgD2WcVdbCaTiHkmhOogINE7MtQsY_aPfUQqxuSNrRNpZ9XMqmT74KvbN_EsDwhv1rQXHCEYLVcbcaKIt7Geam9_qeZWtM", desc: "Memahami bagaimana DNA Anda mempengaruhi cara tubuh merespons nutrisi dari makanan sehari-hari." }
              ].map((article, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="rounded-3xl overflow-hidden aspect-[16/10] mb-4">
                    <img alt={article.category} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={article.img} />
                  </div>
                  <span className="px-3 py-1 bg-surface-container-high rounded-full font-label-bold text-label-sm text-on-surface-variant">{article.category}</span>
                  <h3 className="font-headline-md text-headline-md mt-3 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-body-md text-on-surface-variant mt-2 line-clamp-2">{article.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Component */}
        <footer className="w-full py-8 px-gutter flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-highest dark:bg-inverse-surface border-t border-outline-variant mt-16">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-label-md font-bold text-primary">PastiSehat</span>
            <p className="text-on-surface-variant dark:text-outline-variant font-body-md text-body-md text-center md:text-left">© 2026 RS Louis Surabaya. Terakreditasi KARS.</p>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link className="text-on-surface-variant dark:text-outline-variant hover:underline font-body-md text-body-md" href="#">Kebijakan Privasi</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant hover:underline font-body-md text-body-md" href="#">Syarat & Ketentuan</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant hover:underline font-body-md text-body-md" href="#">Pusat Bantuan</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant hover:underline font-body-md text-body-md" href="#">Kontak Kami</Link>
          </div>
        </footer>
      </main>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center z-50">
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
}
