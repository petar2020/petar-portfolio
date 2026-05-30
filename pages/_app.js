// pages/_app.js
import '../styles/globals.css'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { NextIntlClientProvider } from 'next-intl'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Typographic identity — self-hosted at build (no runtime request).
const display = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-mono',
})

function MyApp({ Component, pageProps }) {
  const locale = pageProps?.locale ?? 'en'
  const messages = pageProps?.messages ?? {}

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Belgrade">
      {/* Dark-only "ink" control surface — no light theme. */}
      <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false}>
        <div className={`${display.variable} ${mono.variable} font-sans`}>
          <AnimatePresence exitBeforeEnter initial={false}>
            <Component {...pageProps} />
          </AnimatePresence>
        </div>
        <SpeedInsights />
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

export default MyApp
