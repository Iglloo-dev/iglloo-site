// pages/api/send-email.ts

export const config = {
  runtime: "nodejs",
};

import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ResponseData = { ok: boolean; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, phone, message } = (req.body || {}) as {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "Name, email and message are required.",
    });
  }

  // --- Environment variables ---
  const sandboxHost = process.env.MAILTRAP_HOST;
  const sandboxPort = Number(process.env.MAILTRAP_PORT || 587);
  const sandboxUser = process.env.MAILTRAP_USER;
  const sandboxPass = process.env.MAILTRAP_PASS;

  const sandboxTo =
    process.env.SANDBOX_TO_EMAIL || "contact@iglloo.online";
  const gmailTo =
    process.env.GMAIL_TO_EMAIL || "iglloo.online@gmail.com";

  if (!sandboxHost || !sandboxUser || !sandboxPass) {
    console.error("Mailtrap sandbox SMTP env vars missing");
    return res.status(500).json({
      ok: false,
      error: "Email service not configured on server.",
    });
  }

  const htmlBody = `
    <h2>New inquiry from Iglloo website</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "(not provided)"}</p>
    <p><strong>Message:</strong></p>
    <p>${(message || "").replace(/\n/g, "<br />")}</p>
  `;

  const textBody = `
New inquiry from Iglloo website

Name: ${name}
Email: ${email}
Phone: ${phone || "(not provided)"}

Message:
${message}
`;

  try {
    // 1️⃣ ALWAYS send to Mailtrap Sandbox (logging / testing)
    const sandboxTransporter = nodemailer.createTransport({
      host: sandboxHost,
      port: sandboxPort,
      auth: {
        user: sandboxUser,
        pass: sandboxPass,
      },
    });

    const sandboxInfo = await sandboxTransporter.sendMail({
      from: `"Iglloo Website" <no-reply@iglloo.online>`,
      to: sandboxTo,
      subject: `New inquiry from ${name}`,
      text: textBody,
      html: htmlBody,
    });

    console.log(
      "Sandbox email sent, id:",
      sandboxInfo.messageId
    );

    // 2️⃣ TRY sending real copy to Gmail via Mailtrap Email Sending
    let gmailError: string | null = null;
    const apiToken = process.env.MAILTRAP_API_TOKEN;

    if (apiToken) {
      try {
        const response = await fetch(
          "https://send.api.mailtrap.io/api/send",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: {
                email: "no-reply@iglloo.online",
                name: "Iglloo Website",
              },
              to: [{ email: gmailTo }],
              subject: `New inquiry from ${name}`,
              text: textBody,
              html: htmlBody,
            }),
          }
        );

        if (!response.ok) {
          let msg = `Mailtrap send API status ${response.status}`;
          try {
            const data = await response.json();
            if (Array.isArray((data as any)?.errors)) {
              msg = (data as any).errors.join(", ");
            } else if (typeof (data as any)?.message === "string") {
              msg = (data as any).message;
            }
          } catch {
            const t = await response.text();
            if (t) msg = t;
          }
          gmailError = msg;
          console.error("Mailtrap Email Sending error:", msg);
        } else {
          console.log("Gmail copy sent via Mailtrap Email Sending");
        }
      } catch (err) {
        gmailError = (err as Error).message;
        console.error(
          "Error sending Gmail copy via Mailtrap Email Sending:",
          err
        );
      }
    } else {
      console.warn(
        "MAILTRAP_API_TOKEN missing, skipping Gmail copy."
      );
    }

    // 3️⃣ Respond – sandbox success is enough
    if (gmailError) {
      // We still return 200 because sandbox succeeded, but include the info
      return res.status(200).json({
        ok: true,
        error: gmailError,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error in send-email handler:", error);
    return res
      .status(500)
      .json({ ok: false, error: "Failed to send message." });
  }
}
