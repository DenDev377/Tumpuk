"use client";
import type { FeatureCardProps } from "@/types/feature";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`group bg-white rounded-3xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translater-y-1 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#5271E3]/10 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-[#5271E3]" strokeWidth={2} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
