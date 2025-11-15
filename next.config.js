/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Suppress hydration warnings for expected differences
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Allow build to continue with ESLint warnings (errors will still fail)
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Production optimizations
  swcMinify: true,
  compress: true,
}

module.exports = nextConfig
