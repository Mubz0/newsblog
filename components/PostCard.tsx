import Link from 'next/link'
import Image from 'next/image'

interface PostCardProps {
  post: {
    slug: string
    title: string
    excerpt: string
    date: string
    author?: string
    readingTime?: string
    image?: string
  }
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Link href={`/posts/${post.slug}`} className="block h-full">
      <article className="card h-full flex flex-col">
        <div className="relative aspect-[16/9] bg-gradient-to-br from-scylax-accent/20 to-scylax-accent-dark/20 overflow-hidden rounded-t-xl">
          {post.image ? (
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-24 h-24 text-scylax-accent/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="p-6 space-y-4 flex-grow flex flex-col">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{formatDate(post.date)}</span>
            {post.readingTime && (
              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readingTime}</span>
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-scylax-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-400 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          {post.author && (
            <div className="pt-4 flex items-center space-x-3 border-t border-scylax-gray mt-auto">
              <div className="w-10 h-10 bg-gradient-to-br from-scylax-accent to-scylax-accent-dark rounded-full flex items-center justify-center text-white font-semibold">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{post.author}</p>
                <p className="text-xs text-gray-400">Author</p>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}