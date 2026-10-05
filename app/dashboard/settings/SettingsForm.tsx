"use client";

import { useRef, useState } from "react";
import { updateProfile, updatePassword } from "@/app/actions/userActions";
import { Check, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserProfile {
    name: string;
    email: string;
}

export default function SettingsForm({ user }: { user: UserProfile }) {
    const router = useRouter(); // Refresh komponen Nav bila perlu

    // State Profil
    const formProfileRef = useRef<HTMLFormElement>(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [msgProfile, setMsgProfile] = useState("");
    const [errorProfile, setErrorProfile] = useState("");

    // State Keamanan
    const formPasswordRef = useRef<HTMLFormElement>(null);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [msgPassword, setMsgPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    async function handleUpdateProfile(formData: FormData) {
        setLoadingProfile(true);
        setErrorProfile("");
        setMsgProfile("");

        try {
            await updateProfile(formData);
            setMsgProfile("Identitas profil berhasil diperbarui!");
            // Refresh halaman paksa agar UseSession mendapatkan pembaruan Navbar (di latar belakang)
            router.refresh();
        } catch (err: any) {
            setErrorProfile(err.message || "Gagal mengubah profil.");
        } finally {
            setLoadingProfile(false);
        }
    }

    async function handleUpdatePassword(formData: FormData) {
        setLoadingPassword(true);
        setErrorPassword("");
        setMsgPassword("");

        try {
            await updatePassword(formData);
            setMsgPassword("Sandi Anda berhasil dirombak. Akun Anda kini lebih aman!");
            formPasswordRef.current?.reset();
        } catch (err: any) {
            setErrorPassword(err.message || "Validasi gagal diretas.");
        } finally {
            setLoadingPassword(false);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            
            {/* KOTAK 1: PROFIL IDENTITAS */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8">
                <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-6">Ubah Profil</h2>
               
                {msgProfile && (
                    <div className="flex items-center gap-2 p-3 mb-5 text-sm text-brand-700 bg-brand-50 rounded-lg font-medium border border-brand-100">
                        <Check className="w-4 h-4" /> {msgProfile}
                    </div>
                )}
                {errorProfile && (
                    <div className="p-3 mb-5 text-sm text-red-600 bg-red-50 rounded-lg">{errorProfile}</div>
                )}

                <form ref={formProfileRef} action={handleUpdateProfile} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5 md:w-1/2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-700">Nama Panggilan</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={user.name}
                            required
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1.5 md:w-1/2">
                        <label className="text-sm font-medium text-slate-500">Email Akun (Tidak Bisa Diubah)</label>
                        <input
                            type="email"
                            defaultValue={user.email}
                            disabled
                            className="px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-400 cursor-not-allowed"
                        />
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            disabled={loadingProfile}
                            className="px-6 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loadingProfile ? "Menyimpan Identitas..." : "Simpan Profil"}
                        </button>
                    </div>
                </form>
            </div>


            {/* KOTAK 2: BRANKAS KEAMANAN / SANDI */}
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden p-6 md:p-8">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
                    <ShieldAlert className="w-5 h-5 text-red-500" />
                    <h2 className="text-lg font-semibold text-slate-900">Perbarui Kata Sandi</h2>
                </div>
               
                {msgPassword && (
                    <div className="flex items-center gap-2 p-3 mb-5 text-sm text-emerald-700 bg-emerald-50 rounded-lg font-medium border border-emerald-100">
                        <Check className="w-4 h-4" /> {msgPassword}
                    </div>
                )}
                {errorPassword && (
                    <div className="p-3 mb-5 text-sm text-red-600 bg-red-50 rounded-lg">{errorPassword}</div>
                )}

                <form ref={formPasswordRef} action={handleUpdatePassword} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5 md:w-1/2">
                        <label htmlFor="currentPassword" className="text-sm font-medium text-slate-700">Kata Sandi Saat Ini</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            required
                            placeholder="Ketik password lama..."
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1.5 md:w-1/2">
                        <label htmlFor="newPassword" className="text-sm font-medium text-slate-700">Kata Sandi Baru</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            required
                            placeholder="Minimal 6 karakter..."
                            className="px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors shadow-sm"
                        />
                    </div>
                    
                    <div className="mt-2">
                        <button
                            type="submit"
                            disabled={loadingPassword}
                            className="px-6 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                            {loadingPassword ? "Menyandikan Ulang..." : "Ubah Kata Sandi"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}
