import Layout from '../components/Layout'
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

export default function Archive({ posts }: Props) {
  return (
    <Layout title="Archive - Scylax AI Newsletter">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Newsletter Archive</h1>
          <p className="text-xl text-gray-600">
            Browse all our previous posts on AI security and cybersecurity
          </p>
        </header>

        <main>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b pb-8">
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-2">{post.date}</p>
                <p className="text-gray-800 mb-4">{post.excerpt}</p>
                <Link href={`/posts/${post.slug}`}>
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Read more →
                  </span>
                </Link>
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