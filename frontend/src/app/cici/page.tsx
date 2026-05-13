import Image from "next/image";
import Link from "next/link";
import { 
  Activity, LayoutDashboard, Bot, History, 
  Stethoscope, HelpCircle, Calendar, Settings, LogOut, 
  Bell, UserCircle, User, Star, ImageIcon, Mic, Send 
} from "lucide-react";

export default function Cici() {
  return (
    <div className="flex h-screen overflow-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* SideNavBar */}
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
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-label-md font-bold">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold shadow-sm" href="/cici">
            <Bot className="w-5 h-5" />
            <span className="font-label-md font-bold">Tanya Cici</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="/jadwal">
            <History className="w-5 h-5" />
            <span className="font-label-md font-bold">Riwayat</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <Stethoscope className="w-5 h-5" />
            <span className="font-label-md font-bold">Apotek</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <HelpCircle className="w-5 h-5" />
            <span className="font-label-md font-bold">Bantuan</span>
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant space-y-1">
          <button className="w-full mb-4 py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold font-label-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all">
            <Calendar className="w-5 h-5" />
            Booking Sekarang
          </button>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <Settings className="w-5 h-5" />
            <span className="font-label-md font-bold">Pengaturan</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" href="#">
            <LogOut className="w-5 h-5" />
            <span className="font-label-md font-bold">Keluar</span>
          </Link>
        </div>
      </aside>

      {/* Main Chat Canvas */}
      <main className="flex-1 flex flex-col relative h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
        <header className="h-16 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-outline-variant sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant">
                <img alt="Cici AI" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBmM6rTrLlEdTtEz4ImM3hTevS1V2DphrNjWMJhFjkonSejRYghiW7VWJV3ualEQN-ZIBGm_VhZklmdMkMCLxy7VSdU1gpi0fokcdWO5-eh5pRDWzGCj3fsvmjHSr7re7RSxbYiI0Tov8V-RKApLPOZUVx-zHnYdL4vOvNRfXPF_ExjsOKTmKfV88rNJCvxL5YSW7VDhUWdQDLWAm4m8Di4Cjc6DSip06ar8IabjRL9i8VNDKRpYqs25olxXrjxAdMCVLfIv_pN5By" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-surface rounded-full"></div>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md font-bold leading-tight">Tanya Cici</h2>
              <p className="text-label-sm font-label-sm text-primary flex items-center gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
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

        <div id="ai-chat-box" className="flex-1 overflow-y-auto px-4 md:px-10 py-8 space-y-8 pb-32">
          {/* AI Message */}
          <div className="flex gap-4 max-w-3xl">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
              <Bot className="w-5 h-5 text-on-primary-container" />
            </div>
            <div className="glass-bubble-ai rounded-2xl rounded-tl-none p-5 text-on-surface-variant">
              <p className="font-body-md text-body-md mb-2">Halo! Saya Cici, asisten kesehatan AI Anda. Bagaimana perasaan Anda hari ini? Ceritakan gejala yang Anda rasakan agar saya bisa membantu melakukan skrining awal.</p>
              <p className="text-label-sm font-label-sm text-outline italic">Sesi ini bersifat privasi dan terenkripsi.</p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-4 max-w-3xl ml-auto flex-row-reverse">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="bg-primary text-white rounded-2xl rounded-tr-none p-5 shadow-lg shadow-primary/20">
              <p className="font-body-md text-body-md">Sudah dua hari ini saya merasa pusing di bagian dahi dan sedikit nyeri tenggorokan.</p>
            </div>
          </div>

          {/* AI Message with Doctor Cards */}
          <div className="flex gap-4 max-w-4xl">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
              <Bot className="w-5 h-5 text-on-primary-container" />
            </div>
            <div className="space-y-4">
              <div className="glass-bubble-ai rounded-2xl rounded-tl-none p-5 text-on-surface-variant">
                <p className="font-body-md text-body-md">Berdasarkan gejala Anda, ada indikasi kelelahan atau gejala flu ringan. Saya sarankan untuk berkonsultasi dengan Dokter Umum. Berikut jadwal dokter yang tersedia hari ini di RS Louis:</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card rounded-[24px] p-4 flex flex-col gap-4 border border-outline-variant hover:border-primary transition-all group">
                  <div className="flex items-center gap-4">
                    <img className="w-16 h-16 rounded-2xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ktNx7QVa5KSjOpY3-JG070tF46ryFeMegQDlQpcEG1-tN_1gZoWQ58u0Ccq_Mk58aDMl_q18ickek1gBOYwEfvfymktI6sNo1Z7HFzvpE77LKq55raaSpLoqtvx7CI9rBiUhpleBdEvaMOQCmra8_jyG9tUviiO_rRiQda4axSL8o4TUqFBi2AvL-5_fdgnPId8X_VUCzUNbeCGrcjDWg6MkU6zehF7ScFQ6yM4oYmHUxWJpI6NELdK2Y1Ie6j6vRJN-Bz1uyw6C" alt="Doctor" />
                    <div className="flex-1">
                      <h4 className="font-headline-md text-body-lg font-bold">Dr. Adrian Wijaya</h4>
                      <p className="text-label-sm text-outline">Spesialis Penyakit Dalam</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-label-sm font-bold">4.9</span>
                        <span className="text-label-sm text-outline">(120+ Review)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-bold text-primary">14:00 - 16:00</div>
                    <div className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-bold text-primary">19:00 - 21:00</div>
                  </div>
                  <button className="w-full py-2 bg-secondary-container text-on-secondary-container rounded-xl font-bold font-label-bold group-hover:bg-primary group-hover:text-white transition-all">Pilih Jadwal</button>
                </div>
                <div className="glass-card rounded-[24px] p-4 flex flex-col gap-4 border border-outline-variant hover:border-primary transition-all group">
                  <div className="flex items-center gap-4">
                    <img className="w-16 h-16 rounded-2xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLHRIJi2pUS4XXbIIcC3CE9PVgn0tigsvHVQJeVt6_M06q8jMEIIhP-UzpcDzmF2wLhN5lv0QljU2RiqAp5kIm0fk_cBmMs0UoFfiuh2BNxVNkHOEIAWLUzVQZfF4HtawbpMKfhafGj4_gqpaeU5d0UdGLzS59snhjLn54IVjXxwmbCtUrcCiXe8y9-RzxqLX6cRz7JTWHkN4iWdbi8LBuoURSMwX3hUkxx_jNQsyENTN8A8oVFzmcy8dNAPIpboBR3g51S2urPGH8" alt="Doctor" />
                    <div className="flex-1">
                      <h4 className="font-headline-md text-body-lg font-bold">Dr. Sarah Quinn</h4>
                      <p className="text-label-sm text-outline">Dokter Umum</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-label-sm font-bold">4.8</span>
                        <span className="text-label-sm text-outline">(85+ Review)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-bold text-primary">Sekarang</div>
                    <div className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-bold text-primary">15:30 - 18:00</div>
                  </div>
                  <button className="w-full py-2 bg-secondary-container text-on-secondary-container rounded-xl font-bold font-label-bold group-hover:bg-primary group-hover:text-white transition-all">Pilih Jadwal</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 max-w-3xl">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
              <Bot className="w-5 h-5 text-on-primary-container" />
            </div>
            <div className="flex gap-1.5 p-4 glass-bubble-ai rounded-2xl rounded-tl-none">
              <div className="w-2 h-2 bg-outline-variant rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-outline-variant rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-outline-variant rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-2 flex items-center gap-2 border border-outline-variant active-glow transition-shadow">
            <div className="flex items-center gap-1 px-2 border-r border-outline-variant/30">
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <input className="flex-1 bg-transparent border-none focus:ring-0 text-body-md font-body-md px-4 outline-none placeholder:text-outline/60" placeholder="Tulis gejala atau pertanyaan Anda di sini..." type="text" />
            <button className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      <aside className="hidden xl:flex flex-col w-80 h-screen sticky top-0 p-6 bg-surface border-l border-outline-variant">
        <div className="mb-8">
          <h3 className="font-headline-md text-body-lg font-bold mb-4">Ringkasan Sesi</h3>
          <div className="glass-card rounded-2xl p-4 space-y-4">
            <div>
              <p className="text-label-sm font-label-bold text-outline uppercase tracking-wider mb-1">Gejala Terdeteksi</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-[12px] font-bold">Pusing</span>
                <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-[12px] font-bold">Nyeri Tenggorokan</span>
              </div>
            </div>
            <div>
              <p className="text-label-sm font-label-bold text-outline uppercase tracking-wider mb-1">Tingkat Urgensi</p>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-primary"></div>
              </div>
              <p className="text-[12px] mt-1 font-bold text-primary">Rendah - Konsultasi Disarankan</p>
            </div>
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
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0u0oAVaLjTbPSo_pjujJitwHnsNpvTZX7WN7h5dP-4RfU9qjVwETiX6qswEmB_KB1rg9RZ1JuMpRgX15qD65xeAPZmcI2GGFLgLipTZR6wBuYo4G-uriM7L-81wEe3TfFYTSplNLxkYOhd55OdjAhWX-k5jZ8Lwbk6JWrWr4O9mjzJH3jZXZJKjaXq6u2VlXP0tXMOKTsqJi7FDVmHYIMysGtJM5EpsTzrUK2a_HJz_vVIihA5U8Joqxk1yVvA8tClr63raShWEbP" alt="Artikel" />
              </div>
              <h5 className="text-label-bold font-bold leading-tight group-hover:text-primary transition-colors">Membedakan Flu dan Alergi Musiman</h5>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
