import { ContactSectionProps } from "@/types/contact";

export default function ContactSection({
  eyebrow,
  title,
  subtitle,
}: ContactSectionProps) {
  return (
    <section className="bg-[#5271E3] py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-lg font-medium text-white uppercase tracking-wider mb-3">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-shadow-gray-100 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-50 max-w-2xl mx-auto">{subtitle} </p>
        </div>
      </div>
    </section>
  );
}
