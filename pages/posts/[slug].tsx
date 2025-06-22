import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Layout from '../../components/Layout'
import { getAllPosts, getPostBySlug, Post } from '../../lib/posts'

interface PostPageProps {
  post: Omit<Post, 'content'>
  mdxSource: MDXRemoteSerializeResult
}

export default function PostPage({ post, mdxSource }: PostPageProps) {
  return (
    <Layout title={`${post.title} - Scylax AI Newsletter`}>
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600">{post.date}</p>
        </header>
        
        <div className="post-content">
          <MDXRemote {...mdxSource} />
        </div>
        
        <footer className="mt-12 pt-8 border-t">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Enjoyed this post?</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to get the latest AI security insights delivered to your inbox.
            </p>
            <a 
              href="/#subscribe" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Subscribe Now
            </a>
          </div>
        </footer>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  const mdxSource = await serialize(post.content)

  return {
    props: {
      post: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
      },
      mdxSource,
    },
  }
}