import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Layout from '../../components/Layout'
import NewsletterSignup from '../../components/NewsletterSignup'
import { getAllPosts, getPostBySlug, Post } from '../../lib/posts'
import { formatDate } from '../../lib/utils'
import { useState } from 'react'

interface PostPageProps {
  post: Omit<Post, 'content'>
  mdxSource: MDXRemoteSerializeResult
  nextPost?: Omit<Post, 'content'> | null
  previousPost?: Omit<Post, 'content'> | null
}

export default function PostPage({ post, mdxSource, nextPost, previousPost }: PostPageProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/posts/${post.slug}` 
    : `https://newsletter.scylax.ai/posts/${post.slug}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialShareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  }

  return (
    <Layout title={`${post.title} - Scylax AI Security Newsletter`}>
      <article className="min-h-screen bg-scylax-dark">
        {/* Hero Section */}
        <section className="relative bg-scylax-navy border-b border-scylax-gray pt-20 pb-16">
          <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author Section */}
              <div className="flex items-center justify-between pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-scylax-accent to-scylax-accent-dark rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {post.author?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{post.author}</p>
                    <p className="text-sm text-gray-400">AI Security Evangelist</p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center space-x-2">
                  <a 
                    href={socialShareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-scylax-gray transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a 
                    href={socialShareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-scylax-gray transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-full hover:bg-scylax-gray transition-colors relative"
                    aria-label="Copy link"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {copied && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="post-content">
              <MDXRemote {...mdxSource} />
            </div>

            {/* Post Footer */}
            <div className="mt-16 pt-8 border-t border-scylax-gray">
              {/* Like/Reaction Section */}
              <div className="flex items-center justify-center space-x-6 mb-12">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Like this post</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-scylax-accent transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 8.048c0-1.59-1.616-2.882-3.609-2.882h-.257c-.262 0-.524.03-.776.089a6 6 0 00-11.348 0 2.768 2.768 0 00-.776-.089h-.257c-1.993 0-3.609 1.292-3.609 2.882 0 .959.592 1.809 1.502 2.335A2.556 2.556 0 004.5 22c1.194 0 2.182-.815 2.458-1.92h10.084c.276 1.105 1.264 1.92 2.458 1.92.768 0 1.447-.359 1.914-.925.91-.526 1.502-1.376 1.502-2.335z" />
                  </svg>
                  <span>Share your thoughts</span>
                </button>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-scylax-slate rounded-2xl p-8 text-center border border-scylax-gray">
                <h3 className="text-2xl font-bold text-white mb-4">Enjoyed this article?</h3>
                <p className="text-gray-400 mb-6">
                  Get weekly AI security insights delivered straight to your inbox.
                </p>
                <NewsletterSignup variant="dark" />
              </div>

              {/* Next/Previous Navigation */}
              {(nextPost || previousPost) && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white mb-6">Keep Reading</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {previousPost && (
                      <a href={`/posts/${previousPost.slug}`} className="card hover:bg-scylax-gray transition-colors">
                        <div className="text-sm text-scylax-accent mb-2">← Previous</div>
                        <h4 className="font-semibold text-white mb-2">{previousPost.title}</h4>
                        <p className="text-gray-400 text-sm">{previousPost.excerpt}</p>
                      </a>
                    )}
                    {nextPost && (
                      <a href={`/posts/${nextPost.slug}`} className="card hover:bg-scylax-gray transition-colors">
                        <div className="text-sm text-scylax-accent mb-2">Next →</div>
                        <h4 className="font-semibold text-white mb-2">{nextPost.title}</h4>
                        <p className="text-gray-400 text-sm">{nextPost.excerpt}</p>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Return to top */}
              <div className="mt-8 pt-8 border-t border-scylax-gray text-center">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center space-x-2 text-gray-400 hover:text-scylax-accent transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>Return to top</span>
                </button>
              </div>

            </div>
          </div>
        </section>
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

  // Get all posts sorted by date to find next/previous
  const allPosts = getAllPosts()
  const currentPostIndex = allPosts.findIndex(p => p.slug === slug)
  
  const nextPost = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null
  const previousPost = currentPostIndex < allPosts.length - 1 ? allPosts[currentPostIndex + 1] : null

  return {
    props: {
      post: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        author: post.author,
        image: post.image,
        readingTime: post.readingTime,
      },
      mdxSource,
      nextPost,
      previousPost,
    },
  }
}