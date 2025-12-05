// components/SmartRetirementSection.tsx

export default function SmartRetirementSection() {
  return (
    <section
      id="smart-retirement"
      className="bg-emerald-50/60 border-b border-slate-200"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white/90 shadow-sm shadow-emerald-100 border border-emerald-100/70 px-6 py-8 md:px-10 md:py-10">
          {/* Label */}
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Smart Retirement Plan
          </p>

          <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)] md:items-start">
            {/* Left – quote & explainer */}
            <div className="space-y-4">
              <p className="text-xl font-semibold leading-snug text-slate-900 md:text-2xl">
                “We moved from Toronto to Chiang Mai and cut our monthly costs
                by 40%.”
              </p>
              <p className="text-xs font-medium text-slate-500">
                — Iglloo client · 63
              </p>
              <p className="text-sm leading-relaxed text-slate-700">
                Every Iglloo plan is built around your health, lifestyle, and
                financial goals. We combine on-the-ground research with expert
                guidance so your retirement abroad feels predictable, safe, and
                tailored to you.
              </p>
            </div>

            {/* Right – stats cards */}
            <div className="space-y-4">
              {/* Cost of living */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Cost of Living
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-emerald-600">
                    -35%
                  </span>
                  <span className="text-xs text-slate-600">
                    Typical savings vs. major North American cities.
                  </span>
                </div>
              </div>

              {/* Healthcare access */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Healthcare Access
                </div>
                <div className="mt-2 text-sm font-semibold text-emerald-700">
                  Private &amp; public options
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  We guide you through insurance choices and trusted local
                  providers in your new country.
                </p>
              </div>

              {/* What we handle */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-5 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  What we handle
                </div>
                <p className="mt-2 text-xs leading-relaxed text-emerald-900">
                  Visa &amp; immigration · Insurance · Property search · Banking
                  · Local orientation &amp; more — so you can focus on living,
                  not logistics.
                </p>
              </div>
            </div>
          </div>

          {/* Fine-print line */}
          <p className="mt-6 text-[11px] text-slate-500">
            *Illustrative snapshot. Every plan is tailored to your health,
            family, and financial profile.
          </p>
        </div>
      </div>
    </section>
  );
}
