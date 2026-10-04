"use client";
import React from "react"
import { AlertCircle, Clock, CheckCircle2, Edit, Trash2, Plus } from "lucide-react";
import { TaskProps } from "@/types/tasks";
import { Priority, Status } from "@prisma/client";
import { deleteTask } from "@/app/actions/taskActions";
import { useState } from "react";
import Link from "next/link";

const priorityStyles: Record<Priority, string> = {
    Tinggi: "bg-red-50 text-red-700 border-red-200",
    Menengah: "bg-amber-50 text-amber-700 border-amber-200",
    Rendah: "bg-slate-50 text-slate-700 border-slate-200",
};

const statusIcons: Record<Status, React.ReactNode> = {
    SELESAI: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    DALAM_PENGERJAAN: <Clock className="w-4 h-4 text-amber-500" />,
    BELUM_MULAI: <AlertCircle className="w-4 h-4 text-slate-400" />,
};
const formatStatusText = (status: Status) => { return status.replace("_", " "); }

export default function AllTasksTable({ dataTasks }: TaskProps) {
    const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

    async function handleDeleteClick(id: string) {
        const isConfirmed = window.confirm("Apakah anda yakin ingin menghapus tugas ini ?")
        if (!isConfirmed) return

        setIsDeletingId(id)

        try {
            await deleteTask(id)
        } catch (error) {
            alert("Gagal menghapus tugas. Silahkan coba lagi.")
        } finally {
            setIsDeletingId(null)
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Semua Tugas Anda</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Kelola segala jenis tugas dari berbagai tingkat prioritas di sini.
                    </p>
                </div>
                <div>
                    <a className="inline-flex items-center gap-1.5 bg-slate-900 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-brand-400 transition-colors" href="/dashboard/addTasks">
                        <Plus className="w-4 h-4" />
                        Tambah Tugas
                    </a>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-sm font-medium text-slate-500">
                            <th className="px-6 py-4 font-medium">Nama Tugas</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Prioritas</th>
                            <th className="px-6 py-4 font-medium">Tenggat Waktu</th>
                            <th className="px-6 py-4 font-medium text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {dataTasks.map((task) => (
                            <tr key={task.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900 group-hover:text-brand-600 transition-colors">
                                        {task.title}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600 capitalize">
                                        {statusIcons[task.status]}
                                        {formatStatusText(task.status)}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${priorityStyles[task.priority]}`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-600 font-medium">
                                        {task.dueDate
                                            ? task.dueDate.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })
                                            : "-"}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/dashboard/editTasks/${task.id}`}
                                            aria-label={`Edit tugas ${task.title}`}
                                            className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors inline-block"
                                            title="Edit Tugas"
                                        >
                                            <Edit aria-hidden="true" className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClick(task.id)}
                                            disabled={isDeletingId === task.id}
                                            aria-label={`Hapus tugas ${task.title}`}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                            title="Hapus Tugas"
                                        >
                                            {/* Trik ganti ikon kalau loading */}
                                            {isDeletingId === task.id ? <Clock aria-hidden="true" className="w-4 h-4 animate-spin" /> : <Trash2 aria-hidden="true" className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {dataTasks.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                                    Tidak ada data tugas yang ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}