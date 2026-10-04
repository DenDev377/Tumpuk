import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import AllTasksTable from "@/components/dashboard/AllTasksTable";
import { prisma } from "@/lib/prisma";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Semua Tugas | Tumpuk App',
  description: 'Pantau dan kelola seluruh jejak rekam tugas Anda tanpa batasan.',
};

export default async function allTask() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return (
            <div className="p-8 text-slate-500">
                Silakan login terlebih dahulu untuk melihat daftar tugas.
            </div>
        );
    }
    const allTasksData = await prisma.task.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            // Lebih relevan diurutkan dari yang paling baru diinput (createdAt turun/desc)
            createdAt: "desc",
        },
    });
    const userName = session?.user?.name || "Banyak";
    return (
        <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-3xl font-serif text-slate-900 tracking-tight">Semua Tugas</h1>
            <p className="mt-2 text-slate-600 text-sm">
                Halo {userName}, pantau dan mutakhirkan seluruh rekam jejak tugas Anda tanpa batasan.
            </p>

            <div className="mt-8">
                <AllTasksTable dataTasks={allTasksData} />
            </div>


        </div>
    )
}