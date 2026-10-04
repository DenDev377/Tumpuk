import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tumpuk — Atur tugas tanpa ribet",
  description: "Catat tugas, unggah gambar, tandai prioritas. Semua di satu tempat.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      translate="no"
      className={`${jakartaSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900">
        <AuthProvider>
          <main className="flex-1 w-full h-full">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}