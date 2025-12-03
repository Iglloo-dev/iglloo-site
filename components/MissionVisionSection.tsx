// components/MissionVisionSection.tsx

export default function MissionVisionSection() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        {/* Section label + heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Our Philosophy
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            The mission and vision behind Iglloo.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission */}
          <div className="relative">
            {/* soft colored strip under card */}
            <div className="pointer-events-none absolute inset-x-6 bottom-0 h-4 rounded-3xl bg-amber-100" />

            <div className="relative rounded-3xl bg-white px-7 py-8 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start gap-5">
                {/* Icon circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 ring-2 ring-emerald-200">
                  {/* simple concentric circles icon */}
                  <span className="inline-block h-6 w-6 rounded-full border-2 border-emerald-700">
                    <span className="mt-1 ml-1 inline-block h-3 w-3 rounded-full border border-emerald-500" />
                  </span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Our Mission
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    Our mission is to harness advanced AI technologies to create
                    intelligent, efficient, and scalable solutions that transform
                    businesses and improve everyday life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="relative">
            {/* soft colored strip under card */}
            <div className="pointer-events-none absolute inset-x-6 bottom-0 h-4 rounded-3xl bg-sky-100" />

            <div className="relative rounded-3xl bg-white px-7 py-8 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start gap-5">
                {/* Icon circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 ring-2 ring-emerald-200">
                  {/* stylized eye icon */}
                  <div className="relative h-6 w-6">
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-700" />
                    <div className="absolute inset-1 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-emerald-700" />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Our Vision
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    To redefine retirement by creating a world where every U.S.
                    retiree can enjoy financial freedom, world-class healthcare,
                    and a vibrant lifestyle abroad — turning savings into a life
                    of comfort, security, and possibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
