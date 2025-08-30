const withNextIntl = require('next-intl/plugin')();
module.exports = withNextIntl({
  reactStrictMode: true,
  output: 'standalone',       // obavezno
  images: { domains: ['images.unsplash.com','via.placeholder.com'], formats: ['image/webp','image/avif'] },
  compiler: { removeConsole: process.env.NODE_ENV === 'production' }
});