"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // clear error on change
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Please enter a message.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  setStatus("submitting");

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Something went wrong while sending.");
    }

    setStatus("success");
    setForm({
      name: "",
      email: "",
      phone: "",
      country: "",
      message: "",
    });
  } catch (err) {
    console.error("Error submitting contact form:", err);
    setStatus("error");
  } finally {
    // Reset status after a short delay so the message disappears
    setTimeout(() => setStatus("idle"), 2500);
  }
};


  return (
    <section id="contact" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Contact Us
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Let&apos;s plan your retirement abroad.
          </h2>
          <p className="text-sm md:text-base text-slate-700">
            Share a few details and our team will reach out to discuss your
            retirement plan, destinations and next steps.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-emerald-50/60 p-6 shadow-sm md:p-7">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none ring-0 ${
                      errors.name
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-300 focus:border-emerald-500"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none ring-0 ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-300 focus:border-emerald-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Country you&apos;re considering
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={form.country}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none ring-0 ${
                    errors.message
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-300 focus:border-emerald-500"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-300 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300"
                >
                  {status === "submitting"
                    ? "Sending..."
                    : "Submit & Book a Call"}
                </button>

                {status === "success" && (
                  <p className="text-xs text-emerald-700">
                    Thank you! Your message has been received. We&apos;ll get back
                    to you shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-xs text-red-600">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact info panel */}
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <h3 className="text-sm font-semibold text-slate-900">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📍</span>
                <span>Columbus, Ohio-43228</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📞</span>
                <span>+19174433355</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">✉</span>
                <span>info@iglloo.online</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">⏰</span>
                <span>Time: Available online (Weekdays)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
