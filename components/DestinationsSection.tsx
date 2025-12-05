// components/DestinationsSection.tsx
import Image from "next/image";

const destinations = [
  {
    id: "thailand",
    name: "Thailand",
    blurb:
      "Renowned healthcare, tropical lifestyle, and retirement visa benefits.",
    image: "/images/destinations/thailand.jpg",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    blurb:
      "Affordable coastal living, rich culture, and thriving expat communities.",
    image: "/images/destinations/vietnam.jpg",
  },
  {
    id: "portugal",
    name: "Portugal",
    blurb:
      "Mild climate, EU healthcare access, and residence visa opportunities.",
    image: "/images/destinations/portugal.jpg",
  },
  {
    id: "greece",
    name: "Greece",
    blurb:
      "Historic charm, Mediterranean lifestyle, and cost-friendly luxury.",
    image: "/images/destinations/greece.jpg",
  },
  {
    id: "panama",
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
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
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

        {/* Destination Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {destinations.map((dest, index) => (
            <article
              key={dest.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-44 w-full md:h-52">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  priority={index === 0}
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
