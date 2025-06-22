import fs from 'fs'
import path from 'path'

const subscribersFile = path.join(process.cwd(), 'data/subscribers.json')

export interface Subscriber {
  email: string
  subscribedAt: string
  active: boolean
}

export function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  
  if (!fs.existsSync(subscribersFile)) {
    fs.writeFileSync(subscribersFile, JSON.stringify([], null, 2))
  }
}

export function getAllSubscribers(): Subscriber[] {
  try {
    ensureDataDirectory()
    const data = fs.readFileSync(subscribersFile, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading subscribers:', error)
    return []
  }
}

export function addSubscriber(email: string): boolean {
  try {
    const subscribers = getAllSubscribers()
    
    // Check if email already exists
    if (subscribers.some(sub => sub.email === email)) {
      return false // Already subscribed
    }
    
    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
      active: true
    })
    
    fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2))
    return true
  } catch (error) {
    console.error('Error adding subscriber:', error)
    return false
  }
}

export function removeSubscriber(email: string): boolean {
  try {
    const subscribers = getAllSubscribers()
    const filteredSubscribers = subscribers.filter(sub => sub.email !== email)
    
    if (filteredSubscribers.length === subscribers.length) {
      return false // Email not found
    }
    
    fs.writeFileSync(subscribersFile, JSON.stringify(filteredSubscribers, null, 2))
    return true
  } catch (error) {
    console.error('Error removing subscriber:', error)
    return false
  }
}

export function getSubscriberCount(): number {
  const subscribers = getAllSubscribers()
  return subscribers.filter(sub => sub.active).length
}