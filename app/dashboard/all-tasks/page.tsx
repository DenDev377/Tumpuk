import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import AllTasksTable from "@/components/dashboard/AllTasksTable";
import { prisma } from "@/lib/prisma";



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
            <h1 className="text-2xl font-semibold text-gray-900">Semua Tugas</h1>
            <p className="mt-2 text-gray-700">
                Hello {userName} ,Welcome to the All Task
            </p>

            <div className="mt-8">
                <AllTasksTable dataTasks={allTasksData} />
            </div>


        </div>
    )
}