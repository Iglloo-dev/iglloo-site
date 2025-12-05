"use client";

import { useState } from "react";

const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;
const COUNTRY_REGEX = /^[A-Za-z\s]{2,40}$/;

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    honey: "", // HONEYPOT FIELD
  });

  const [errors, setErrors] = useState<any>({});
  const [status, setStatus] = useState("");

  const validate = () => {
    let newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.email.trim() || !form.email.includes("@")) {
      newErrors.email = "Valid email is required.";
    }

    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number (digits only, 7–20 characters).";
    }

    // Country validation
    if (!form.country.trim()) {
      newErrors.country = "Country is required.";
    } else if (!COUNTRY_REGEX.test(form.country.trim())) {
      newErrors.country = "Country must contain only letters and spaces.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    }

    // HONEYPOT should remain empty
    if (form.honey.trim() !== "") {
      return { valid: false, newErrors };
    }

    setErrors(newErrors);

    return { valid: Object.keys(newErrors).length === 0 };
  };

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("");

    const check = validate();
    if (!check.valid) {
      setStatus("Please fix errors.");
      return;
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.spam) {
        setStatus("Blocked as spam.");
        return;
      }

      if (res.ok) {
        setStatus("Thank you! We'll reach out shortly.");
        setForm({
          name: "",
          email: "",
          phone: "",
          country: "",
          message: "",
          honey: "",
        });
      } else {
        setStatus("Error sending message. Try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error.");
    }
  };

  return (
    <section id="contact" className="py-16 bg-[#F3FFFA]">
      <div className="container mx-auto px-6 max-w-3xl">

        <h2 className="text-3xl font-bold mb-6">Submit & Book a Call</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* HONEYPOT FIELD (hidden) */}
          <input
            type="text"
            name="honey"
            value={form.honey}
            onChange={handleChange}
            className="hidden"
          />

          <div>
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone *"
              value={form.phone}
              onChange={handleChange}
              pattern="[0-9+\-\s()]{7,20}"
              inputMode="tel"
              className="w-full p-3 border rounded"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="text"
              name="country"
              placeholder="Country you're considering *"
              value={form.country}
              onChange={handleChange}
              pattern="[A-Za-z\s]{2,40}"
              className="w-full p-3 border rounded"
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Message *"
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 border rounded h-32"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Submit & Book a Call
          </button>

          {status && <p className="pt-2 text-lg">{status}</p>}
        </form>
      </div>
    </section>
  );
}
