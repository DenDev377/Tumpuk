import type { ComponentProps } from "react";
import type Link from "next/link";

export type ButtonVariant = "primary" | "outline";

export type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href">;
