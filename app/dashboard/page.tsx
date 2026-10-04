
import Card from "@/components/Card";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import TaskTablePriority from "@/components/dashboard/TasksTablePriority";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Tumpuk App',
  description: 'Ringkasan tugas dan statistik performa harian Anda.',
};

export default async function Dashboard() {

  const session = await getServerSession(authOptions)
  const userName = session?.user?.name || "Banyak"

  const importantTaskData = await prisma.task.findMany({
    where: {
      userId: session?.user?.id,
      priority: {
        in: ["Tinggi", "Menengah"]
      }
    },
    orderBy: {
      dueDate: "asc"
    }
  })

  const [totalTugasCount, selesaiCount, belumSelesaiCount, tinggiCount] = await Promise.all([
    //Total tugass
    prisma.task.count({ where: { userId: session?.user?.id } }),
    //Hitung Selesai
    prisma.task.count({ where: { userId: session?.user?.id, status: "SELESAI" } }),
    //belum selesai
    prisma.task.count({ where: { userId: session?.user?.id, status: { not: "SELESAI" } } }),
    //prioritas tinggi
    prisma.task.count({ where: { userId: session?.user?.id, priority: "Tinggi" } })
  ]




  )

  const stats = [
    {
      label: "Total Tugas",
      value: totalTugasCount.toString(),
    },
    {
      label: "Selesai",
      value: selesaiCount.toString(),
    },
    {
      label: "Belum Selesai",
      value: belumSelesaiCount.toString(),
    },
    {
      label: "Prioritas Tinggi",
      value: tinggiCount.toString(),
    },
  ];
  return (
    <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl font-serif text-gray-900 tracking-tight">Dashboard</h1>
      <p className="mt-2 text-gray-700">
        Hello {userName} ,Welcome to the Dashboard
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
      <div className="mt-8">
        <TaskTablePriority dataTasks={importantTaskData} />
      </div>


    </div>
  );
}
