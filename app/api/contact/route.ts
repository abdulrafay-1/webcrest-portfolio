import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  email: string;
  projectType?: string;
  message: string;
};

const getRequiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const projectType = String(body.projectType || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const smtpHost = getRequiredEnv("SMTP_HOST");
    const smtpPort = Number(process.env.SMTP_PORT || "587");
    const smtpUser = getRequiredEnv("SMTP_USER");
    const smtpPass = getRequiredEnv("SMTP_PASS");
    const toEmail = getRequiredEnv("CONTACT_TO_EMAIL");
    const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType || "Not specified");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project Type: ${projectType || "Not specified"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
  <div style="background:#0b0b0f;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
    
    <div style="max-width:600px;margin:auto;background:#111116;border-radius:12px;border:1px solid #26263a;overflow:hidden;">
      
      <div style="background:linear-gradient(90deg,#7c3aed,#9333ea);padding:20px;text-align:center;">
        <h2 style="margin:0;color:white;font-size:20px;">New Contact Form Submission</h2>
      </div>

      <div style="padding:30px">

        <div style="margin-bottom:16px">
          <p style="margin:0;font-size:13px;color:#9ca3af;">Name</p>
          <p style="margin:4px 0 0;font-size:15px;color:white;">${safeName}</p>
        </div>

        <div style="margin-bottom:16px">
          <p style="margin:0;font-size:13px;color:#9ca3af;">Email</p>
          <p style="margin:4px 0 0;font-size:15px;color:white;">${safeEmail}</p>
        </div>

        <div style="margin-bottom:16px">
          <p style="margin:0;font-size:13px;color:#9ca3af;">Project Type</p>
          <p style="margin:4px 0 0;font-size:15px;color:white;">${safeProjectType}</p>
        </div>

        <div style="margin-top:24px">
          <p style="margin:0;font-size:13px;color:#9ca3af;">Message</p>
          <div style="margin-top:8px;padding:16px;background:#0f0f14;border:1px solid #26263a;border-radius:8px;color:#d1d5db;line-height:1.6;">
            ${safeMessage}
          </div>
        </div>

      </div>

      <div style="padding:16px;text-align:center;border-top:1px solid #26263a;font-size:12px;color:#6b7280">
        Web Crest • New Client Inquiry
      </div>

    </div>

  </div>
  `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "Unable to send message right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
