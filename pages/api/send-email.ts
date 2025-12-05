// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// ---------------------------------
// Simple spam scoring (no OpenAI)
// ---------------------------------
function computeSpamScore(input: {
  name: string;
  email: string;
  message: string;
  country: string;
}): number {
  const text = `${input.name} ${input.email} ${input.country} ${input.message}`.toLowerCase();

  let score = 0;

  // Typical spammy patterns
  const spamWords = [
    "free money",
    "get rich",
    "crypto",
    "forex",
    "casino",
    "betting",
    "binary options",
    "viagra",
    "loan approval",
    "winner",
    "congratulations",
    "click here",
  ];

  for (const w of spamWords) {
    if (text.includes(w)) {
      score += 0.3;
    }
  }

  // Lots of URLs
  const urlMatches = text.match(/https?:\/\/|www\./g);
  if (urlMatches && urlMatches.length >= 2) score += 0.3;

  // ALL CAPS segments
  const capsMatches = text.match(/[A-Z]{6,}/g);
  if (capsMatches) score += 0.2;

  // Non-letter junk in name or country
  if (!/^[a-z\s]+$/i.test(input.name.trim())) score += 0.1;
  if (!/^[a-z\s]+$/i.test(input.country.trim())) score += 0.1;

  // Clamp between 0 and 1
  return Math.max(0, Math.min(1, score));
}

// ---------------------------------
// API handler
// ---------------------------------
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, phone, country, message, company } = req.body || {};

  // Honeypot: if bots filled the hidden "company" field, silently succeed
  if (typeof company === "string" && company.trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  // Basic validation
  if (!name || !email || !country || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  // Get visitor IP (behind Vercel / proxies)
  const forwarded = req.headers["x-forwarded-for"];
  const clientIp =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0]) ||
    req.socket.remoteAddress ||
    "unknown";

  // 1️⃣ Compute spam_score ALWAYS (no OpenAI, cheap)
  const spamScore = computeSpamScore({ name, email, message, country });
  console.log("Computed spamScore:", spamScore);

  // 2️⃣ Optional AI stuff (currently off in Vercel by AI_INSIGHTS_ENABLED=false)
  let aiInsight: string | null = null;
  let leadScore: number | null = null;
  let leadSegment: string | null = null;
  let visitorCountry: string | null = null;

  const AI_ENABLED =
    process.env.AI_INSIGHTS_ENABLED === "true" &&
    !!process.env.OPENAI_API_KEY;

  if (AI_ENABLED) {
    try {
      // 👉 you can re-enable OpenAI logic here later
      // For now, we'll just keep these null and avoid API calls
      console.log("AI is enabled, but OpenAI call is not implemented in this snippet.");
    } catch (err) {
      console.error("AI lead insight error:", err);
    }
  }

  // 3️⃣ Send to Mailtrap sandbox via SMTP
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT || 587),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    await transporter.sendMail({
      from: "Iglloo Website <no-reply@iglloo.online>",
      to: process.env.CONTACT_TO_EMAIL_SANDBOX ?? "contact@iglloo.online",
      subject: `New inquiry from ${name}`,
      html: `
        <h2>New inquiry from Iglloo website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Country considering:</strong> ${country}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log("Sandbox email delivered");
  } catch (err) {
    console.error("Sandbox email error:", err);
  }

  // 4️⃣ Optional Mailtrap API → Gmail forward
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
        html: `
          <h2>New inquiry from Iglloo website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Country considering:</strong> ${country}</p>
          <p><strong>Message:</strong><br>${message}</p>
        `,
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
      err.response?.data || err
    );
  }

  // 5️⃣ Store lead in Supabase (THIS is where spam_score goes)
  try {
    const { error } = await supabaseAdmin.from("leads").insert({
      name,
      email,
      phone,
      country,
      message,
      ai_insight: aiInsight,
      visitor_country: visitorCountry,
      ip_address: clientIp,
      spam_score: spamScore,          // 👈 always a number (0–1)
      lead_score: leadScore,
      lead_segment: leadSegment,
    });

    if (error) {
      console.error("Supabase insert error:", error);
    } else {
      console.log("Lead stored in Supabase with spam_score:", spamScore);
    }
  } catch (err) {
    console.error("Supabase insert exception:", err);
  }

  return res.status(200).json({ ok: true });
}
