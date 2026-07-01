const withNextIntl = require('next-intl/plugin')();
module.exports = withNextIntl({
  reactStrictMode: true,
  output: 'standalone',       // obavezno
  // Projekat ima svoj package-lock.json, ali postoji i jedan u parent folderu
  // (builtwell-backend) — bez ovoga Next bira pogrešan "workspace root", što kvari
  // standalone pakovanje i pravi buku oko watch-a. Zakucavamo root na ovaj folder.
  outputFileTracingRoot: __dirname,
  // Next's standalone tracer doesn't reliably follow sharp's runtime
  // platform-detection require() calls, so the native binary can be left
  // out of .next/standalone — force-include it so image optimization
  // actually works (not just falls back silently) in production.
  outputFileTracingIncludes: {
    '/*': ['./node_modules/sharp/**/*', './node_modules/@img/**/*'],
  },
  images: { domains: ['images.unsplash.com','via.placeholder.com'], formats: ['image/webp','image/avif'] },
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  // Dev watcher hardening — folder je pod OneDrive-om koji stalno "dodiruje" fajlove
  // (menja mtime bez prave izmene). Bez ovoga svaki OneDrive sync okine recompile →
  // Fast Refresh → stranica se sama refreshuje. Ignorišemo šum i debounce-ujemo događaje.
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions || {}),
        aggregateTimeout: 600,
        ignored: ['**/.git/**', '**/node_modules/**', '**/.next/**'],
      };
    }
    return config;
  },
});