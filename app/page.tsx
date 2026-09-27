import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      {/* Hero section — gradient area (navbar transparan mewarisi warna ini) */}
      <section className="bg-linear-to-br from-[#5271E3] via-[#6865E5] to-[#745EEC] min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-4xl sm:text-5xl mb-6">
            Finally, a task manager that{" "}
            <span className="font-bold">works for you!</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            Tumpuk is a smart to-do list that intelligently divides up your task
            to only show you what you need to do today.
          </p>
        </div>
        <Button href="#" variant="primary">
          Get Started
        </Button>
      </section>

      {/* Section bawah — putih */}
      <section className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Fitur Section
          </h2>
          <p className="text-gray-600">Konten section bawah di sini.</p>
        </div>
      </section>
    </div>
  );
}
