import Image from "next/image";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="border-b border-emerald-100 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Our Services
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            End-to-end relocation support, so you can focus on living.
          </h2>
          <p className="text-sm md:text-base text-slate-700">
            From visas to housing, insurance to local orientation, Iglloo handles
            the details so your retirement abroad feels simple and safe.
          </p>
        </div>

        {/* 4 cards with images */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Visa & Immigration */}
          <article className="flex flex-col rounded-3xl bg-[#d3e0de] px-6 py-6 shadow-sm ring-1 ring-slate-200 md:px-8 md:py-8">
            <div className="mb-4">
              <Image
                src="/images/services/visa-immigration.jpg" // ⬅️ update to your real path
                alt="Visa icon"
                width={48}
                height={48}
              />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Visa &amp; Immigration
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-800">
              Retirement visas, residency, and compliance — we help you
              understand your options and move through the process with clarity.
            </p>
          </article>

          {/* Insurance */}
          <article className="flex flex-col rounded-3xl bg-[#d3e0de] px-6 py-6 shadow-sm ring-1 ring-slate-200 md:px-8 md:py-8">
            <div className="mb-4">
              <Image
                src="/images/services/insurance.jpg" // ⬅️ update
                alt="Insurance icon"
                width={48}
                height={48}
              />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Insurance
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-800">
              Health and life insurance tailored to expats — we connect you with
              vetted providers so you can protect your health and savings.
            </p>
          </article>

          {/* Lifestyle Setup */}
          <article className="flex flex-col rounded-3xl bg-[#d3e0de] px-6 py-6 shadow-sm ring-1 ring-slate-200 md:px-8 md:py-8">
            <div className="mb-4">
              <Image
                src="/images/services/lifestyle-setup.jpg" // ⬅️ update
                alt="Lifestyle setup icon"
                width={48}
                height={48}
              />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Lifestyle Setup
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-800">
              Banking, legal, cultural integration, and expat community access —
              everything you need to feel at home in your new country.
            </p>
          </article>

          {/* Property Assistance */}
          <article className="flex flex-col rounded-3xl bg-[#d3e0de] px-6 py-6 shadow-sm ring-1 ring-slate-200 md:px-8 md:py-8">
            <div className="mb-4">
              <Image
                src="/images/services/property-assistance.jpg" // ⬅️ update
                alt="Property assistance icon"
                width={48}
                height={48}
              />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Property Assistance
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-800">
              Buy or rent with confidence in your new home, with support on
              neighborhoods, pricing, and on-the-ground partners.
            </p>
          </article>
        </div>

        {/* $4,999 package strip (unchanged) */}
        <div className="mt-10 rounded-3xl bg-[#f3fff7] px-6 py-6 shadow-sm ring-1 ring-emerald-200 md:px-8 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Signature Iglloo Package
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            All-inclusive retirement relocation for{" "}
            <span className="text-emerald-700 text-2xl md:text-3xl font-bold">$4,999</span>
          </h3>
          <p className="mt-2 text-sm text-slate-700 max-w-2xl">
            A single transparent fee for complete{" "}
            <span className="font-semibold text-emerald-800">assistance</span> and{" "}
            <span className="font-semibold text-emerald-800">guidance</span>{" "}
            across every critical area of your move.
          </p>

          <ul className="mt-5 grid gap-2 text-sm text-slate-800 md:grid-cols-2">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>
                <strong className="text-emerald-800">Residency Permits & Visas</strong> — strategy, documentation & end-to-end assistance.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>
                <strong className="text-emerald-800">Relocation Assistance</strong> — destinations, neighborhoods & move planning.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>
                <strong className="text-emerald-800">Real Estate Assistance</strong> — renting, buying & local coordination.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>
                <strong className="text-emerald-800">Guidance on Health Insurance</strong> — choosing expat-friendly coverage.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>
                <strong className="text-emerald-800">Guidance on Banking Services</strong> — local accounts & everyday money management.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
