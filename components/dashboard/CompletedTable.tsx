"use client"
import { CompletedProps } from "@/types/tasks"
import { Priority, Status } from "@prisma/client"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"


//Helper style badge dan status
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

export default function CompletedTable({ dataTasks }: CompletedProps) {

    return (
        <div className="bg-white rounded-2xl shadow-sm mt-6 overflow-hidden border border-slate-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Tugas Selesai</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Tugas yang telah selesai.
                    </p>
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
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {dataTasks.map((task) => (
                            <tr
                                key={task.id}
                                className="hover:bg-slate-50/80 transition-colors group"
                            >
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900 group-hover:text-brand-600 transition-colors">
                                        {task.title}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">

                                        {statusIcons[task.status]}

                                        <span className="capitalize">{formatStatusText(task.status).toLowerCase()}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${priorityStyles[task.priority]}`}>
                                        {task.priority}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-600 font-medium">
                                        {task.dueDate ? task.dueDate.toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        }) : "-"}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {dataTasks.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-slate-500">
                                    Tidak ada tugas prioritas tinggi atau menengah saat ini. 🎉
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )

}