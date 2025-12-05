// components/Hero.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    image: "/images/hero/hero-1.jpg",
    alt: "Family enjoying retirement by the sea",
    headingLine1: "Retire Better,",
    headingLine2: "Live Longer",
    body: "Retire overseas with Iglloo—your partner in global retirement relocation—for a luxurious lifestyle, world-class healthcare, and greater financial freedom.",
  },
  {
    image: "/images/hero/hero-2.jpg",
    alt: "Family sitting together by the water",
    headingLine1: "Fulfilling Retirement",
    headingLine2: "Abroad",
    body: "To empower retirees to live longer, healthier, and more luxurious lives at a fraction of U.S. costs.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // change every 6 seconds
    return () => clearInterval(id);
  }, []);

  const current = heroSlides[index];

  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-white via-white to-emerald-50/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:flex-row md:items-center md:py-20 md:px-6">
        {/* Left content – text changes with slide */}
        <div className="flex-1 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Welcome to Iglloo
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {current.headingLine1}
            <br />
            <span className="text-emerald-600">
              {current.headingLine2}
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
            {current.body}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-300 transition hover:bg-emerald-600"
            >
              Book a Consultation
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 transition hover:border-emerald-500 hover:text-emerald-600"
            >
              See how it works
            </a>
          </div>

          <div className="flex flex-wrap gap-8 pt-4 text-xs text-slate-600">
            <div>
              <div className="font-semibold text-slate-900">
                Handpicked Destinations
              </div>
              <div>Thailand · Vietnam · Portugal · Greece · Panama</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">
                AI + Human Concierge
              </div>
              <div>Visa, insurance, housing & lifestyle setup handled.</div>
            </div>
          </div>
        </div>

        {/* Right – image slider */}
        <div className="flex-1">
          <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm md:h-96">
            {heroSlides.map((slide, i) => (
              <div
                key={slide.image}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  className="object-cover object-left"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
