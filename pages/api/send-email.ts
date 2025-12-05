import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type LeadInsights = {
  summary: string;
  urgency: "low" | "medium" | "high";
  service_fit: "poor" | "ok" | "strong";
  destinations: string[];
  next_action: string;
  tags: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, phone, country, message, company } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    country?: string;
    message?: string;
    company?: string; // honeypot
  };

  // Honeypot – if this is filled, it's almost certainly a bot.
  if (company && company.trim().length > 0) {
    console.warn("Honeypot triggered – ignoring submission.");
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ ok: false, error: "Missing required fields." });
  }

  // Small extra validation on backend
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(email)) {
    return res
      .status(400)
      .json({ ok: false, error: "Invalid email address format." });
  }

  // --- Base HTML used for both sandbox + Gmail ---
  const buildHtml = (insightsHtml?: string) => `
    <h2>New inquiry from Iglloo website</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "N/A"}</p>
    <p><strong>Country considering:</strong> ${country || "N/A"}</p>
    <p><strong>Message:</strong><br>${message}</p>
    ${insightsHtml ?? ""}
  `;

  // Placeholder – we fill this after AI step (if available)
  let insights: LeadInsights | null = null;
  let insightsHtml = "";

  // -----------------------------
  // 🤖 1) Ask OpenAI for lead insights
  // -----------------------------
  if (process.env.OPENAI_API_KEY) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "You are a sales assistant for Iglloo, a service helping North American retirees relocate to countries like Thailand and Vietnam. Analyse each inquiry and output a compact JSON object.",
          },
          {
            role: "user",
            content: `
Raw lead details:
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Country considering: ${country || "N/A"}
Message: ${message}

Return ONLY valid JSON with the following keys:
- summary: short 1-2 sentence summary of what this person wants.
- urgency: one of "low", "medium", "high".
- service_fit: one of "poor", "ok", "strong".
- destinations: array of destination names you can infer (can be empty).
- next_action: one concrete follow-up suggestion for Karan.
- tags: array of 3-6 short tags (e.g. ["thailand", "healthcare-focused", "2026-timeline"]).
          `,
          },
        ],
      });

      const raw = completion.choices[0].message.content ?? "{}";
      try {
        insights = JSON.parse(raw) as LeadInsights;

        insightsHtml = `
          <hr />
          <h3>AI Lead Insights</h3>
          <p><strong>Summary:</strong> ${insights.summary}</p>
          <p><strong>Urgency:</strong> ${insights.urgency}</p>
          <p><strong>Service fit:</strong> ${insights.service_fit}</p>
          <p><strong>Destinations:</strong> ${
            insights.destinations?.join(", ") || "N/A"
          }</p>
          <p><strong>Suggested next action:</strong> ${
            insights.next_action
          }</p>
          <p><strong>Tags:</strong> ${insights.tags?.join(", ")}</p>
        `;
      } catch (jsonErr) {
        console.error("Failed to parse AI JSON:", jsonErr);
      }
    } catch (err) {
      console.error("AI lead insight error:", err);
    }
  } else {
    console.warn("OPENAI_API_KEY not set – skipping AI lead insights.");
  }

  const htmlBody = buildHtml(insightsHtml);

  // -----------------------------
  // 2) SEND TO MAILTRAP SANDBOX (nodemailer)
  // -----------------------------
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const sandboxEmail = {
    from: "Iglloo Website <no-reply@iglloo.online>",
    to: process.env.CONTACT_TO_EMAIL_SANDBOX ?? "contact@iglloo.online",
    subject: `New inquiry from ${name}`,
    html: htmlBody,
  };

  try {
    await transporter.sendMail(sandboxEmail);
    console.log("Sandbox email delivered");
  } catch (err) {
    console.error("Sandbox email error:", err);
    // We continue, so Gmail forward still has a chance.
  }

  // -----------------------------
  // 3) ALSO FORWARD TO GMAIL VIA MAILTRAP API
  // -----------------------------
  try {
    await axios.post(
      "https://send.api.mailtrap.io/api/send",
      {
        from: {
          email: "no-reply@iglloo.online",
          name: "Iglloo Website",
        },
        to: [
          {
            email: process.env.CONTACT_TO_EMAIL,
          },
        ],
        subject: `New inquiry from ${name}`,
        html: htmlBody,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Forwarded to Gmail successfully");
  } catch (err: any) {
    console.error(
      "Mailtrap API Gmail forward error:",
      err?.response?.data || err
    );
  }

  // (Optional) log AI insights for now – later we can store in DB / sheets
  if (insights) {
    console.log("AI lead insights:", insights);
  }

  return res.status(200).json({ ok: true });
}
