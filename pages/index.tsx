import Layout from '../components/Layout'
import NewsletterSignup from '../components/NewsletterSignup'
import { GetStaticProps } from 'next'
import { getAllPosts } from '../lib/posts'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
}

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Scylax AI Newsletter</h1>
          <p className="text-xl text-gray-600 mb-8">
            Insights on AI security, cybersecurity, and emerging threats
          </p>
          <NewsletterSignup />
        </header>

        <main>
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b pb-8">
                <Link href={`/posts/${post.slug}`}>
                  <h3 className="text-2xl font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-2">{post.date}</p>
                <p className="text-gray-800">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts()
  return {
    props: {
      posts,
    },
  }
}