"use client";

export default function Register() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10">
        <div className="mb-8">
          <h2 className=" text-3xl text-gray-900 font-semibold">
            Selamat datang
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Daftar untuk mengakses dashboard kamu
          </p>
        </div>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nama lengkap Anda"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@kamu.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-full py-3 text-sm transition-colors"
          >
            Daftar
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <a
            href="/auth/login"
            className="font-medium text-gray-900 hover:underline"
          >
            Masuk di sini
          </a>
        </p>
      </div>
    </main>
  );
}
