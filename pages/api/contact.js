// pages/api/contact.js
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { name, email, message } = contactSchema.parse(req.body)

    const from = process.env.RESEND_FROM || 'onboarding@resend.dev'
    const to = process.env.RESEND_TO || 'petar.arsic14@hotmail.com'

    const { error } = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to: [to],
      reply_to: email, // da možeš direktno da odgovoriš pošiljaocu
      subject: `Nova poruka sa sajta – ${name}`,
      html: `
        <h2>Nova poruka sa kontakt forme</h2>
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Poruka:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    if (err?.errors) return res.status(400).json({ error: 'Validation failed', details: err.errors })
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
