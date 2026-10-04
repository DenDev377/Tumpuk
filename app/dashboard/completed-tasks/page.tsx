import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import CompletedTable from "@/components/dashboard/CompletedTable";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tugas Selesai | Tumpuk App',
  description: 'Kumpulan pencapaian dan daftar tugas yang telah Anda selesaikan.',
};

export default async function completedTask() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return (
            <div className="p-8 text-slate-500">
                Silakan login terlebih dahulu untuk melihat daftar tugas.
            </div>
        );
    }
    const completedTaskData = await prisma.task.findMany({
        where: {
            userId: session.user.id,
            status: "SELESAI"
        },
        orderBy: { createdAt: "desc" }


    })

    const userName = session?.user?.name || "Banyak";
    return (
        <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-3xl font-serif text-slate-900 tracking-tight">Tugas Selesai</h1>
            <p className="mt-2 text-slate-600 text-sm">
                Kumpulan pencapaian brilian {userName}. Daftar tugas yang telah sukses dieksekusi.
            </p>

            <div className="mt-8">
                <CompletedTable dataTasks={completedTaskData} />

            </div>


        </div>
    )
}