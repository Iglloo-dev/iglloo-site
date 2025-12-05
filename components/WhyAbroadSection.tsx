// components/WhyAbroadSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function WhyAbroadSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="why-abroad" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Why Abroad?
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Beyond the Savings:
          </h2>

          <p className="text-sm leading-relaxed text-slate-700 md:text-base">
            Lower costs, better healthcare, and a higher quality of life are
            making retirement abroad a serious option for U.S. retirees.
          </p>
        </div>

        {/* Benefit cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="flex flex-col rounded-2xl border border-slate-200 bg-emerald-50/70 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Lower healthcare costs
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              Lower healthcare costs without sacrificing quality.
            </p>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-200 bg-emerald-50/70 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Safe, welcoming communities
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              Safe, welcoming communities.
            </p>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-200 bg-emerald-50/70 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              More freedom, less stress
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              More freedom, less financial stress.
            </p>
          </article>
        </div>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full border border-emerald-500 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-500 hover:text-white"
          >
            View data &amp; charts
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl md:p-8">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100"
              aria-label="Close"
            >
              ✕
            </button>

            {/* CONTENT */}
            <div className="space-y-10">
              {/* Top: text + data points */}
              <div className="grid gap-8 md:grid-cols-2">
                {/* A Growing Movement */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    A Growing Movement
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    More than <strong>700,000 U.S. retirees</strong> now receive
                    Social Security benefits abroad — a number growing by{" "}
                    <strong>6% annually</strong>. Lower costs, quality
                    healthcare, and pro-retiree policies, especially in
                    Southeast Asia, are driving this shift.
                  </p>

                  <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Search Growth
                  </h4>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                    <div className="h-full w-4/5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600">
                    Increase in Google searches for &quot;retire abroad&quot;
                    and &quot;retirement visa&quot; (2020–2024)
                  </p>

                  <h4 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Market Opportunity
                  </h4>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                    <div className="h-full w-[70%] rounded-full bg-emerald-500" />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600">
                    Global retirement-abroad services market size (2025
                    estimate): <strong>$22B</strong>
                  </p>
                </div>

                {/* Top Destinations & percentage stats */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Top Destinations in Southeast Asia &amp; Beyond
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                    <li>
                      <strong>Thailand:</strong> Affordable living, rich
                      culture, modern healthcare
                    </li>
                    <li>
                      <strong>Vietnam:</strong> Emerging destination, low costs,
                      vibrant cities
                    </li>
                    <li>
                      <strong>Malaysia:</strong> MM2H program, modern
                      infrastructure
                    </li>
                    <li>
                      <strong>Portugal:</strong> Residence visa,
                      English-friendly, EU access
                    </li>
                    <li>
                      <strong>Costa Rica:</strong> Pensionado program, natural
                      beauty
                    </li>
                  </ul>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        value: "60%",
                        label:
                          "Cost-of-living reduction in Thailand vs. U.S. metros",
                      },
                      {
                        value: "55%",
                        label:
                          "Cost-of-living reduction in Vietnam vs. U.S. metros",
                      },
                      {
                        value: "70%",
                        label: "Healthcare cost savings in Southeast Asia",
                      },
                      {
                        value: "18%",
                        label:
                          "Americans interested in retiring abroad",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                          {item.value}
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-700">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: single Quality of Life Index chart */}
              <div className="mt-2">
                <div className="relative mx-auto h-[520px] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <Image
                    src="/images/why-abroad/quality-of-life-index.jpeg" // change to .jpeg if your file uses that extension
                    alt="Quality of Life Index chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Sources */}
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-[11px] text-slate-700">
                <span className="font-semibold">Sources: </span>
                Social Security Administration reports, International Living
                surveys, Global Retirement Index, Google Trends data, retirement
                market research.
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
