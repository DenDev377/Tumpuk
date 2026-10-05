"use client";
import { useSession } from "next-auth/react";
import { Search, Plus, Menu, X, LayoutDashboard, StickyNote, ClipboardCheck, FileExclamationPoint, UserRoundCog, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavbarDashboard() {

  //declare hook useSession untuk mendapat data user 
  const { data: session, status } = useSession();

  //abmil inisial nama 
  const userName = session?.user?.name || "Banyak";
  const userInitial = userName.charAt(0).toUpperCase();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Daftar menu yang diduplikasi dari sidebar agar mobile user tetap bisa menavigasi penuh
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Semua Tugas", href: "/dashboard/all-tasks", icon: <StickyNote className="w-5 h-5" /> },
    { name: "Tugas Selesai", href: "/dashboard/completed-tasks", icon: <ClipboardCheck className="w-5 h-5" /> },
    { name: "Prioritas Tinggi", href: "/dashboard/highest-priority", icon: <FileExclamationPoint className="w-5 h-5" /> },
    { name: "Pengaturan", href: "/dashboard/settings", icon: <UserRoundCog className="w-5 h-5" /> },
  ];

  // Efek Debouncing: Tunggu pengguna selesai mengetik selama 400ms sebelum melempar pancingan
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        router.push(`/dashboard/search?q=${encodeURIComponent(searchTerm)}`);
      } else if (searchParams.has("q")) {
        // Jika teks pencarian dikosongkan tapi sebelumnya ada 'query', kembalikan ke dashboard
        router.push("/dashboard");
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router, searchParams]);

  return (
    <nav className="w-full bg-white border-b border-slate-100 shrink-0 relative z-40">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-3 md:gap-4">
        
        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-slate-500 hover:text-slate-900 transition-colors p-1"
          aria-label="Buka Menu Navigasi"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search bar - Mobile: flex-1; Desktop: max-w-md */}
        <div className="flex items-center gap-2.5 flex-1 md:max-w-md bg-slate-50 rounded-xl px-3 h-10 border border-slate-300 focus-within:border-brand-500/30 focus-within:ring-2 focus-within:ring-brand-500/10 transition-colors">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari tugas..."
            className="w-full bg-transparent text-sm md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Avatar + name (Disembunyikan ketat di Mobile) */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium shrink-0">
              {status === "loading" ? "..." : userInitial}
            </div>
            <span className="text-sm font-medium text-slate-900 hidden md:block">
              {status === "loading" ? "..." : userName}
            </span>
          </div>

          {/* CTA tambah tugas - Mode Mobile Icon = Plus Only -> Desain Compact */}
          <Link 
            href="/dashboard/addTasks"
            className="inline-flex items-center justify-center bg-slate-900 text-white rounded-full p-2 md:px-4 md:py-2 text-sm font-medium hover:bg-brand-500 transition-colors shrink-0"
            aria-label="Tambah Tugas Baru"
          >
            <Plus className="w-5 h-5 md:w-4 md:h-4" />
            <span className="hidden md:inline-block ml-1.5">Tambah Tugas</span>
          </Link>
        </div>
      </div>

      {/* OVERLAY MENU KHUSUS MOBILE */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#F8FAFC] z-50 md:hidden flex flex-col h-[100dvh]">
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-3 select-none">
              <div className="w-7 h-7 bg-slate-900 rounded-sm flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 border-[1.5px] border-white" style={{ transform: "rotate(45deg)" }} />
              </div>
              <span className="text-base font-semibold tracking-tight text-slate-900">Tumpuk</span>
            </div>
            
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500 hover:text-slate-900 p-2">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 flex flex-col pt-6 pb-20 justify-between">
            <ul className="space-y-4">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group font-medium text-base shadow-sm ring-1 ring-slate-200/50
                        ${isActive 
                          ? 'bg-brand-50 text-brand-600 font-semibold ring-brand-500/20' 
                          : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-brand-600'
                        }`}
                    >
                      <div className={`${isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'}`}>
                        {item.icon}
                      </div>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button className="flex items-center gap-4 px-4 py-3.5 mt-8 w-full rounded-xl text-base font-medium text-slate-700 bg-white ring-1 ring-slate-200/50 shadow-sm hover:bg-red-50 hover:text-red-600 hover:ring-red-500/20 transition-all">
              <LogOut className="w-5 h-5 text-slate-400" />
              Keluar Aplikasi
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
