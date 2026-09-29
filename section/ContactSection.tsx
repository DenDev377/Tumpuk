import { ContactSectionProps } from "@/types/contact";

export default function ContactSection({
  eyebrow,
  title,
  subtitle,
}: ContactSectionProps) {
  return (
    <section id="contact" className="bg-gray-50 py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
            {eyebrow}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-gray-900 mb-4 font-normal">
            {title}
          </h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-brand-500/5 p-8 sm:p-10">
          <form action="" className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Nama Anda
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                placeholder="Nama kamu"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email Anda
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                placeholder="email@kamu.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Pesan Anda
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none"
                placeholder="Tulis pesan kamu di sini..."
              />
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full px-10 py-3 text-sm font-medium transition-colors bg-brand-500 text-white hover:bg-brand-400"
              >
                Kirim Pesan
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
