// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const AI_ENABLED = process.env.AI_INSIGHTS_ENABLED === "true";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, phone, country, message } = req.body || {};

  if (!name || !email || !country || !message) {
    return res
      .status(400)
      .json({ ok: false, error: "Missing required fields" });
  }

  // ---------------------------------
  // 0. Derive visitor IP (best-effort)
  // ---------------------------------
  const rawIp =
    (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    null;

  // TODO (optional): later we can call an IP lookup API and fill visitorCountry
  const visitorCountry: string | null = null;

  // ---------------------------------
  // 1. Send to Mailtrap Sandbox
  // ---------------------------------
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
      <p><strong>Country considering:</strong> ${country}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(sandboxEmail);
    console.log("Sandbox email delivered");
  } catch (err) {
    console.error("Sandbox email error:", err);
    // we still continue so we can try to log the lead
  }

  // ---------------------------------
  // 2. Forward to Gmail via Mailtrap API
  // ---------------------------------
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

  // ---------------------------------
  // 3. (Optional) AI insight / scoring
  // ---------------------------------
  let aiInsight: string | null = null;
  let spamScore: number | null = null;
  let leadScore: number | null = null;
  let leadSegment: string | null = null;

  if (AI_ENABLED && process.env.OPENAI_API_KEY) {
    try {
      // ⚠️ This will currently hit your quota error, so leave AI_ENABLED=false
      const prompt = `
You are a lead intelligence assistant for a retirement relocation service.

Lead details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "N/A"}
- Country considering: ${country}
- Message: ${message}

1) Summarize this lead in 1–2 sentences.
2) Give a spam score between 0 and 1 (0 = not spam, 1 = obvious spam).
3) Give a lead quality score from 0 to 100.
4) Classify as "Hot", "Warm", or "Cold".

Return a JSON object with keys:
"summary", "spam_score", "lead_score", "segment".
`;

      const aiRes = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          input: prompt,
          response_format: { type: "json_object" },
        }),
      });

      if (!aiRes.ok) {
        const text = await aiRes.text();
        throw new Error(`OpenAI error: ${aiRes.status} ${text}`);
      }

      const json = await aiRes.json();
      const parsed = JSON.parse(json.output[0].content[0].text);

      aiInsight = parsed.summary ?? null;
      spamScore =
        typeof parsed.spam_score === "number" ? parsed.spam_score : null;
      leadScore =
        typeof parsed.lead_score === "number" ? parsed.lead_score : null;
      leadSegment = typeof parsed.segment === "string" ? parsed.segment : null;
    } catch (err) {
      console.error("AI lead insight error:", err);
      // we just skip AI fields if it fails
    }
  }

  // ---------------------------------
  // 4. Insert lead into Supabase
  // ---------------------------------
  try {
    const { error } = await supabaseAdmin.from("leads").insert({
      created_at: new Date().toISOString(),
      name,
      email,
      phone,
      country,
      message,
      ai_insight: aiInsight,
      visitor_country: visitorCountry,
      ip_address: rawIp,
      // comment these out if you didn't create the columns
      spam_score: spamScore,
      lead_score: leadScore,
      lead_segment: leadSegment,
    });

    if (error) {
      console.error("Supabase insert error:", error);
    } else {
      console.log("Lead saved to Supabase");
    }
  } catch (err) {
    console.error("Unexpected Supabase error:", err);
  }

  return res.status(200).json({ ok: true });
}
