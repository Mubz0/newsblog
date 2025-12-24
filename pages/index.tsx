import Layout from '../components/Layout'
import NewsletterSignup from '../components/NewsletterSignup'
import PostCard from '../components/PostCard'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getAllPosts } from '../lib/posts'
import { getSubscriberCount } from '../lib/subscribers'

interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  author?: string
  readingTime?: string
  image?: string
  category?: string
}

interface Props {
  posts: Post[]
  subscriberCount: number
}

export default function Home({ posts, subscriberCount }: Props) {
  const topics = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'LLM Security',
      description: 'Prompt injection, jailbreaking, and model vulnerabilities'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'Threat Intelligence',
      description: 'Emerging AI-powered attacks and defense strategies'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Secure Architecture',
      description: 'Building resilient AI systems and infrastructure'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Risk Assessment',
      description: 'Evaluating and mitigating AI-specific risks'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Data Protection',
      description: 'Privacy-preserving AI and secure data handling'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      title: 'Compliance',
      description: 'AI regulations, standards, and best practices'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: 'Incident Response',
      description: 'Handling AI security breaches and failures'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Research',
      description: 'Latest academic findings and industry innovations'
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-scylax-cyan/30 bg-scylax-cyan/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-scylax-cyan animate-pulse mr-3" />
              <span className="text-sm font-medium text-scylax-cyan">AI Security Intelligence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold leading-tight">
              <span className="text-white">Stay Ahead of</span>
              <br />
              <span className="text-gradient">AI Security Threats</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Expert analysis, breaking research, and actionable insights
              delivered weekly to security professionals worldwide.
            </p>

            {/* Newsletter Signup */}
            <div className="pt-4 max-w-lg mx-auto" id="subscribe">
              <NewsletterSignup variant="hero" />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-white/40">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-scylax-cyan" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Zero spam guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-scylax-cyan" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Industry expertise</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-scylax-cyan" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span>Actionable insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="section-title mb-4">Latest Analysis</h2>
              <p className="section-subtitle">
                Deep dives into AI security threats and defense strategies
              </p>
            </div>
            <Link
              href="/archive"
              className="inline-flex items-center space-x-2 text-scylax-cyan hover:text-white font-medium transition-colors group"
            >
              <span>View all posts</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post, idx) => (
              <div key={post.slug} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <PostCard post={post} featured={idx === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-24 relative">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-scylax-purple/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">What We Cover</h2>
            <p className="section-subtitle mx-auto">
              Comprehensive coverage of AI security topics that matter to professionals
            </p>
          </div>

          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((topic, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl border border-white/10 backdrop-blur-sm bg-white/[0.03]
                  transition-all duration-500 hover:border-scylax-cyan/30 hover:bg-white/[0.05]
                  hover:shadow-[0_0_40px_rgba(0,240,255,0.1)]"
              >
                {/* Icon */}
                <div className="mb-6 text-scylax-cyan group-hover:text-white transition-colors">
                  {topic.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-bold text-white mb-3 group-hover:text-scylax-cyan transition-colors">
                  {topic.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {topic.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-scylax-cyan/5 via-transparent to-scylax-purple/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #00f0ff, #7b2cff, #ff00aa)' }} />

        {/* Overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 grid-pattern" />
        </div>

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6">
            Join the AI Security Community
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get weekly insights that help you protect AI systems and stay informed about emerging threats.
          </p>
          <div className="max-w-lg mx-auto">
            <NewsletterSignup variant="cta" />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts()
  const subscriberCount = getSubscriberCount()

  return {
    props: {
      posts,
      subscriberCount: subscriberCount || 2500,
    },
  }
}
