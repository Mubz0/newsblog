import Head from 'next/head'
import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export default function Layout({ children, title = 'Scylax AI Newsletter' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="AI security insights and cybersecurity newsletter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold">
                Scylax AI Newsletter
              </Link>
              <div className="space-x-6">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <Link href="/archive" className="hover:text-blue-600">
                  Archive
                </Link>
                <Link href="/about" className="hover:text-blue-600">
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="bg-white border-t mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2024 Scylax AI Newsletter. All rights reserved.</p>
              <p className="mt-2">
                <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
                {' | '}
                <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}