export default function DashboardLoading() {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-8 max-w-7xl animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-slate-200 rounded-md w-48 mb-3"></div>
        <div className="h-4 bg-slate-100 rounded-md w-96"></div>
      </div>

      {/* Stats Cards Skeleton (Jika berada di dashboard utama) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 h-32 flex flex-col justify-between">
            <div className="h-4 bg-slate-100 rounded w-24"></div>
            <div className="h-8 bg-slate-200 rounded w-16 mt-4"></div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="h-6 bg-slate-200 rounded-md w-64"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-transparent">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/6"></div>
                <div className="h-6 bg-slate-100 rounded-full w-20"></div>
                <div className="h-4 bg-slate-100 rounded w-1/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
