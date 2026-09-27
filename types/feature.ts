import { LucideIcon } from "lucide-react";

export type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type FeatureSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description: string;
  feature: FeatureItem[];
  className?: string;
};
