import Layout from '../components/Layout'

export default function Terms() {
  return (
    <Layout title="Terms of Service - Scylax AI Security Newsletter">
      <div className="min-h-screen bg-scylax-dark">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">1. Acceptance of Terms</h2>
              <p className="text-gray-300 mb-6">
                By subscribing to the Scylax Newsletter, you agree to these Terms of Service.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. Newsletter Service</h2>
              <p className="text-gray-300 mb-6">
                The Scylax Newsletter provides AI security insights and analysis. Content is for informational purposes only and should not be considered as professional security advice.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                <li>Provide accurate email information</li>
                <li>Keep your subscription preferences updated</li>
                <li>Do not share newsletter content without permission</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. Intellectual Property</h2>
              <p className="text-gray-300 mb-6">
                All newsletter content is proprietary to Scylax.ai. Reproduction without permission is prohibited.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Disclaimer</h2>
              <p className="text-gray-300 mb-6">
                While we strive for accuracy, we cannot guarantee that all information is complete or error-free. Use of information is at your own risk.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">6. Limitation of Liability</h2>
              <p className="text-gray-300 mb-6">
                Scylax.ai is not liable for any damages arising from the use of newsletter content.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">7. Changes to Terms</h2>
              <p className="text-gray-300 mb-6">
                We reserve the right to modify these terms. Continued subscription constitutes acceptance of changes.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">8. Contact</h2>
              <p className="text-gray-300 mb-6">
                For questions about these terms, contact: legal@scylax.ai
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}