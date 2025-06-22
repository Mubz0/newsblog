const withMDX = require('@next/mdx')()

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  
  // For Netlify deployment - use static export
  ...(process.env.NETLIFY && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    },
    assetPrefix: 'https://newsletter.scylax.ai',
  }),
  
  // For local development
  ...(!process.env.NETLIFY && {
    serverRuntimeConfig: {
      port: process.env.PORT || 3000,
    },
    publicRuntimeConfig: {
      port: process.env.PORT || 3000,
    },
  }),
}

module.exports = withMDX(nextConfig)