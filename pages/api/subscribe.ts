import { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'
import { addSubscriber } from '../../lib/subscribers'

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' })
  }

  try {
    // Add subscriber to local storage
    const added = addSubscriber(email)
    
    if (!added) {
      return res.status(409).json({ error: 'Email already subscribed' })
    }
    
    // Send welcome email (skip in development mode)
    if (process.env.SENDGRID_API_KEY && process.env.NODE_ENV !== 'development') {
      await sgMail.send({
        from: process.env.SENDGRID_FROM_EMAIL || 'contact@scylax.ai',
        to: email,
        subject: 'Welcome to Scylax AI Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1f2937;">Welcome to Scylax AI Newsletter!</h1>
            <p>Thank you for subscribing to our newsletter. You'll receive the latest insights on AI security, cybersecurity, and emerging threats.</p>
            <p>Stay tuned for our upcoming content!</p>
            <hr style="margin: 20px 0;">
            <p style="color: #6b7280; font-size: 14px;">
              If you didn't subscribe to this newsletter, you can safely ignore this email.
              <br>
              To unsubscribe, visit: https://newsletter.scylax.ai/unsubscribe
            </p>
          </div>
        `,
      })
    }

    console.log(`New subscriber: ${email}`)
    res.status(200).json({ message: 'Successfully subscribed' })
  } catch (error) {
    console.error('Subscription error:', error)
    res.status(500).json({ error: 'Failed to subscribe' })
  }
}