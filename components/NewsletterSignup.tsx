import { useState } from 'react'

interface NewsletterSignupProps {
  variant?: 'default' | 'light'
}

export default function NewsletterSignup({ variant = 'default' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const endpoint = process.env.NODE_ENV === 'production' 
        ? '/.netlify/functions/subscribe'
        : '/api/subscribe'
        
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('🎉 Welcome aboard! Check your email for confirmation.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  const isLight = variant === 'light'

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              flex-1 px-6 py-4 rounded-full text-base
              ${isLight 
                ? 'bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30' 
                : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200 shadow-sm'
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            `}
            disabled={status === 'loading'}
            required
          />
          <button
            type="submit"
            className={`
              px-8 py-4 rounded-full font-semibold text-base
              ${isLight
                ? 'bg-white text-indigo-600 hover:bg-gray-100'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transform transition-all duration-200 hover:scale-105 active:scale-95
              shadow-lg
            `}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Subscribing...</span>
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </form>
      
      {message && (
        <div className={`
          mt-4 p-4 rounded-lg text-sm animate-slide-up
          ${status === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
          }
        `}>
          {message}
        </div>
      )}

      <p className={`
        mt-4 text-sm text-center
        ${isLight ? 'text-white/80' : 'text-gray-500'}
      `}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}