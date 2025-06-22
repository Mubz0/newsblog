import Layout from '../components/Layout'
import NewsletterSignup from '../components/NewsletterSignup'
import PostCard from '../components/PostCard'
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
}

interface Props {
  posts: Post[]
  subscriberCount: number
}

export default function Home({ posts, subscriberCount }: Props) {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-scylax-dark">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
        <div className="absolute inset-0 bg-grid-pattern"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-8 animate-fade-in">
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
              <span className="text-white">AI Security</span>
              <br />
              <span className="text-gradient">Intelligence Newsletter</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay ahead of emerging AI threats with expert analysis, breaking research, 
              and actionable insights delivered weekly to your inbox.
            </p>

            <div className="pt-8 max-w-md mx-auto" id="subscribe">
              <NewsletterSignup variant="dark" />
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 pt-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-scylax-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Zero spam</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-scylax-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Industry expertise</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-scylax-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Actionable insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 bg-scylax-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Latest Analysis</h2>
              <p className="text-gray-400">Deep dives into AI security threats and defense strategies</p>
            </div>
            <a 
              href="/archive" 
              className="text-scylax-accent hover:text-scylax-accent-light font-medium flex items-center space-x-2 transition-colors"
            >
              <span>View all posts</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 bg-scylax-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What We Cover
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive coverage of AI security topics that matter to professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🛡️',
                title: 'LLM Security',
                description: 'Prompt injection, jailbreaking, and model vulnerabilities'
              },
              {
                icon: '🔍',
                title: 'Threat Intelligence',
                description: 'Emerging AI-powered attacks and defense strategies'
              },
              {
                icon: '🏗️',
                title: 'Secure Architecture',
                description: 'Building resilient AI systems and infrastructure'
              },
              {
                icon: '📊',
                title: 'Risk Assessment',
                description: 'Evaluating and mitigating AI-specific risks'
              },
              {
                icon: '🔐',
                title: 'Data Protection',
                description: 'Privacy-preserving AI and secure data handling'
              },
              {
                icon: '⚖️',
                title: 'Compliance',
                description: 'AI regulations, standards, and best practices'
              },
              {
                icon: '🚨',
                title: 'Incident Response',
                description: 'Handling AI security breaches and failures'
              },
              {
                icon: '🔬',
                title: 'Research',
                description: 'Latest academic findings and industry innovations'
              }
            ].map((topic, idx) => (
              <div key={idx} className="card group hover:border-scylax-accent/50">
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-scylax-accent transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-scylax-accent to-scylax-accent-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join the AI Security Community
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get weekly insights that help you protect AI systems and stay informed about emerging threats.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup variant="light" />
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
      subscriberCount: subscriberCount || 2500, // Default count for demo
    },
  }
}