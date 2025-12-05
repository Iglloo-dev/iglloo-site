// components/AboutSection.tsx

export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-b border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        {/* Heading + intro (centered like other sections) */}
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            About Us
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Smart Retirement Starts Here
          </h2>

          <p className="text-sm italic text-slate-700">
            "With our AI-enabled, decision-making tools and expert guidance,
            unlock a higher quality of life abroad."
          </p>

          <p className="text-sm leading-relaxed text-slate-700">
            At Iglloo, we believe retirement should be about freedom, comfort,
            and possibility — not financial stress. That&apos;s why we help U.S.
            citizens find their perfect new home in beautiful, peaceful, and
            affordable international communities.
          </p>

          <p className="text-sm leading-relaxed text-slate-700">
            Iglloo was founded with a simple idea: your hard-earned savings
            should go further. With rising costs in the U.S., many retirees feel
            limited in their options. We&apos;re here to change that with expert
            guidance that helps unlock a higher quality of life abroad.
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-emerald-50/70 px-5 py-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Time to time schedule
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              Flexible, planned support as you move from planning to relocation
              and beyond.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-emerald-50/70 px-5 py-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              24/7 Online Support
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              Always available online to answer your questions and guide your
              decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-emerald-50/70 px-5 py-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Free Consultation
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              Start with a no-obligation consultation to explore your options
              and next steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
