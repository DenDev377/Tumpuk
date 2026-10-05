import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditTaskForm from "./EditTasksForm";

export default async function EditTask({ params }: any) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return <div className="p-8 text-slate-500">Silakan login.</div>;
    }

    const resolvedParams = await params;

    if (!resolvedParams?.id) {
        notFound()
    }

    const task = await prisma.task.findUnique({
        where: {
            id: resolvedParams.id
        }
    })

    if (!task) {
        notFound()
    }

    return (
        <div className="w-full mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
            <EditTaskForm initialData={task} />
        </div>
    )
}
