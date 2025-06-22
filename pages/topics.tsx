import Layout from '../components/Layout'
import Link from 'next/link'

const topics = [
  {
    category: 'AI Security Fundamentals',
    icon: '🔒',
    items: [
      { title: 'LLM Security', description: 'Prompt injection, jailbreaking, and model vulnerabilities' },
      { title: 'Model Poisoning', description: 'Defending against training data attacks' },
      { title: 'Adversarial Attacks', description: 'Understanding and preventing adversarial examples' },
    ]
  },
  {
    category: 'Threat Intelligence',
    icon: '🎯',
    items: [
      { title: 'Emerging Threats', description: 'Latest AI-powered attack vectors' },
      { title: 'Attack Patterns', description: 'Common exploitation techniques' },
      { title: 'Threat Actors', description: 'Groups leveraging AI for attacks' },
    ]
  },
  {
    category: 'Secure Development',
    icon: '🛠️',
    items: [
      { title: 'Secure Architecture', description: 'Building resilient AI systems' },
      { title: 'Best Practices', description: 'Security-first development approaches' },
      { title: 'Testing & Validation', description: 'Security testing for AI models' },
    ]
  },
  {
    category: 'Compliance & Governance',
    icon: '⚖️',
    items: [
      { title: 'AI Regulations', description: 'Global AI governance landscape' },
      { title: 'Privacy Laws', description: 'GDPR, CCPA, and AI implications' },
      { title: 'Industry Standards', description: 'ISO, NIST, and other frameworks' },
    ]
  },
]

export default function Topics() {
  return (
    <Layout title="Topics - Scylax AI Security Newsletter">
      <div className="min-h-screen bg-scylax-dark">
        {/* Header */}
        <section className="relative overflow-hidden bg-scylax-navy border-b border-scylax-gray">
          <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-20">
            <h1 className="text-5xl font-bold text-white mb-4">Topic Categories</h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Explore our comprehensive coverage of AI security topics, from fundamentals to cutting-edge research.
            </p>
          </div>
        </section>

        {/* Topics Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            {topics.map((category, idx) => (
              <div key={idx} className="mb-16">
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-4xl">{category.icon}</span>
                  <h2 className="text-3xl font-bold text-white">{category.category}</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {category.items.map((item, itemIdx) => (
                    <Link 
                      key={itemIdx}
                      href={`/topics/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="card group"
                    >
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-scylax-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">
                        {item.description}
                      </p>
                      <div className="mt-4 text-scylax-accent group-hover:translate-x-2 transition-transform">
                        Read articles →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-scylax-navy border-t border-scylax-gray">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Subscribe to get notified when we publish new content on your topics of interest.
            </p>
            <a href="/#subscribe" className="btn-primary">
              Subscribe Now
            </a>
          </div>
        </section>
      </div>
    </Layout>
  )
}