"use client";

import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  name: string;
  location: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "John & Linda M.",
    location: "Retired in Thailand",
    quote:
      "Iglloo made our dream retirement a reality. From visas to finding our new home, everything was handled seamlessly. We’re living comfortably in Chiang Mai at half the cost of what we spent in Florida!",
  },
  {
    name: "Robert H.",
    location: "Moved to Portugal",
    quote:
      "I was nervous about moving abroad, but Iglloo guided me through every step — healthcare, property, even local banking. Now, my wife and I enjoy ocean views and financial peace of mind.",
  },
  {
    name: "Sarah P.",
    location: "Retired in Vietnam",
    quote:
      "The Iglloo team made the transition incredibly smooth. I never imagined retiring overseas could be this easy. My budget stretches further, and the lifestyle is amazing.",
  },
  {
    name: "Michael D.",
    location: "Exploring Panama",
    quote:
      "Iglloo’s insight and support were invaluable. They helped me find a safe community, reliable insurance, and even introduced me to an expat group. Couldn’t be happier!",
  },
];

export default function TestimonialsSection() {
  // Build slides: each slide contains up to 2 testimonials
  const slides = useMemo(() => {
    const arr: Testimonial[][] = [];
    for (let i = 0; i < testimonials.length; i += 2) {
      arr.push(testimonials.slice(i, i + 2));
    }
    return arr;
  }, []);

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-scroll every 8 seconds
  useEffect(() => {
    const id = setInterval(next, 8000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  return (
    <section
      id="testimonials"
      className="border-b border-emerald-100 bg-[#f3fff7]" // soft mint, like Smart Retirement Plan
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center space-y-3 mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Testimonials
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Hear what our clients say about us.
          </h2>
        </div>

        {/* Card wrapper (white card similar to Smart Retirement Plan) */}
        <div className="rounded-3xl bg-white px-4 py-6 shadow-sm ring-1 ring-emerald-100 md:px-8 md:py-10">
          {/* Carousel controls + slides */}
          <div className="flex items-center gap-4">
            {/* Prev button (desktop) */}
            <button
              type="button"
              onClick={prev}
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
              aria-label="Previous testimonials"
            >
              ‹
            </button>

            {/* Slides viewport */}
            <div className="relative flex-1 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {slides.map((pair, slideIdx) => (
                  <div
                    key={slideIdx}
                    className="flex w-full flex-shrink-0 flex-col gap-6 md:grid md:grid-cols-2 md:gap-8"
                  >
                    {pair.map((t) => (
                      <article
                        key={t.name}
                        className="relative flex h-full flex-col justify-between rounded-3xl bg-[#d3e0de] px-6 py-6 md:px-8 md:py-8"
                      >
                        {/* Stars */}
                        <div className="mb-4 text-emerald-900 text-base">
                          <span>★ ★ ★ ★ ★</span>
                        </div>

                        {/* Quote icon */}
                        <div className="pointer-events-none absolute right-6 top-4 text-5xl font-bold text-[#c6e4f6]/90">
                          “
                        </div>

                        {/* Quote text */}
                        <p className="relative text-sm leading-relaxed text-slate-900">
                          {t.quote}
                        </p>

                        {/* Name */}
                        <div className="mt-6">
                          <p className="text-sm font-semibold text-slate-900">
                            {t.name}
                          </p>
                          <p className="text-xs text-slate-800">{t.location}</p>
                        </div>
                      </article>
                    ))}

                    {/* If odd number of testimonials, fill empty space to keep layout stable */}
                    {pair.length === 1 && (
                      <div className="hidden md:block" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Next button (desktop) */}
            <button
              type="button"
              onClick={next}
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
              aria-label="Next testimonials"
            >
              ›
            </button>
          </div>

          {/* Mobile arrows below */}
          <div className="mt-6 flex justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
              aria-label="Previous testimonials"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
              aria-label="Next testimonials"
            >
              ›
            </button>
          </div>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-emerald-500"
                    : "w-2 bg-emerald-200 hover:bg-emerald-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
