const withMDX = require('@next/mdx')()

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

  // For Docker/Azure deployment - use standalone output
  ...(process.env.DOCKER_BUILD && {
    output: 'standalone',
    images: {
      unoptimized: true
    },
  }),

  // For local development
  ...(!process.env.DOCKER_BUILD && {
    serverRuntimeConfig: {
      port: process.env.PORT || 3000,
    },
    publicRuntimeConfig: {
      port: process.env.PORT || 3000,
    },
  }),
}

module.exports = withMDX(nextConfig)
