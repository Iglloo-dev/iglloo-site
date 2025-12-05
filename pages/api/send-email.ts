// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// If you later re-enable AI, you can wire this back:
// import OpenAI from "openai";
// const openai =
//   process.env.AI_INSIGHTS_ENABLED === "true" && process.env.OPENAI_API_KEY
//     ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
//     : null;

/**
 * Extract client IP from Vercel / Node request.
 */
function extractClientIp(req: NextApiRequest): string | null {
  const xff = req.headers["x-forwarded-for"];

  const raw =
    (Array.isArray(xff) ? xff[0] : xff?.split(",")[0]) ??
    req.socket.remoteAddress ??
    null;

  if (!raw) return null;

  // Handle IPv6-mapped IPv4 like ::ffff:1.2.3.4
  return raw.replace("::ffff:", "").trim();
}

/**
 * Very small private-IP check.
 */
function isPrivateIp(ip: string): boolean {
  if (ip === "127.0.0.1" || ip === "::1") return true;
  if (ip.startsWith("10.")) return true;
  if (ip.startsWith("192.168.")) return true;

  // 172.16.0.0 – 172.31.255.255
  const match172 = /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip);
  if (match172) return true;

  return false;
}

/**
 * Lookup country name from IP using a public Geo-IP API.
 * You can swap provider later if you want.
 */
async function lookupCountryFromIp(ip: string): Promise<string | null> {
  try {
    // Simple public endpoint (no API key for small usage).
    // If you ever hit limits, switch to a paid key-based service.
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      // Don’t let this slow the whole request forever
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = (await res.json()) as {
      country_name?: string;
      country?: string;
    };

    return data.country_name || data.country || null;
  } catch (err) {
    console.error("GeoIP lookup failed:", err);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, phone, country, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ ok: false, error: "Missing required fields" });
  }

  // -----------------------------
  // 1️⃣ SEND TO MAILTRAP SANDBOX
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
    html: `
      <h2>New inquiry from Iglloo website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Country considering:</strong> ${country || "N/A"}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(sandboxEmail);
    console.log("Sandbox email delivered");
  } catch (err) {
    console.error("Sandbox email error:", err);
  }

  // ---------------------------------------------
  // 2️⃣ ALSO FORWARD TO GMAIL VIA MAILTRAP API
  // ---------------------------------------------
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
          <p><strong>Country considering:</strong> ${country || "N/A"}</p>
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
      err?.response?.data || err
    );
  }

  // ---------------------------------------------
  // 3️⃣ GEO-IP LOOKUP → visitor_country
  // ---------------------------------------------
  const clientIp = extractClientIp(req);
  let visitorCountry: string | null = null;

  if (clientIp && !isPrivateIp(clientIp)) {
    visitorCountry = await lookupCountryFromIp(clientIp);
  }

  // ---------------------------------------------
  // 4️⃣ (OPTIONAL) AI INSIGHTS – currently disabled
  // ---------------------------------------------
  let aiInsight: string | null = null;
  let spamScore: number | null = null;
  let leadScore: number | null = null;
  let leadSegment: string | null = null;

  // If you later enable AI, you can plug that logic here and fill
  // aiInsight, spamScore, leadScore, leadSegment.

  // ---------------------------------------------
  // 5️⃣ STORE LEAD IN SUPABASE
  // ---------------------------------------------
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
      spam_score: spamScore,
      lead_score: leadScore,
      lead_segment: leadSegment,
    });

    if (error) {
      console.error("Supabase insert error:", error);
    } else {
      console.log("Lead stored in Supabase");
    }
  } catch (err) {
    console.error("Supabase insert exception:", err);
  }

  return res.status(200).json({ ok: true });
}
