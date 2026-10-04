# 🎯 Tumpuk - Aplikasi Manajemen Tugas Kelas Enterprise

Tumpuk adalah aplikasi Web manajemen tata letak (*Task Management System*) tangguh namun estetik yang dibangun untuk pelacakan produktivitas pribadi. Aplikasi ini menyatukan antarmuka desain minimalis/brutalis premium, kinerja ultracepat (_Server Components_), dan keamanan pertahanan kokoh melalui arsitektur Next.js Modern.

## 🚀 Fitur Unggulan

- **🛡️ Autentikasi Solid**: Menggunakan `NextAuth.js`. Dilengkapi Middleware pelindung rute penuh untuk menjamin keamanan dari *Insecure Direct Object Reference (IDOR)*. Server hanya menyajikan data milik sang pengguna (*session-based query*).
- **🔎 Akselerator Pencarian (_Global Debounced Search_)**: Mesin pencari instan di Navigasi yang memangkas penggunaan CPU server lewat *debounce-timer 400ms* sebelum meluncur mulus (tanpa memuat ulang halaman) ke tabel hasil pelacakan dinamis.
- **⚡ Suspensi Asinkronus (Skeleton UI)**: Transisi antar menu (seperti Dashboard, Semua Tugas, dsb) dimuat setara sistem raksasa Tech berkat React Suspense/Native Next.js Skeletons. Tidak ada lagi layar abu membeku dan menjamin *Core Web Vitals* maksimal.
- **♿ Aksesibilitas Optimal (A11y & SEO)**: Skor Google Lighthouse 100/100 disokong oleh HTML Semantik sempurna, ARIA Labels di setiap ikon UI, tata kelola tipografi elegan (*Plus Jakarta Sans* dipadu dengan judul *Instrument Serif*), dan Metadata SEO dinamis.
- **📊 Mesin Agregat Otomatis**: Dasbor statistik data dimuat *Real-time* bukan lewat pemilahan pasif, melainkan menggunakan Kueri Kuantitatif Cerdas `Prisma.count()` yang melepaskan tegangan beban Memori (RAM).

## 🛠️ Stack Teknologi (Tech Stack)

- **Framework**: Next.js 15+ (App Router) / React 19
- **Database ORM**: Prisma Client (`prisma`, `@prisma/client`)
- **Database Engine**: Relational / MySQL
- **Styling**: Tailwind CSS V4
- **Auth**: NextAuth V4
- **Icons**: Lucide React
- **Language**: TypeScript Tertutup (*Strict Type-Safety*)

## 📦 Panduan Instalasi (Development)

Pastikan Anda memiliki [Node.js](https://nodejs.org/) yang terpasang di sistem.

1. **Unduh Repositori/Buka Proyek Tumpuk**
2. **Pasang Dependensi (*Packages*)**
   ```bash
   npm install
   ```

3. **Konfigurasi Lingkungan (*Environment Variables*)**
   Ganti atau modifikasi file `.env` di jalur teratas direktori, dengan format:
   ```env
   DATABASE_URL="mysql://[user]:[password]@[hostname]:[port]/[database]"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="[KODE_RAHASIA_BEBAS_ANDA]"
   ```

4. **Koneksi Database & Migrasi (Prisma)**
   Pastikan mesin database menyala, eksekusi kode ini untuk membentuk kerangka tabel:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Mulai Perjalanan Kode Anda!**
   Jalankan server aplikasi di mode pengembang:
   ```bash
   npm run dev
   ```
   Akses `http://localhost:3000` di peramban (browser) kesayangan Anda.

## 🤝 Kontributor
Dibuat dengan 🔥 oleh Dendi Dev & my MUMU.
