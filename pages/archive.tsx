import Layout from '../components/Layout'
import { GetStaticProps } from 'next'
import { getAllPosts } from '../lib/posts'
import Link from 'next/link'
import { formatDate } from '../lib/utils'
import { useState } from 'react'

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
}

export default function Archive({ posts }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.author && post.author.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const groupedPosts = filteredPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {} as Record<number, Post[]>)

  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a))

  return (
    <Layout title="Archive - Scylax AI Newsletter">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 pt-20 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center space-y-6 animate-fade-in">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Newsletter Archive
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Explore our complete collection of AI security insights and cybersecurity analysis
              </p>
              
              {/* Search Bar */}
              <div className="max-w-xl mx-auto mt-8">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search posts by title, content, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 pt-4">
                <span>{filteredPosts.length} articles</span>
                <span>•</span>
                <span>{years.length} years of content</span>
              </div>
            </div>
          </div>
        </section>

        {/* Posts by Year */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            {searchTerm && filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No posts found matching "{searchTerm}"</p>
              </div>
            ) : (
              <div className="space-y-16">
                {years.map(year => (
                  <div key={year} className="animate-slide-up">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                      <span>{year}</span>
                      <span className="ml-4 text-sm font-normal text-gray-500">
                        ({groupedPosts[Number(year)].length} posts)
                      </span>
                    </h2>
                    
                    <div className="grid gap-6">
                      {groupedPosts[Number(year)].map((post) => (
                        <article 
                          key={post.slug} 
                          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                        >
                          <Link href={`/posts/${post.slug}`}>
                            <div className="p-6 flex items-start space-x-6">
                              {/* Date Badge */}
                              <div className="flex-shrink-0 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex flex-col items-center justify-center">
                                  <span className="text-xs font-medium text-gray-600">
                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short' })}
                                  </span>
                                  <span className="text-lg font-bold text-gray-900">
                                    {new Date(post.date).getDate()}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors mb-2">
                                      {post.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-2 mb-3">
                                      {post.excerpt}
                                    </p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                      {post.author && (
                                        <>
                                          <span className="flex items-center space-x-2">
                                            <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                              {post.author.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{post.author}</span>
                                          </span>
                                          <span>•</span>
                                        </>
                                      )}
                                      <span>{post.readingTime}</span>
                                    </div>
                                  </div>
                                  
                                  {/* Arrow */}
                                  <svg className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Don't Miss Future Posts
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to get the latest AI security insights delivered to your inbox.
            </p>
            <Link href="/#subscribe">
              <a className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg">
                Subscribe Now
              </a>
            </Link>
          </div>
        </section>
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