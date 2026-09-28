"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo className={scrolled ? "text-[#5271E3]" : "text-white"} />

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm leading-6 transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-[#5271E3]"
                    : "text-white hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button href="/login" variant={scrolled ? "primary" : "outline"}>
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}
