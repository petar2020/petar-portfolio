const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    // Remove optimizeCss to avoid critters dependency
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
});