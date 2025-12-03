import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#e9f6f1]">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand / About */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Iglloo</h3>
            <p className="text-sm text-slate-700">
              Exotic living, smart retirement. We help U.S. citizens explore and
              relocate to high-value destinations abroad with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <Link href="/#about" className="hover:text-emerald-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-emerald-700">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-emerald-700">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#why-abroad" className="hover:text-emerald-700">
                  Why Abroad?
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-emerald-700">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              Destinations
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <Link href="/#destinations" className="hover:text-emerald-700">
                  Thailand
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="hover:text-emerald-700">
                  Vietnam
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="hover:text-emerald-700">
                  Portugal
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="hover:text-emerald-700">
                  Greece
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="hover:text-emerald-700">
                  Panama
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Columbus, Ohio-43228</li>
              <li>+19174433355</li>
              <li>info@iglloo.online</li>
              <li>Time: Available online (Weekdays)</li>
            </ul>

            {/* Social icons */}
            <div className="mt-4 flex gap-3">
              <Link
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.09 6.75A1.84 1.84 0 1 1 4.25 4.9a1.84 1.84 0 0 1 1.84 1.85ZM4.38 8.58h3.4v10.5h-3.4Zm5.37 8.26V8.58h3.26v1.44h.05a3.57 3.57 0 0 1 3.21-1.77c3.43 0 4.07 2.26 4.07 5.19v5.64h-3.4v-5c0-1.19 0-2.72-1.66-2.72s-1.91 1.29-1.91 2.63v5.09Z"
                  />
                </svg>
              </Link>

              <Link
                href="#"
                aria-label="X"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M18.9 4.5h-3.1L12 9.1 8.6 4.5H3.8l5.7 7.7-5.9 7.3h3.1l4.1-5.4 4.5 5.4h4.8l-6.1-8.1z"
                  />
                </svg>
              </Link>

              <Link
                href="#"
                aria-label="YouTube"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2C2 9 2 12 2 12s0 3 .4 4.8a2.6 2.6 0 0 0 1.8 1.8C6 19 12 19 12 19s6 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15 22 12 22 12s0-3-.4-4.8ZM10.5 15.3V8.7L15.3 12Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Iglloo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
