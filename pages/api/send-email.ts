import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";
import OpenAI from "openai";

const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;
const COUNTRY_REGEX = /^[A-Za-z\s]{2,40}$/;

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, phone, country, message, honey } = req.body;

  // 🐝 Honeypot (bot) check
  if (honey && honey.trim() !== "") {
    console.log("Spam bot blocked.");
    return res.status(200).json({ ok: true, spam: true });
  }

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  if (!PHONE_REGEX.test(String(phone))) {
    return res.status(400).json({ ok: false, error: "Invalid phone format" });
  }

  if (!COUNTRY_REGEX.test(String(country))) {
    return res.status(400).json({ ok: false, error: "Invalid country format" });
  }

  // ------------------------------------
  // 1️⃣ Send email to Mailtrap Sandbox
  // ------------------------------------
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
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Country considering:</strong> ${country}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(sandboxEmail);
    console.log("Sandbox email delivered.");
  } catch (err) {
    console.error("Sandbox delivery error", err);
  }

  // ------------------------------------------------
  // 2️⃣ AI Lead Intelligence Agent (OpenAI analysis)
  // ------------------------------------------------

  let aiSummary = "AI analysis unavailable.";

  try {
    const aiRes = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
        You are an AI Lead Qualification Agent.
        Analyze the following inquiry and respond with:

        - Lead Quality Score (1–10)
        - Intent Level (Low/Medium/High)
        - Key Motivation Summary
        - Recommended Next Follow-up Action

        Inquiry:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Country: ${country}
        Message: ${message}
      `,
    });

    aiSummary = aiRes.output_text;
  } catch (err) {
    console.error("AI error", err);
  }

  // -------------------------------------------------
  // 3️⃣ Forward to Gmail (via Mailtrap API)
  // -------------------------------------------------
  try {
    await axios.post(
      "https://send.api.mailtrap.io/api/send",
      {
        from: { email: "no-reply@iglloo.online", name: "Iglloo Website" },
        to: [{ email: process.env.CONTACT_TO_EMAIL }],
        subject: `Lead Inquiry + AI Summary`,
        html: `
          <h2>New Lead from Iglloo Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Message:</strong> ${message}</p>

          <hr />

          <h3>AI Lead Intelligence Summary</h3>
          <pre>${aiSummary}</pre>
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Forwarded to Gmail.");
  } catch (err: any) {
    console.error("Gmail forward error:", err.response?.data || err);
  }

  return res.status(200).json({ ok: true });
}
