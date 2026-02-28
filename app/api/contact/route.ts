import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function clean(s: unknown, max = 2000) {
  return String(s ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Honeypot anti-spam
    const hp = clean(form.get("company_website"), 200);
    if (hp) {
      // Fake success (bots)
      return NextResponse.redirect(new URL("/contact?sent=1", req.url), { status: 303 });
    }

    const name = clean(form.get("name"), 120);
    const email = clean(form.get("email"), 180);
    const company = clean(form.get("company"), 180);
    const phone = clean(form.get("phone"), 80);
    const service = clean(form.get("service"), 80);
    const message = clean(form.get("message"), 4000);
    const consent = clean(form.get("consent"), 10);

    // Validations
    if (!name || !email || !message || consent !== "on") {
      return NextResponse.redirect(new URL("/contact?error=missing", req.url), { status: 303 });
    }
    if (!isEmail(email)) {
      return NextResponse.redirect(new URL("/contact?error=email", req.url), { status: 303 });
    }

    // IP / UA (utile logs)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const ua = req.headers.get("user-agent") || "unknown";

    const to = process.env.CONTACT_TO;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    if (!to || !from) {
      console.error("Missing CONTACT_TO / SMTP_FROM (or SMTP_USER)");
      return NextResponse.redirect(new URL("/contact?error=server", req.url), { status: 303 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE ?? "true") === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `[WCT] Nouveau contact${service ? ` — ${service}` : ""} — ${name}`;

    const text = [
      `Nom: ${name}`,
      `Email: ${email}`,
      `Entreprise: ${company || "-"}`,
      `Téléphone: ${phone || "-"}`,
      `Sujet: ${service || "-"}`,
      "",
      "Message:",
      message,
      "",
      `IP: ${ip}`,
      `UA: ${ua}`,
    ].join("\n");

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.redirect(new URL("/contact?sent=1", req.url), { status: 303 });
  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    return NextResponse.redirect(new URL("/contact?error=server", req.url), { status: 303 });
  }
}