import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const LIMITS = { name: 200, email: 254, phone: 40, company: 200, message: 8000, locale: 12 }

function clamp(s: unknown, max: number): string {
  if (typeof s !== 'string') return ''
  return s.trim().slice(0, max)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL ?? 'contact@elmogps.com'

  if (!apiKey || !from) {
    console.error('[contact] Missing RESEND_API_KEY or RESEND_FROM_EMAIL')
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const o = body as Record<string, unknown>
  const name = clamp(o.name, LIMITS.name)
  const email = clamp(o.email, LIMITS.email)
  const phone = clamp(o.phone, LIMITS.phone)
  const company = clamp(o.company, LIMITS.company)
  const message = clamp(o.message, LIMITS.message)
  const locale = clamp(o.locale, LIMITS.locale)

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const resend = new Resend(apiKey)
  const text = [
    'Nouveau message — site ELMOGPS',
    `Langue / locale: ${locale || '—'}`,
    '',
    `Nom: ${name}`,
    `Email: ${email}`,
    `Téléphone: ${phone || '—'}`,
    `Entreprise: ${company || '—'}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const html = `
    <h2>Nouveau message — ELMOGPS</h2>
    <p><strong>Locale:</strong> ${escapeHtml(locale || '—')}</p>
    <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <p><strong>Téléphone:</strong> ${escapeHtml(phone || '—')}</p>
    <p><strong>Entreprise:</strong> ${escapeHtml(company || '—')}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
  `

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `[ELMOGPS Contact] ${name}`,
    text,
    html,
  })

  if (error) {
    console.error('[contact] Resend error', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
