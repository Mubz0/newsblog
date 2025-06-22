import Layout from '../components/Layout'

export default function Privacy() {
  return (
    <Layout title="Privacy Policy - Scylax AI Security Newsletter">
      <div className="min-h-screen bg-scylax-dark">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Information We Collect</h2>
              <p className="text-gray-300 mb-6">
                When you subscribe to the Scylax Newsletter, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                <li>Your email address</li>
                <li>Subscription preferences</li>
                <li>Newsletter engagement metrics (opens, clicks)</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">How We Use Your Information</h2>
              <p className="text-gray-300 mb-6">
                We use your information solely to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                <li>Send you our weekly newsletter</li>
                <li>Notify you of important security updates</li>
                <li>Improve our content based on engagement</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Data Security</h2>
              <p className="text-gray-300 mb-6">
                We implement industry-standard security measures to protect your data. Your email is encrypted and stored securely.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Third-Party Services</h2>
              <p className="text-gray-300 mb-6">
                We use Resend for email delivery. Your data is not shared with any other third parties for marketing purposes.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Your Rights</h2>
              <p className="text-gray-300 mb-6">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                <li>Unsubscribe at any time</li>
                <li>Request your data</li>
                <li>Request data deletion</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Contact</h2>
              <p className="text-gray-300 mb-6">
                For privacy concerns, contact us at: privacy@scylax.ai
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}