type MailProvider = "resend" | "sendgrid" | "smtp" | "console" | "none";

type Address = string | { name?: string; email: string };
type Addresses = Address | Address[];

export type MailInput = {
  to: Addresses;
  subject: string;
  html?: string;
  text?: string;
  from?: Address;
  replyTo?: Address;
  cc?: Addresses;
  bcc?: Addresses;
  tags?: Record<string, string | number>;
};

export type MailResult = {
  ok: boolean;
  id?: string;
  provider: MailProvider;
  status?: number;
  error?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  meta?: Record<string, string>;
  to?: Addresses;
  subject?: string;
  tags?: Record<string, string | number>;
};

const PROVIDER = (process.env.MAIL_PROVIDER as MailProvider) || "console";
const FROM_DEFAULT = process.env.MAIL_FROM || "Your Brand <no-reply@yourbrand.com>";
const TO_DEFAULT = process.env.MAIL_TO_DEFAULT || "";
const RESEND_KEY = process.env.RESEND_API_KEY || "";
const SENDGRID_KEY = process.env.SENDGRID_API_KEY || "";
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";

function toArray(a?: Addresses): Array<{ name?: string; email: string }> {
  if (!a) return [];
  const arr = Array.isArray(a) ? a : [a];
  return arr.map((x) => (typeof x === "string" ? parseAddress(x) : x));
}

function parseAddress(v: string): { name?: string; email: string } {
  const m = v.match(/^(.*)<(.+)>$/);
  if (m) return { name: m[1].trim().replace(/^"|"$/g, ""), email: m[2].trim() };
  return { email: v.trim() };
}

function formatAddress(a: Address) {
  const b = typeof a === "string" ? parseAddress(a) : a;
  return b.name ? `${b.name} <${b.email}>` : b.email;
}

function normalize(input: MailInput) {
  const from = input.from ? formatAddress(input.from) : FROM_DEFAULT;
  const to = toArray(input.to).map((x) => formatAddress(x));
  const cc = toArray(input.cc).map((x) => formatAddress(x));
  const bcc = toArray(input.bcc).map((x) => formatAddress(x));
  const replyTo = input.replyTo ? formatAddress(input.replyTo) : undefined;
  const html = input.html || "";
  const text = input.text || htmlToText(html);
  return { ...input, from, to, cc, bcc, replyTo, html, text };
}

function htmlToText(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function id() {
  try {
    // @ts-ignore
    return crypto.randomUUID();
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

function err(e: unknown) {
  if (e instanceof Error) return e.message;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

async function sendResend(input: MailInput): Promise<MailResult> {
  const data = normalize(input);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: data.from,
      to: data.to,
      cc: data.cc.length ? data.cc : undefined,
      bcc: data.bcc.length ? data.bcc : undefined,
      subject: data.subject,
      html: data.html,
      text: data.text,
      reply_to: data.replyTo,
      tags: data.tags ? Object.entries(data.tags).map(([name, value]) => ({ name, value: String(value) })) : undefined,
    }),
  });
  const ok = res.ok;
  const body = ok ? await res.json().catch(() => ({})) : await res.text().catch(() => "");
  const msgId = ok && typeof body === "object" && body && "id" in body ? (body as any).id : undefined;
  return { ok, id: msgId || id(), provider: "resend", status: res.status, error: ok ? undefined : String(body) };
}

async function sendSendgrid(input: MailInput): Promise<MailResult> {
  const data = normalize(input);
  const payload = {
    personalizations: [
      {
        to: data.to.map((x) => parseAddress(x)),
        cc: data.cc.length ? data.cc.map((x) => parseAddress(x)) : undefined,
        bcc: data.bcc.length ? data.bcc.map((x) => parseAddress(x)) : undefined,
        custom_args: data.tags,
      },
    ],
    from: parseAddress(data.from),
    reply_to: data.replyTo ? parseAddress(data.replyTo) : undefined,
    subject: data.subject,
    content: [
      { type: "text/plain", value: data.text },
      { type: "text/html", value: data.html },
    ],
  };
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${SENDGRID_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const ok = res.status === 202;
  const msgId = res.headers.get("x-message-id") || id();
  const body = ok ? "" : await res.text().catch(() => "");
  return { ok, id: msgId, provider: "sendgrid", status: res.status, error: ok ? undefined : body };
}

async function dynamicImport(name: string): Promise<any> {
  try {
    const fn = Function("n", "return import(n)");
    const mod = await (fn as any)(name);
    return mod?.default ?? mod;
  } catch {
    return null;
  }
}

async function sendSmtp(input: MailInput): Promise<MailResult> {
  const data = normalize(input);
  const nodemailer = await dynamicImport("nodemailer");
  if (!nodemailer?.createTransport) return { ok: false, provider: "smtp", error: "nodemailer not available" };
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  const info = await transporter.sendMail({
    from: data.from,
    to: data.to.join(", "),
    cc: data.cc.length ? data.cc.join(", ") : undefined,
    bcc: data.bcc.length ? data.bcc.join(", ") : undefined,
    subject: data.subject,
    html: data.html,
    text: data.text,
    replyTo: data.replyTo,
    headers: data.tags ? Object.fromEntries(Object.entries(data.tags).map(([k, v]) => [`x-tag-${k}`, String(v)])) : undefined,
  });
  return { ok: true, id: info?.messageId || id(), provider: "smtp" };
}

async function sendConsole(input: MailInput): Promise<MailResult> {
  const data = normalize(input);
  const payload = { ...data, html: data.html.slice(0, 240) + (data.html.length > 240 ? "…" : "") };
  console.log("[mail:console]", JSON.stringify(payload, null, 2));
  return { ok: true, id: id(), provider: "console" };
}

export async function sendMail(input: MailInput): Promise<MailResult> {
  try {
    if (PROVIDER === "resend") return await sendResend(input);
    if (PROVIDER === "sendgrid") return await sendSendgrid(input);
    if (PROVIDER === "smtp") return await sendSmtp(input);
    if (PROVIDER === "console") return await sendConsole(input);
    return { ok: false, provider: "none", error: "provider not configured" };
  } catch (e) {
    return { ok: false, provider: PROVIDER, error: err(e) };
  }
}

export function contactHtml(p: ContactPayload) {
  const rows = [
    `<h2 style="margin:0 0 12px 0;font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial;">New inquiry</h2>`,
    `<p style="margin:0 0 6px 0;"><strong>Name:</strong> ${escapeHtml(p.name)}</p>`,
    `<p style="margin:0 0 6px 0;"><strong>Email:</strong> ${escapeHtml(p.email)}</p>`,
    `<p style="white-space:pre-wrap;margin-top:12px;">${escapeHtml(p.message)}</p>`,
  ];
  if (p.meta && Object.keys(p.meta).length) {
    rows.push(`<hr style="margin:16px 0;border:0;border-top:1px solid #e5e7eb;" />`);
    rows.push(`<p style="margin:0 0 8px 0;"><strong>Meta</strong></p>`);
    rows.push(
      `<ul style="padding-left:16px;margin:0;">${Object.entries(p.meta)
        .map(([k, v]) => `<li><strong>${escapeHtml(k)}:</strong> ${escapeHtml(String(v))}</li>`)
        .join("")}</ul>`
    );
  }
  return `<div>${rows.join("")}</div>`;
}

export function contactText(p: ContactPayload) {
  const meta = p.meta && Object.keys(p.meta).length ? "\n\nMeta:\n" + Object.entries(p.meta).map(([k, v]) => `- ${k}: ${v}`).join("\n") : "";
  return `New inquiry\n\nName: ${p.name}\nEmail: ${p.email}\n\n${p.message}${meta}`;
}

export async function sendContact(p: ContactPayload): Promise<MailResult> {
  const to = p.to || (TO_DEFAULT ? [TO_DEFAULT] : []);
  const subject = p.subject || "New inquiry";
  const html = contactHtml(p);
  const text = contactText(p);
  return sendMail({ to, subject, html, text, replyTo: { name: p.name, email: p.email }, tags: p.tags });
}

export function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

const mail = { provider: PROVIDER, send: sendMail, sendContact, isValidEmail, contactHtml, contactText };
export default mail;
