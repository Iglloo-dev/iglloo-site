"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  // honeypot
  company: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

// A small country list for suggestions in the <datalist>.
// You can add/remove countries here as you like.
const COUNTRY_SUGGESTIONS = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  message: "",
  company: "", // honeypot
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // -----------------------------
  // helpers / validation
  // -----------------------------
  const validate = (state: FormState): FormErrors => {
    const newErrors: FormErrors = {};

    // Name: only letters/spaces, 2–80 chars
    if (!state.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (!/^[A-Za-z\s]{2,80}$/.test(state.name.trim())) {
      newErrors.name = "Use only letters and spaces (2–80 characters).";
    }

    // Email: simple pattern
    if (!state.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone: digits only, 8–15 digits (allow spaces/+ in UI, but strip first)
    if (state.phone.trim()) {
      const phoneDigits = state.phone.replace(/[^\d]/g, "");
      if (phoneDigits.length < 8 || phoneDigits.length > 15) {
        newErrors.phone = "Please enter a phone number with 8–15 digits.";
      }
    }

    // Country: at least 2 letters
    if (!state.country.trim()) {
      newErrors.country = "Please enter the country you're considering.";
    } else if (!/^[A-Za-z\s]{2,}$/.test(state.country.trim())) {
      newErrors.country =
        "Country should contain only letters and spaces.";
    }

    // Message: minimum length
    if (!state.message.trim()) {
      newErrors.message = "Please tell us a bit about your plans.";
    } else if (state.message.trim().length < 10) {
      newErrors.message =
        "Please add a little more detail (at least 10 characters).";
    }

    return newErrors;
  };

  const handleChange = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    // honeypot – if bots fill this, quietly pretend success
    if (form.company.trim()) {
      setForm(initialState);
      setSuccessMessage(
        "Thank you! We’ll be in touch shortly."
      );
      return;
    }

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          country: form.country.trim(),
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setForm(initialState);
      setSuccessMessage(
        "Thank you! Your details are with us and we’ll reach out soon."
      );
    } catch (err) {
      console.error(err);
      setSuccessMessage(
        "Something went wrong. Please try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <section
      id="contact"
      className="bg-emerald-50/80 py-16"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-emerald-500 uppercase mb-2">
            Contact Us
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-emerald-950">
            Let&apos;s plan your retirement abroad
          </h2>
          <p className="mt-2 text-sm sm:text-base text-emerald-700 max-w-2xl mx-auto">
            Share a few details and our team will reach out to
            discuss your plan, destinations and next steps.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur"
        >
          {/* honeypot */}
          <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label>
              Company
              <input
                type="text"
                name="company"
                autoComplete="off"
                value={form.company}
                onChange={(e) =>
                  handleChange("company", e.target.value)
                }
              />
            </label>
          </div>

          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="mb-1 block text-xs font-medium text-emerald-800">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                className="block w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-xs font-medium text-emerald-800">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
                className="block w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-xs font-medium text-emerald-800">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                className="block w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                placeholder="+1 647 239 1234"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="mb-1 block text-xs font-medium text-emerald-800">
                Country you&apos;re considering
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                list="country-list"
                value={form.country}
                onChange={(e) =>
                  handleChange("country", e.target.value)
                }
                className="block w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                placeholder="Start typing a country…"
              />
              <datalist id="country-list">
                {COUNTRY_SUGGESTIONS.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              {errors.country && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.country}
                </p>
              )}
            </div>

            {/* Message – full width */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium text-emerald-800">
                Message<span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) =>
                  handleChange("message", e.target.value)
                }
                className="block w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                placeholder="Tell us about your timeline, budget and preferred lifestyle…"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          {/* footer row: button + status message */}
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              {isSubmitting ? "Sending…" : "Submit & Book a Call"}
            </button>

            {successMessage && (
              <p className="text-xs sm:text-sm text-emerald-800">
                {successMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
