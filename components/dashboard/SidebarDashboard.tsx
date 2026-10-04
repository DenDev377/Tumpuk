"use client";

import {
  ChevronsLeft,
  LayoutDashboard,
  StickyNote,
  ClipboardCheck,
  FileExclamationPoint,
  UserRoundCog,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarDashboard() {
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      name: "Semua Tugas",
      href: "/dashboard/all-tasks",
      icon: <StickyNote className="w-4 h-4" />,
    },
    {
      name: "Tugas Selesai",
      href: "/dashboard/completed-tasks",
      icon: <ClipboardCheck className="w-4 h-4" />,
    },
    {
      name: "Prioritas Tinggi",
      href: "/dashboard/highest-priority",
      icon: <FileExclamationPoint className="w-4 h-4" />,
    },
    {
      name: "Pengaturan",
      href: "/dashboard/settings",
      icon: <UserRoundCog className="w-4 h-4" />,
    },
  ];
  return (
    <aside className="w-80 bg-white border-slate-200 border-r flex flex-col min-h-screen shrink-0">
      <div className="flex flex-col h-full">
        {/* SIDEBAR HEADER */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3 select-none">
            {/* Crisp, geometric logo mark */}
            <div className="w-7 h-7 bg-slate-900 rounded-sm flex items-center justify-center shrink-0">
              <div
                className="w-2.5 h-2.5 border-[1.5px] border-white"
                style={{ transform: "rotate(45deg)" }}
              />
            </div>
            <span className="text-base font-semibold tracking-tight text-slate-900">
              Tumpuk
            </span>
          </div>

          <button aria-label="Tutup menu navigasi" className="text-slate-400 hover:text-slate-900 transition-colors p-1.5 rounded-sm hover:bg-slate-100">
            <ChevronsLeft aria-hidden="true" className="w-4 h-4" />
          </button>
        </div>

        {/* SIDEBAR MENU (Workspace for User) */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Silakan Anda tambahkan menu sidebar di sini */}
          <ul className="space-y-1.5">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group font-medium text-sm
                      ${isActive 
                        ? 'bg-brand-50 text-brand-600 font-semibold shadow-sm' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                      }`}
                  >
                    <div className={`${isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'} transition-colors`}>
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-4 border-t border-slate-200 shrink-0">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors group">
            <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
            Keluar Aplikasi
          </button>
        </div>
      </div>
    </aside>
  );
}
