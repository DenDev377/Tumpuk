"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs"

export async function updateProfile(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error("Anda harus login!");
    }

    const name = formData.get("name") as string;

    if (!name || name.trim().length === 0) {
        throw new Error("Nama tidak boleh kosong!");
    }

    await prisma.user.update({
        where: { id: session.user.id },
        data: { name: name.trim() }
    });

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
}

export async function updatePassword(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error("Anda harus login!");
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!currentPassword || !newPassword) {
        throw new Error("Semua kolom password wajib diisi!");
    }

    if (newPassword.trim().length < 6) {
        throw new Error("Password baru minimal 6 karakter!");
    }

    // Cek password lama di database
    const user = await prisma.user.findUnique({
        where: { id: session.user.id }
    });

    if (!user) {
        throw new Error("Data pengguna tidak ditemukan!");
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
        throw new Error("Kata sandi saat ini salah!");
    }

    // Hash dan Enkripsi password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: session.user.id },
        data: { password: hashedNewPassword }
    });
}
