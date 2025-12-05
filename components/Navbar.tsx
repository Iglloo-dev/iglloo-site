// components/Navbar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Destinations", href: "#destinations" },
  { label: "Services", href: "#services" },
  { label: "Why Abroad?", href: "#why-abroad" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30">
      {/* Main bar */}
      <div className="border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1 md:px-6 md:py-2">
          {/* Logo only */}
          <div className="relative h-14 w-40">
            <Image
              src="/images/brand/iglloo-logo.png"
              alt="Iglloo logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-6 text-sm text-slate-700">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-emerald-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-300 transition hover:bg-emerald-600"
            >
              Book a Consultation
            </a>
          </div>

          {/* Mobile button */}
          <button
            className="relative z-40 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <div className="space-y-1">
              <span className="block h-[2px] w-4 bg-slate-800"></span>
              <span className="block h-[2px] w-4 bg-slate-800"></span>
            </div>
          </button>

          {/* Mobile menu */}
          {open && (
            <div className="absolute inset-x-0 top-full border-b border-slate-200 bg-white/95 px-4 pb-4 pt-2 md:hidden">
              <ul className="flex flex-col gap-3 text-sm text-slate-800">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block py-1"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-4 block rounded-full bg-emerald-500 px-4 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Book a Consultation
              </a>
            </div>
          )}
        </nav>
      </div>

      {/* Soft fade under header */}
      <div className="pointer-events-none h-4 bg-gradient-to-b from-slate-200/40 to-transparent" />
    </header>
  );
}
