// components/DestinationsSection.tsx
import Image from "next/image";

const destinations = [
  {
    name: "Thailand",
    blurb:
      "Renowned healthcare, tropical lifestyle, and retirement visa benefits.",
    image: "/images/destinations/thailand.jpg",
  },
  {
    name: "Vietnam",
    blurb:
      "Affordable coastal living, rich culture, and thriving expat communities.",
    image: "/images/destinations/vietnam.jpg",
  },
  {
    name: "Portugal",
    blurb:
      "Mild climate, EU healthcare access, and residence visa opportunities.",
    image: "/images/destinations/portugal.jpg",
  },
  {
    name: "Greece",
    blurb:
      "Historic charm, Mediterranean lifestyle, and cost-friendly luxury.",
    image: "/images/destinations/greece.jpg",
  },
  {
    name: "Panama",
    blurb:
      "Vibrant culture, stunning beaches, and appealing retiree programs.",
    image: "/images/destinations/panama.jpg",
  },
];

export default function DestinationsSection() {
  return (
    <section
      id="destinations"
      className="border-b border-slate-200 bg-emerald-50/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Countries Where We Operate
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Handpicked destinations for a better life abroad.
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 md:text-base">
            Every country we recommend balances cost of living, healthcare,
            safety, and lifestyle — so you can retire with confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {destinations.map((dest) => (
            <article
              key={dest.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  {dest.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-700">
                  {dest.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
