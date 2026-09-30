"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email atau password salah");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10">
        <div className="mb-8">
          <h2 className="text-3xl text-gray-900 font-semibold">
            Selamat datang kembali
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Masuk untuk mengakses dashboard kamu
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@kamu.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                Lupa password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-full py-3 text-sm transition-colors"
          >
            Masuk
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-gray-900 hover:underline"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </main>
  );
}