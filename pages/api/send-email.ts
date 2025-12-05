import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  // Quick sanity checks for env vars (logs only, not sent to client)
  console.log("CONTACT_TO_EMAIL:", process.env.CONTACT_TO_EMAIL ? "set" : "MISSING");
  console.log("MAILTRAP_API_TOKEN:", process.env.MAILTRAP_API_TOKEN ? "set" : "MISSING");

  // -----------------------------
  // 1️⃣ MAILTRAP SANDBOX (SMTP)
  // -----------------------------
  try {
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
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    await transporter.sendMail(sandboxEmail);
    console.log("✅ Sandbox email delivered");
  } catch (err) {
    console.error("❌ Sandbox email error:", err);
    // We DON'T fail the whole request just because sandbox failed
  }

  // -----------------------------
  // 2️⃣ FORWARD TO GMAIL (API)
  // -----------------------------
  let gmailForwardOk = false;

  if (!process.env.MAILTRAP_API_TOKEN || !process.env.CONTACT_TO_EMAIL) {
    console.error("❌ Missing MAILTRAP_API_TOKEN or CONTACT_TO_EMAIL env var");
  } else {
    try {
      const response = await axios.post(
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
            <p><strong>Message:</strong><br>${message}</p>
          `,
          category: "website-inquiry",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Forwarded to Gmail successfully. Mailtrap API response:", response.data);
      gmailForwardOk = true;
    } catch (err: any) {
      console.error(
        "❌ Mailtrap API Gmail forward error:",
        err.response?.data || err.message || err
      );
    }
  }

  // You can decide what you want to return to the frontend
  return res.status(200).json({
    ok: true,
    forwardedToGmail: gmailForwardOk,
  });
}
