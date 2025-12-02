// components/Hero.tsx

export default function Hero() {
  return (
    <section className="border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:flex-row md:items-center md:py-24 md:px-6">
        {/* Left content */}
        <div className="flex-1 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            Welcome to Iglloo
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
            Retire Better.
            <br />
            <span className="text-amber-300">Live Longer.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            Iglloo is your end-to-end concierge for retiring abroad. We help
            North American retirees and families relocate to carefully selected
            destinations with lower cost of living, better lifestyle, and
            smoother healthcare access.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/40 transition hover:bg-amber-300"
            >
              Book a Consultation
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-slate-100 transition hover:border-amber-300 hover:text-amber-300"
            >
              See how it works
            </a>
          </div>

          <div className="flex flex-wrap gap-8 pt-4 text-xs text-slate-400">
            <div>
              <div className="font-semibold text-slate-100">
                Handpicked Destinations
              </div>
              <div>Thailand · Vietnam · Portugal · Greece · Panama</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">
                AI + Human Concierge
              </div>
              <div>Visa, insurance, housing & lifestyle setup handled.</div>
            </div>
          </div>
        </div>

        {/* Right image / visual */}
        <div className="flex-1">
          <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-amber-400/20 via-sky-400/10 to-emerald-400/20 p-[1px] md:h-96">
            <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-slate-950/90 p-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Smart Retirement Plan
                </p>
                <p className="text-lg font-semibold text-slate-50">
                  “We moved from Toronto to Chiang Mai and cut our monthly
                  costs by 40%.”
                </p>
                <p className="text-xs text-slate-400">— Iglloo client · 63</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-slate-300">Cost of Living</p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-300">
                    -35%
                  </p>
                  <p className="mt-1 text-slate-400">
                    Typical savings vs. major North American cities.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-slate-300">Healthcare Access</p>
                  <p className="mt-1 text-sm font-semibold text-amber-300">
                    Private & public options
                  </p>
                  <p className="mt-1 text-slate-400">
                    We guide you through insurance and local providers.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-3 col-span-2">
                  <p className="text-slate-300">What we handle</p>
                  <p className="mt-1 text-slate-400">
                    Visa & immigration · Insurance · Property search ·
                    banking · local orientation & more.
                  </p>
                </div>
              </div>
              <p className="mt-2 text-[10px] text-slate-500">
                *Illustrative snapshot. Every plan is tailored to your health,
                family and financial profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
