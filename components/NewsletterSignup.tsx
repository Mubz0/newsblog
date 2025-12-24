import { useState } from 'react'

interface NewsletterSignupProps {
  variant?: 'default' | 'hero' | 'cta' | 'minimal'
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
        setMessage('Welcome aboard! Check your email for confirmation.')
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

  const isHero = variant === 'hero'
  const isCta = variant === 'cta'
  const isMinimal = variant === 'minimal'

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`
          flex flex-col sm:flex-row gap-3
          ${isHero ? 'p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl' : ''}
        `}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              flex-1 px-6 py-4 text-base font-medium
              transition-all duration-300
              focus:outline-none
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isHero || isCta
                ? `bg-white/5 text-white placeholder-white/50
                   border border-white/10 rounded-xl
                   focus:border-scylax-cyan/50 focus:bg-white/10
                   focus:shadow-[0_0_20px_rgba(0,240,255,0.2)]`
                : isMinimal
                ? `bg-transparent text-white placeholder-white/50
                   border-b-2 border-white/20 rounded-none px-0
                   focus:border-scylax-cyan`
                : `bg-white/5 text-white placeholder-white/50
                   border border-white/10 rounded-xl
                   focus:border-scylax-cyan/50 focus:bg-white/10
                   focus:shadow-[0_0_20px_rgba(0,240,255,0.2)]`
              }
            `}
            disabled={status === 'loading'}
            required
          />
          <button
            type="submit"
            className={`
              relative px-8 py-4 font-semibold text-base overflow-hidden
              transition-all duration-300 transform
              hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-scylax-cyan/50 focus:ring-offset-2 focus:ring-offset-scylax-darker
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              ${isCta
                ? `bg-white text-scylax-dark rounded-xl
                   hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]`
                : `text-white rounded-xl
                   hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]`
              }
            `}
            style={!isCta ? { background: 'linear-gradient(to right, #00f0ff, #7b2cff)' } : undefined}
            disabled={status === 'loading'}
          >
            {/* Button glow effect */}
            <span className="absolute inset-0 opacity-0 hover:opacity-60 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to right, #00f0ff, #7b2cff)', filter: 'blur(20px)' }} />

            <span className="relative flex items-center justify-center space-x-2">
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>
      </form>

      {/* Status Message */}
      {message && (
        <div className={`
          mt-4 p-4 rounded-xl text-sm animate-fade-in backdrop-blur-sm
          ${status === 'success'
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }
        `}>
          <div className="flex items-center space-x-2">
            {status === 'success' ? (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span>{message}</span>
          </div>
        </div>
      )}

      {/* Privacy note */}
      {!isMinimal && (
        <p className="mt-4 text-sm text-center text-white/40">
          No spam, ever. Unsubscribe anytime.
        </p>
      )}
    </div>
  )
}
