import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo className="text-white" />

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm leading-6 text-white hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button href="/login" variant="outline">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}