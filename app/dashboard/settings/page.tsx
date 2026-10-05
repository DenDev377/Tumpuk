import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pengaturan | Tumpuk App',
  description: 'Konfigurasi profil dan keamanan kredensial akun Anda.',
};

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
        return (
            <div className="p-8 text-slate-500">
                Silakan login terlebih dahulu mengakses rahasia ini.
            </div>
        );
    }

    const userData = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        select: {
            id: true,
            name: true,
            email: true,
            // Password mutlak tidak ditarik (Dibiarkan false) karena resiko expose!
        }
    });

    if (!userData) {
        return <div>Terjadi kesalahan dalam pencarian data.</div>;
    }

    return (
        <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
            <h1 className="text-3xl font-serif text-slate-900 tracking-tight">Pengaturan Privasi</h1>
            <p className="mt-2 text-slate-600 text-sm">
                Rancang ulang identitas Anda hingga merombak protokol keamanan password.
            </p>

            {/* Inisialisasi formulir klien dengan data pengguna */}
            <div className="mt-8">
                <SettingsForm user={userData} />
            </div>
        </div>
    );
}