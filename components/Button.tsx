import Link from "next/link";
import type { ButtonProps, ButtonVariant } from "@/types/button";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-white text-[#5271E3] hover:bg-white/90",
  outline: "border border-white text-white hover:bg-white/10",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-8 py-2 text-sm font-medium transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}