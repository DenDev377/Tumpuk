"use client";
import Card from "@/components/Card";

export default function Dashboard() {
  const stats = [
    {
      label: "Total Tugas",
      value: "12",
    },
    {
      label: "Selesai",
      value: "8",
    },
    {
      label: "Belum Selesai",
      value: "4",
    },
    {
      label: "Prioritas Tinggi",
      value: "2",
    },
  ];
  return (
    <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-700">
        Welcome to the Dashboard! Here you can manage your tasks, worklogs, and
        team overview.
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </div>
  );
}
