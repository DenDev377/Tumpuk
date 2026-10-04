import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import AllTasksTable from "@/components/dashboard/AllTasksTable";
import type { Metadata } from 'next';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: 'Hasil Pencarian | Tumpuk App',
  description: 'Hasil pencarian tugas Anda.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return (
      <div className="p-8 text-slate-500">
        Silakan login terlebih dahulu.
      </div>
    );
  }

  // Next.js 15 requires awaiting searchParams
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  // Query database: cari tugas yang judulnya mengandung kata kunci
  const searchResults = await prisma.task.findMany({
    where: {
      userId: session.user.id,
      title: {
        contains: query, // mencari substring
      },
      // Note: Di MySQL Prisma, string fallback ke pencarian *case-insensitive* otomatis.
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8">
      
      {/* Tombol kembali yang elegan */}
      <div className="mb-4">
        <Link href="/dashboard" className="text-sm font-medium text-slate-500 hover:text-brand-600 inline-flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
      </div>

      <h1 className="text-3xl font-serif text-slate-900 tracking-tight">Hasil Pencarian</h1>
      <p className="mt-2 text-slate-600 text-sm">
        Ditemukan <span className="font-bold text-slate-900">{searchResults.length}</span> tugas yang cocok dengan kata kunci <span className="italic">"{query}"</span>.
      </p>

      <div className="mt-8">
        <AllTasksTable dataTasks={searchResults} />
      </div>
    </div>
  );
}
