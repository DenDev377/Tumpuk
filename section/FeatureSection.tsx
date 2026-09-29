import type { FeatureSectionProps } from "@/types/feature";
import FeatureCard from "../components/FeatureCard";

export default function FeatureSection({
  eyebrow,
  title,
  subtitle,
  feature,
  description,
  className = "",
}: FeatureSectionProps) {
  return (
    <section id="features" className={`bg-gray-50 py-24 px-4 ${className}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          {eyebrow && (
            <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
              {eyebrow}
            </span>
          )}
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feature.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
