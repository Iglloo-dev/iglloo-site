// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// -----------------------------
// Helper: extract client IP
// -----------------------------
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

// -----------------------------
// Helper: is private/local IP?
// -----------------------------
function isPrivateIp(ip: string): boolean {
  if (ip === "127.0.0.1" || ip === "::1") return true;
  if (ip.startsWith("10.")) return true;
  if (ip.startsWith("192.168.")) return true;

  // 172.16.0.0 – 172.31.255.255
  const match172 = /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip);
  if (match172) return true;

  return false;
}

// -----------------------------
// Helper: Geo-IP lookup (ip → country)
// -----------------------------
async function lookupCountryFromIp(ip: string): Promise<string | null> {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
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

// -----------------------------
// Helper: rule-based spam score
// returns number between 0 and 1
// -----------------------------
function computeSpamScore(params: {
  name: string;
  email: string;
  message: string;
  country?: string;
}): number {
  const { name, email, message, country } = params;
  let score = 0;

  const lowerMsg = message.toLowerCase();
  const lowerName = name.toLowerCase();
  const lowerEmail = email.toLowerCase();

  // 1) Bad keywords / obvious spam phrases
  const spamPhrases = [
    "free money",
    "investment opportunity",
    "forex",
    "crypto",
    "bitcoin",
    "binary options",
    "loan offer",
    "fast cash",
    "work from home",
    "seo services",
    "backlinks",
    "viagra",
    "casino",
    "betting",
  ];

  for (const phrase of spamPhrases) {
    if (lowerMsg.includes(phrase)) {
      score += 0.2; // add 0.2 per bad phrase
    }
  }

  // 2) Too many URLs / links
  const urlMatches = message.match(/https?:\/\/|www\./gi);
  if (urlMatches && urlMatches.length > 0) {
    score += Math.min(0.3, urlMatches.length * 0.1);
  }

  // 3) Very short or very generic message
  if (message.trim().length < 10) {
    score += 0.15; // suspiciously short
  }
  const genericPhrases = [
    "contact me",
    "please call",
    "need services",
    "interested in your services",
  ];
  for (const phrase of genericPhrases) {
    if (lowerMsg === phrase || lowerMsg.startsWith(phrase)) {
      score += 0.15;
    }
  }

  // 4) Name looks fake (only one char, or nonsense)
  if (name.trim().length < 2) {
    score += 0.2;
  }
  if (!/[aeiou]/i.test(name) && name.trim().length >= 4) {
    // no vowels in name -> suspicious
    score += 0.15;
  }

  // 5) Email from known “throwaway-ish” or low-quality domains
  const throwawayDomains = [
    "mailinator.com",
    "yopmail.com",
    "guerillamail.com",
    "tempmail.com",
    "10minutemail.com",
  ];
  const emailDomain = lowerEmail.split("@")[1] || "";
  if (throwawayDomains.includes(emailDomain)) {
    score += 0.3;
  }

  // 6) All caps message
  if (message === message.toUpperCase() && message.length >= 10) {
    score += 0.15;
  }

  // 7) Weird country (optional) – if country is blank but visitor_country exists,
  // or country = "N/A" style, we can consider slightly suspicious.
  if (!country || country.trim().length < 2) {
    score += 0.05;
  }

  // Clamp between 0 and 1
  if (score < 0) score = 0;
  if (score > 1) score = 1;
  return Number(score.toFixed(2));
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
  // 4️⃣ Rule-based spam score (0–1)
  // ---------------------------------------------
  const spamScore = computeSpamScore({
    name,
    email,
    message,
    country,
  });

  // For now, we are NOT doing AI insights / lead_score / lead_segment.
  const aiInsight: string | null = null;
  const leadScore: number | null = null;
  const leadSegment: string | null = null;

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
      console.log("Lead stored in Supabase with spam_score:", spamScore);
    }
  } catch (err) {
    console.error("Supabase insert exception:", err);
  }

  return res.status(200).json({ ok: true });
}
