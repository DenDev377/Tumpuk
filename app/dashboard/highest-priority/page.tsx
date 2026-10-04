import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import TaskHighPriority from "@/components/dashboard/TasksHighPriorityTable";

export default async function highestPriorityPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return (
            <div className="p-8 text-slate-500">
                Silakan login terlebih dahulu untuk melihat daftar tugas.
            </div>
        );
    }
    const highestPriority = await prisma.task.findMany({
        where: {
            userId: session.user.id,
            priority: "Tinggi"
        },
        orderBy: { createdAt: "desc" }
    })

    const userName = session?.user?.name || "Banyak";
    return (
        <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Tugas Prioritas Tinggi</h1>
            <p className="mt-2 text-gray-700">
                Hello {userName} ,Welcome to the Highest Priority Page
            </p>

            <div className="mt-8">
                <TaskHighPriority dataTasks={highestPriority} />

            </div>


        </div>
    )
}