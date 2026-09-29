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

export default function SidebarDashboard() {
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

          <button className="text-slate-400 hover:text-slate-900 transition-colors p-1.5 rounded-sm hover:bg-slate-100">
            <ChevronsLeft className="w-4 h-4" />
          </button>
        </div>

        {/* SIDEBAR MENU (Workspace for User) */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Silakan Anda tambahkan menu sidebar di sini */}
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex text-gray-900 items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100"
                >
                  {item.icon}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t border-slate-200 shrink-0">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-gray-900 hover:bg-slate-100 transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
