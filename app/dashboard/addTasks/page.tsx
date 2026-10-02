"use client"
import { useRef, useState } from "react"
import { createTask } from "@/app/actions/taskActions"
import { useRouter } from "next/navigation"

export default function AddTasks() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function actionHandler(formData: FormData) {
        setLoading(true)
        setError("")

        try {
            await createTask(formData)

            router.push("/dashboard/all-tasks");
        } catch (err: any) {
            setError(err.message || "Terjadi Kesalahan!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl border border-slate-200 mt-6 shadow-sm">
            <h1 className="text-xl font-bold text-slate-800 mb-6">Buat Tugas Baru</h1>

            {error && (
                <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">
                    {error}
                </div>
            )}

            <form ref={formRef} action={actionHandler} className="flex flex-col gap-5">

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="title" className="text-sm font-medium text-slate-700">
                        Judul Tugas <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        placeholder="Contoh: Menyusun laporan keuangan bulanan..."
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="status" className="text-sm font-medium text-slate-700">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="status"
                            name="status"
                            required
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                        >

                            <option value="BELUM_MULAI">Belum Mulai</option>
                            <option value="DALAM_PENGERJAAN">Dalam Pengerjaan</option>
                            <option value="SELESAI">Selesai</option>
                        </select>
                    </div>


                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="priority" className="text-sm font-medium text-slate-700">
                            Tingkat Prioritas <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            required
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                        >
                            <option value="Rendah">Rendah</option>
                            <option value="Menengah">Menengah</option>
                            <option value="Tinggi">Tinggi</option>
                        </select>
                    </div>
                </div>


                <div className="flex flex-col gap-1.5">
                    <label htmlFor="dueDate" className="text-sm font-medium text-slate-700">
                        Tenggat Waktu <span className="text-slate-400 font-normal">(Opsional)</span>
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors w-full md:w-1/2"
                    />
                </div>


                <hr className="my-2 border-slate-100" />


                <div className="flex items-center justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => router.push("/dashboard/all-tasks")}
                        className="px-5 py-2.5 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-700 transition-colors"
                    >
                        Batal
                    </button>


                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? "Menyimpan..." : "Buat Tugas"}
                    </button>
                </div>



            </form>
        </div>
    )
}