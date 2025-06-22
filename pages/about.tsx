import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout title="About - Scylax AI Security Newsletter">
      <div className="min-h-screen bg-scylax-dark">
        {/* Header */}
        <section className="relative overflow-hidden bg-scylax-navy border-b border-scylax-gray">
          <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-20">
            <h1 className="text-5xl font-bold text-white mb-4">About Scylax Newsletter</h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Your trusted source for AI security intelligence and threat analysis.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-8">
                The Scylax AI Security Newsletter delivers critical insights and analysis on the rapidly evolving landscape of AI security threats and defenses. 
                We bridge the gap between cutting-edge research and practical security implementation, helping professionals stay ahead of emerging risks.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 mt-12">What We Cover</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="card">
                  <h3 className="text-xl font-semibold text-white mb-3">Threat Intelligence</h3>
                  <p className="text-gray-400">
                    Breaking analysis of new AI attack vectors, vulnerability disclosures, and emerging threat patterns in the AI ecosystem.
                  </p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-white mb-3">Security Research</h3>
                  <p className="text-gray-400">
                    Deep dives into academic papers, industry research, and practical discoveries that shape AI security best practices.
                  </p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-white mb-3">Defense Strategies</h3>
                  <p className="text-gray-400">
                    Actionable guidance on implementing robust security measures for AI systems and protecting against sophisticated attacks.
                  </p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-white mb-3">Industry Updates</h3>
                  <p className="text-gray-400">
                    Coverage of regulatory changes, compliance requirements, and industry standards affecting AI security practitioners.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 mt-12">Our Expertise</h2>
              <p className="text-gray-300 mb-8">
                Backed by Scylax.ai's deep expertise in AI security, our newsletter is curated by security researchers, 
                threat analysts, and industry practitioners who work at the forefront of AI defense. We combine technical 
                depth with practical insights to deliver content that matters to security professionals.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 mt-12">Why Subscribe?</h2>
              <ul className="space-y-4 text-gray-300 mb-12">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-scylax-accent mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Stay Informed:</strong> Get weekly updates on the latest AI security threats and vulnerabilities before they impact your systems.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-scylax-accent mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Expert Analysis:</strong> Benefit from in-depth technical analysis and practical recommendations from security experts.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-scylax-accent mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Actionable Insights:</strong> Every issue includes practical steps you can take to improve your AI security posture.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-scylax-accent mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Community Access:</strong> Join a community of security professionals working to secure AI systems.</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-scylax-slate rounded-xl p-8 text-center mt-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to strengthen your AI security knowledge?
              </h3>
              <p className="text-gray-400 mb-6">
                Join thousands of security professionals who rely on our insights.
              </p>
              <a href="/#subscribe" className="btn-primary">
                Subscribe to Newsletter
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}