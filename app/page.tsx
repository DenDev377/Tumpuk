"use client";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import FeatureSection from "@/components/FeatureSection";
import { CheckSquare, Image, Flag, Bell, Clock, Layers } from "lucide-react";
import { FeatureItem } from "@/types/feature";

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

      <section className="bg-linear-to-br from-[#5271E3] via-[#6865E5] to-[#745EEC] min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-4xl sm:text-5xl mb-6">
            Tumpukan tugas,{" "}
            <span className="font-bold">akhirnya bisa diatur.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            Catat tugas, unggah gambar, tandai mana yang paling berat — semua di
            satu tempat. Gratis, tanpa ribet.
          </p>
        </div>
        <Button href="#" variant="primary">
          Get Started
        </Button>
      </section>

      <FeatureSection
        eyebrow="Fitur"
        title="Semua yang kamu butuhin"
        description="Semua fitur yang kamu butuhkan ada disini."
        subtitle="Fitur lengkap buat ngatur tugas, tanpa biaya tersembunyi."
        feature={feature}
      />
    </div>
  );
}
