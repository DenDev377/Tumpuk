"use client";

import Navbar from "@/layouts/Navbar";
import Button from "@/components/Button";
import FeatureSection from "@/section/FeatureSection";
import { CheckSquare, Image, Flag, Bell, Clock, Layers } from "lucide-react";
import { FeatureItem } from "@/types/feature";
import ContactSection from "@/section/ContactSection";

const feature: FeatureItem[] = [
  {
    icon: CheckSquare,
    title: "Catat Tugas",
    description:
      "Buat tugas dengan judul, deskripsi, dan status. ubah kapan saja sesuai progress.",
  },
  {
    icon: Image,
    title: "Unggah Gambar",
    description:
      "Lampirkan screenshot atau referensi ke setiap tugas agar tidak lupa dengan konteks.",
  },
  {
    icon: Flag,
    title: "Pilih Prioritas",
    description:
      "Tandai tugas yang paling berat. Prioritas akan menentukan urutan tugas.",
  },
  {
    icon: Bell,
    title: "Pemberitahuan",
    description:
      "Dapatkan pemberitahuan ketika tugas dibuat, diselesaikan, atau diperbarui.",
  },
  {
    icon: Clock,
    title: "Riwayat Aktivitas",
    description:
      "Lacak kapan tugas dibuat dan diselesaikan. Audit kerjamu kalau perlu.",
  },
  {
    icon: Layers,
    title: "Kategori",
    description: "Organisir tugas dengan kategori. Mudah untuk diorganisir.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-32"
        style={{
          backgroundColor: "#5271E3",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(116,94,236,0.45) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(104,101,229,0.35) 0%, transparent 50%)",
        }}
      >
        <div className="max-w-3xl text-center text-white">
          <h1 className="font-serif text-5xl sm:text-6xl leading-tight mb-6 font-normal">
            Tumpukan tugas, akhirnya bisa diatur.
          </h1>
          <p className="text-lg sm:text-xl text-white/85 mb-10 font-sans max-w-xl mx-auto leading-relaxed">
            Catat tugas, unggah gambar, tandai mana yang paling berat — semua di
            satu tempat. Gratis, tanpa ribet.
          </p>
        </div>
        <Button href="#" variant="primary">
          Mulai sekarang
        </Button>
      </section>

      <FeatureSection
        eyebrow="Fitur"
        title="Semua yang kamu butuhin"
        description="Semua fitur yang kamu butuhkan ada disini."
        subtitle="Fitur lengkap buat ngatur tugas, tanpa biaya tersembunyi."
        feature={feature}
      />

      <ContactSection
        eyebrow="Pertanyaan?"
        title="Buat pertanyaan"
        subtitle="Jika kamu memiliki pertanyaan, jangan ragu untuk bertanya."
      />

      <section className="bg-brand-500 px-4 py-32">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4 font-normal">
              Bergabunglah dengan buletin kami
            </h2>
            <p className="text-gray-100 text-lg max-w-lg mx-auto leading-relaxed ">
              Jangan ragu untuk bergabung dengan buletin kami. Kami akan
              menyampaikan informasi terbaru tentang Tumpuk.
            </p>
          </div>
          <form className="flex items-center gap-4 w-full">
            <input
              type="email"
              id="email"
              name="email"
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              placeholder="email@kamu.com"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium transition-colors bg-white text-brand-500 hover:bg-white/90 whitespace-nowrap"
            >
              Bergabung
            </button>
          </form>
          <div className="text-center mt-12">
            <p className="text-gray-100 text-sm mx-auto leading-relaxed max-w-lg">
              © 2026 Tumpuk | Made with ❤️ in Sumsel
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
