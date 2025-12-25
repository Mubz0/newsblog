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

  // For Docker/Azure deployment - use standalone output
  ...(process.env.DOCKER_BUILD && {
    output: 'standalone',
    images: {
      unoptimized: true
    },
  }),

  // For local development
  ...(!process.env.NETLIFY && !process.env.DOCKER_BUILD && {
    serverRuntimeConfig: {
      port: process.env.PORT || 3000,
    },
    publicRuntimeConfig: {
      port: process.env.PORT || 3000,
    },
  }),
}

module.exports = withMDX(nextConfig)
