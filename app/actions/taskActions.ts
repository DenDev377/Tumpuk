"use server"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache"; //refresh halaman otomatis
import { Priority, Status } from "@prisma/client";

export async function createTask(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error("Anda harus login untuk membuat tugas!.")
    }

    const title = formData.get("title") as string;
    const status = formData.get("status") as Status;
    const priority = formData.get("priority") as Priority;
    const dueDateStr = formData.get("dueDate") as string;

    if (!title || title.trim().length === 0) {
        throw new Error("Judul tugas tidak boleh kosong atau hanya berisi spasi!")
    }
    if (!status || !priority) {
        throw new Error("Status dan Prioritas wajib diisi!")
    }
    let dueDate: Date | null = null
    if (dueDateStr) {
        dueDate = new Date(dueDateStr)
    }

    //insert data ke database
    await prisma.task.create({
        data: {
            title,
            status,
            priority,
            dueDate,
            userId: session.user.id,

        }
    })

    revalidatePath("/dashboard/all-tasks")
}

export async function deleteTask(id: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Anda harus login untuk menghapus tugas!")

    }

    await prisma.task.delete({
        where: {
            id: id
        }
    })

    revalidatePath("/dashboard/all-tasks")

}
export async function updateTask(taskId: string, formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Anda harus login untuk mengedit tugas!")
    }
    const title = formData.get("title") as string;
    const status = formData.get("status") as Status;
    const priority = formData.get("priority") as Priority;
    const dueDateStr = formData.get("dueDate") as string;

    if (!title || title.trim().length === 0) {
        throw new Error("Judul tugas tidak boleh kosong atau hanya berisi spasi!")
    }
    if (!status || !priority) {
        throw new Error("Status dan Prioritas wajib diisi!")
    }
    let dueDate: Date | null = null;
    if (dueDateStr) {
        dueDate = new Date(dueDateStr);
    }

    await prisma.task.update({
        where: {
            id: taskId,
            userId: session.user.id,
        },
        data: {
            title,
            status,
            priority,
            dueDate,
        },
    });

    revalidatePath("/dashboard/all-tasks")
}