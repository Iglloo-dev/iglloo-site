// components/SmartRetirementSection.tsx

export default function SmartRetirementSection() {
  return (
    <section
      id="services"
      className="border-b border-slate-800 bg-slate-900/80"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            Smart Retirement Starts Here
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            A guided, stress-free path to your life abroad.
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            Instead of juggling agents, forums and random blogs, Iglloo gives
            you one expert partner. We combine human advisors with intelligent
            tools to help you compare destinations, understand healthcare and
            build a relocation plan that fits your lifestyle and budget.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              01 · On-time scheduling
            </p>
            <h3 className="mt-3 text-sm font-semibold text-slate-50">
              Coordinated, not chaotic
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              We align your visa timelines, housing search, flights and
              insurance so you’re not stuck with gaps between approvals and
              move-in dates.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              02 · 24/7 Support
            </p>
            <h3 className="mt-3 text-sm font-semibold text-slate-50">
              Help before & after you land
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Questions about medicines, local areas, banks or hospitals?
              Iglloo support is available when you need it the most, not just
              during office hours.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              03 · No-pressure consultation
            </p>
            <h3 className="mt-3 text-sm font-semibold text-slate-50">
              Start with a clarity call
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              In your first session, we map your goals, health profile and
              budget, then show you 2–3 realistic destination options to
              consider.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
