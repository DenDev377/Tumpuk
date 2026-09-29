"use client";
import { CardProps } from "@/types/card";
export default function Card({ label, value }: CardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-slate-500 tracking-wide">
        {label}
      </p>
      <p className="mt-1 text-3xl font-semibold text-slate-800">{value}</p>
    </div>
  );
}
