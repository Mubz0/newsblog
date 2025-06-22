import { NextApiRequest, NextApiResponse } from 'next'
import { removeSubscriber } from '../../lib/subscribers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' })
  }

  try {
    const removed = removeSubscriber(email)
    
    if (removed) {
      res.status(200).json({ message: 'Successfully unsubscribed' })
    } else {
      res.status(404).json({ error: 'Email not found in subscribers' })
    }
  } catch (error) {
    console.error('Unsubscribe error:', error)
    res.status(500).json({ error: 'Failed to unsubscribe' })
  }
}