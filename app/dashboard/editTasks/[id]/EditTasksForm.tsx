
"use client";

import { useRef, useState } from "react";
import { updateTask } from "@/app/actions/taskActions"; // Tarik fungsi UPDATE
import { useRouter } from "next/navigation";
import { EditTaskProps } from "@/types/tasks";


export default function EditTaskForm({ initialData }: EditTaskProps) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Mengubah Date Object Prisma menjadi teks format (Tahun-Bulan-Tanggal) agar bisa dibaca <input type="date"> HTML
    let formattedDate = "";
    if (initialData.dueDate) {
        const d = initialData.dueDate;
        formattedDate = d.toISOString().split("T")[0];
    }

    // Pencegat rahasia saat tombol Save dipencet
    async function actionHandler(formData: FormData) {
        setLoading(true);
        setErrorMsg("");

        try {
            // 1. Tembak fungsi updateTask dengan lemparan ID dan Formulir sekalian
            await updateTask(initialData.id, formData);

            // 2. Berhasil? Lempar kembali ke halaman semua-task
            router.push("/dashboard/all-tasks");
        } catch (err: any) {
            setErrorMsg(err.message || "Terjadi kesalahan!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl border border-slate-200 mt-6 shadow-sm">
            <h1 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                Edit Tugas <span className="text-slate-400 text-sm font-normal">(ID Singkat: {initialData.id.slice(-5).toUpperCase()})</span>
            </h1>

            {errorMsg && (
                <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">
                    {errorMsg}
                </div>
            )}

            {/* Sambungkan Actionnya ke fungsi Handler kita */}
            <form ref={formRef} action={actionHandler} className="flex flex-col gap-5">

                {/* --- 1. Input Judul */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="title" className="text-sm font-medium text-slate-700">Judul Tugas</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        defaultValue={initialData.title}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-brand-500/20"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* --- 2. Dropdown Status */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="status" className="text-sm font-medium text-slate-700">Status</label>
                        <select
                            id="status"
                            name="status"
                            required
                            defaultValue={initialData.status}
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20"
                        >
                            <option value="BELUM_MULAI">Belum Mulai</option>
                            <option value="DALAM_PENGERJAAN">Dalam Pengerjaan</option>
                            <option value="SELESAI">Selesai</option>
                        </select>
                    </div>

                    {/* --- 3. Dropdown Prioritas */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="priority" className="text-sm font-medium text-slate-700">Prioritas</label>
                        <select
                            id="priority"
                            name="priority"
                            required
                            defaultValue={initialData.priority}
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20"
                        >
                            <option value="Rendah">Rendah</option>
                            <option value="Menengah">Menengah</option>
                            <option value="Tinggi">Tinggi</option>
                        </select>
                    </div>
                </div>

                {/* --- 4. Input Kalender (Tenggat) */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="dueDate" className="text-sm font-medium text-slate-700">Tenggat Waktu</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        defaultValue={formattedDate}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-lg text-sm focus:ring-2 w-full md:w-1/2"
                    />
                </div>

                <hr className="my-2 border-slate-100" />

                {/* --- 5. Tombol Submit (Simpan) */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.push("/dashboard/all-tasks")}
                        className="px-5 py-2.5 text-sm font-medium text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50"
                    >
                        Batal
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg border border-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-sm"
                    >
                        {loading ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </form>
        </div>
    );
}
