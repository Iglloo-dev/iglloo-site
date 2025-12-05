"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  // honeypot – real users never see / touch this
  company: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  message: "",
  company: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // --- Basic front-end validation ---
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message.");
      setStatus("error");
      return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (form.message.trim().length < 10) {
      setError("Please add a bit more detail to your message.");
      setStatus("error");
      return;
    }

    // --- Honeypot: if a bot fills this, silently pretend success ---
    if (form.company.trim().length > 0) {
      console.warn("Honeypot field triggered – likely bot submission.");
      setStatus("success");
      setForm(initialForm);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error("Contact form error:", err);
      setError(
        "Something went wrong while sending your message. Please try again."
      );
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" className="bg-emerald-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-emerald-900">
          Share a few details and our team will reach out to discuss your
          retirement plan, destinations and next steps.
        </h2>

        {/* Status messages */}
        <div className="mt-6 space-y-3">
          {status === "success" && (
            <p className="rounded-md bg-emerald-100 px-4 py-3 text-sm text-emerald-900">
              ✅ Thank you! We&apos;ve received your inquiry and will get back to
              you as soon as possible.
            </p>
          )}

          {status === "error" && error && (
            <p className="rounded-md bg-red-100 px-4 py-3 text-sm text-red-800">
              {error}
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl bg-white p-6 shadow-sm"
        >
          {/* Honeypot – hidden from real users */}
          <div className="hidden" aria-hidden="true">
            <label className="block text-sm font-medium text-gray-700">
              Company
              <input
                type="text"
                name="company"
                autoComplete="off"
                tabIndex={-1}
                value={form.company}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name *
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Your full name"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="+1 555 123 4567"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country you&apos;re considering
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Thailand, Vietnam, Portugal..."
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message *
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Tell us about your ideal retirement lifestyle, timeframe and any questions you have."
                required
              />
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Submit & Book a Call"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
