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
    category?: string
  }
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Link href={`/posts/${post.slug}`} className="block h-full group">
      <article className={`
        relative h-full flex flex-col overflow-hidden rounded-2xl
        border border-white/10 backdrop-blur-sm
        transition-all duration-500 ease-out
        hover:border-scylax-cyan/30
        hover:shadow-[0_8px_40px_rgba(0,240,255,0.15)]
        hover:-translate-y-1
        ${featured ? 'bg-white/[0.08]' : 'bg-white/[0.05]'}
      `}>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-scylax-cyan/5 via-transparent to-scylax-purple/5" />
        </div>

        {/* Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-scylax-cyan/20 via-scylax-purple/10 to-scylax-pink/20" />
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-scylax-cyan/20 blur-2xl rounded-full" />
                <svg className="relative w-20 h-20 text-scylax-cyan/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          )}

          {/* Category Badge */}
          {post.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider
                text-scylax-cyan border border-scylax-cyan/30 bg-scylax-cyan/10 backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-scylax-darker via-transparent to-transparent" />
        </div>

        {/* Content Section */}
        <div className="relative p-6 space-y-4 flex-grow flex flex-col">
          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-white/50">
            <span className="font-medium">{formatDate(post.date)}</span>
            {post.readingTime && (
              <span className="flex items-center space-x-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readingTime}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-bold text-white group-hover:text-scylax-cyan transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-white/60 line-clamp-3 flex-grow leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Section */}
          {post.author && (
            <div className="pt-4 flex items-center space-x-3 border-t border-white/10 mt-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-scylax-cyan blur-lg opacity-30" />
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                     style={{ background: 'linear-gradient(135deg, #00f0ff, #7b2cff)' }}>
                  {post.author.charAt(0).toUpperCase()}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{post.author}</p>
                <p className="text-xs text-white/40">Author</p>
              </div>
            </div>
          )}

          {/* Read More Arrow */}
          <div className="flex items-center text-scylax-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
            <span>Read article</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
