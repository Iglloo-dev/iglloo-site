// components/HowItWorksSection.tsx

export default function HowItWorksSection() {
  const steps = [
    {
      step: "Step 01",
      title: "Consultation",
      lines: [
        "Understanding the customer's background, needs, and lifestyle requirements.",
      ],
      icon: "👥",
    },
    {
      step: "Step 02",
      title: "Planning",
      lines: [
        "Analyzing the best locations and various visa options with the help of AI and technology.",
        "Renting or buying decisions.",
      ],
      icon: "🧭",
    },
    {
      step: "Step 03",
      title: "Relocation",
      lines: [
        "Finalizing the destination, picking up a residency visa.",
        "Finalizing your accommodation.",
      ],
      icon: "✈️",
    },
    {
      step: "Step 04",
      title: "Lifestyle Setup",
      lines: [
        "Banking needs.",
        "Health insurance.",
      ],
      icon: "🏡",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="border-b border-slate-200 bg-gradient-to-b from-[#15584f] via-[#15584f] to-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center text-white space-y-3 mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
            Retirement Journey
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Your retirement journey with Iglloo, step by step.
          </h2>
          <p className="text-sm md:text-base text-emerald-50/90">
            From first conversation to everyday life abroad, we guide you through
            each stage with a clear, structured plan.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* subtle dotted map-like background bar */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 bg-emerald-900/20 blur-3xl" />

          <div className="relative grid gap-6 md:grid-cols-4">
            {steps.map((step, idx) => (
              <div
                key={step.step}
                className="group flex flex-col rounded-3xl bg-[#d3e0de]/95 px-6 py-7 shadow-sm ring-1 ring-emerald-900/10 transition transform hover:-translate-y-1 hover:shadow-md"
              >
                {/* Icon + step pill */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-xl">
                    <span aria-hidden>{step.icon}</span>
                  </div>
                  <span className="rounded-full bg-slate-900 text-xs font-semibold uppercase tracking-[0.18em] text-white px-3 py-1">
                    {step.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>

                {/* Description list */}
                <ul className="space-y-1 text-xs leading-relaxed text-slate-800">
                  {step.lines.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-[3px] h-1.5 w-1.5 flex-none rounded-full bg-emerald-600" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                {/* Progress connector for desktop */}
                {idx < steps.length - 1 && (
                  <div className="mt-4 hidden h-px w-full bg-gradient-to-r from-emerald-700/60 to-transparent md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
