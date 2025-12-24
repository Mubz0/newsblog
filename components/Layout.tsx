import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export default function Layout({ children, title = 'Scylax AI Security Newsletter' }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="AI security insights, threat intelligence, and cybersecurity newsletter by Scylax" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-scylax-darker">
        {/* Ambient Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="orb orb-cyan w-[600px] h-[600px] -top-48 -left-48 opacity-30" />
          <div className="orb orb-purple w-[500px] h-[500px] top-1/3 -right-48 opacity-20" style={{ animationDelay: '2s' }} />
          <div className="orb orb-pink w-[400px] h-[400px] bottom-0 left-1/3 opacity-15" style={{ animationDelay: '4s' }} />
        </div>

        {/* Top Bar */}
        <div className="relative z-50 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-white/50">Part of</span>
                <a href="https://scylax.ai" className="text-scylax-cyan hover:text-white transition-colors font-medium">
                  Scylax.ai
                </a>
              </div>
              <div className="hidden sm:flex items-center space-x-6 text-white/50">
                <a href="https://scylax.ai/products" className="hover:text-white transition-colors">
                  Products
                </a>
                <a href="https://scylax.ai/solutions" className="hover:text-white transition-colors">
                  Solutions
                </a>
                <a href="https://scylax.ai/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-scylax-darker/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-scylax-cyan blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
                       style={{ background: 'linear-gradient(135deg, #00f0ff, #7b2cff)' }}>
                    <span className="text-white font-display font-extrabold text-2xl">S</span>
                  </div>
                </div>
                <div>
                  <span className="text-xl font-display font-extrabold text-white">
                    Scylax <span className="text-gradient">Newsletter</span>
                  </span>
                  <p className="text-xs text-white/50">AI Security Intelligence</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="nav-link">
                  Latest
                </Link>
                <Link href="/archive" className="nav-link">
                  Archive
                </Link>
                <Link href="/topics" className="nav-link">
                  Topics
                </Link>
                <Link href="/about" className="nav-link">
                  About
                </Link>
                <a href="#subscribe" className="btn-primary">
                  Subscribe
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden glass border-t border-white/10 animate-fade-in">
              <div className="px-4 py-6 space-y-4">
                <Link href="/" className="block text-white/70 hover:text-white font-medium py-2">
                  Latest
                </Link>
                <Link href="/archive" className="block text-white/70 hover:text-white font-medium py-2">
                  Archive
                </Link>
                <Link href="/topics" className="block text-white/70 hover:text-white font-medium py-2">
                  Topics
                </Link>
                <Link href="/about" className="block text-white/70 hover:text-white font-medium py-2">
                  About
                </Link>
                <a href="#subscribe" className="block btn-primary text-center mt-4">
                  Subscribe
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="relative flex-1">{children}</main>

        {/* Footer */}
        <footer className="relative border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              {/* Brand Section */}
              <div className="col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-glow-cyan"
                       style={{ background: 'linear-gradient(135deg, #00f0ff, #7b2cff)' }}>
                    <span className="text-white font-display font-extrabold text-2xl">S</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white">Scylax Newsletter</h3>
                    <p className="text-sm text-white/50">AI Security Intelligence</p>
                  </div>
                </div>
                <p className="text-white/50 max-w-md mb-8 leading-relaxed">
                  Stay ahead of AI security threats with expert analysis, breaking research,
                  and actionable insights delivered weekly to your inbox.
                </p>
                <div className="flex space-x-4">
                  <a href="https://x.com/scylaxai"
                     className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-scylax-cyan hover:bg-white/5 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/scylax-ai"
                     className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-scylax-cyan hover:bg-white/5 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/scylax"
                     className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-scylax-cyan hover:bg-white/5 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Newsletter Links */}
              <div>
                <h3 className="text-lg font-display font-bold mb-6 text-white">Newsletter</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/" className="text-white/50 hover:text-scylax-cyan transition-colors">
                      Latest Issues
                    </Link>
                  </li>
                  <li>
                    <Link href="/archive" className="text-white/50 hover:text-scylax-cyan transition-colors">
                      Archive
                    </Link>
                  </li>
                  <li>
                    <Link href="/topics" className="text-white/50 hover:text-scylax-cyan transition-colors">
                      Topics
                    </Link>
                  </li>
                  <li>
                    <a href="#subscribe" className="text-white/50 hover:text-scylax-cyan transition-colors">
                      Subscribe
                    </a>
                  </li>
                </ul>
              </div>

              {/* Scylax Links */}
              <div>
                <h3 className="text-lg font-display font-bold mb-6 text-white">Scylax.ai</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="https://scylax.ai" className="text-white/50 hover:text-scylax-cyan transition-colors">
                      Main Website
                    </a>
                  </li>
                  <li>
                    <a href="https://scylax.ai/products" className="text-white/50 hover:text-scylax-cyan transition-colors">
                      Products
                    </a>
                  </li>
                  <li>
                    <a href="https://scylax.ai/solutions" className="text-white/50 hover:text-scylax-cyan transition-colors">
                      Solutions
                    </a>
                  </li>
                  <li>
                    <a href="https://scylax.ai/contact" className="text-white/50 hover:text-scylax-cyan transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="line-gradient mb-8" />

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/50 text-sm">
                &copy; {new Date().getFullYear()} Scylax AI. All rights reserved.
              </p>
              <div className="flex space-x-8 text-sm">
                <Link href="/privacy" className="text-white/50 hover:text-scylax-cyan transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/50 hover:text-scylax-cyan transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
