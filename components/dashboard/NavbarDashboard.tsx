"use client";
import { useSession } from "next-auth/react";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavbarDashboard() {

  //declare hook useSession untuk mendapat data user 
  const { data: session, status } = useSession();

  //abmil inisial nama 
  const userName = session?.user?.name || "Banyak";
  const userInitial = userName.charAt(0).toUpperCase();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

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
    <nav className="w-full bg-white border-b border-slate-100 shrink-0">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Search bar */}
        <div className="flex items-center gap-2.5 flex-1 max-w-md bg-slate-50 rounded-xl px-3.5 h-10 border border-slate-300 focus-within:border-brand-500/30 focus-within:ring-2 focus-within:ring-brand-500/10 transition-colors">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari tugas..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Avatar + name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium shrink-0">
              {status === "loading" ? "..." : userInitial}
            </div>
            <span className="text-sm font-medium text-slate-900 hidden sm:block">
              {status === "loading" ? "..." : userName}
            </span>
          </div>

          {/* CTA tambah tugas */}
          <Link 
            href="/dashboard/addTasks"
            className="inline-flex items-center gap-1.5 bg-slate-900 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-brand-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Tugas
          </Link>
        </div>
      </div>
    </nav>
  );
}
