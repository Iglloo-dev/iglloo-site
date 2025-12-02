// components/Navbar.tsx
"use client";

import { useState } from "react";

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
    <header
      id="top"
      className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 font-bold">
            Ig
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-[0.18em] text-amber-300 uppercase">
              Iglloo
            </div>
            <div className="text-xs text-slate-300">
              Exotic Living · Smart Retirement
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6 text-sm text-slate-200">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-amber-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/30 transition hover:bg-amber-300"
          >
            Book a Consultation
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="relative z-40 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <div className="space-y-1">
            <span className="block h-[2px] w-4 bg-slate-100"></span>
            <span className="block h-[2px] w-4 bg-slate-100"></span>
          </div>
        </button>

        {/* Mobile nav panel */}
        {open && (
          <div className="absolute inset-x-0 top-full border-b border-white/10 bg-slate-950/95 px-4 pb-4 pt-2 md:hidden">
            <ul className="flex flex-col gap-3 text-sm text-slate-100">
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
              className="mt-4 block rounded-full bg-amber-400 px-4 py-2 text-center text-sm font-semibold text-slate-950"
              onClick={() => setOpen(false)}
            >
              Book a Consultation
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
