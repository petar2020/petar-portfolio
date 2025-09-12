// pages/_app.js
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { NextIntlClientProvider } from 'next-intl'
import { SpeedInsights } from '@vercel/speed-insights/next'  

function MyApp({ Component, pageProps }) {
  const locale = pageProps?.locale ?? 'sr'
  const messages = pageProps?.messages ?? {}

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Belgrade">
      <ThemeProvider attribute="class">
        <AnimatePresence /* mode="wait" u FM v5 umesto exitBeforeEnter */ exitBeforeEnter initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
        <SpeedInsights /> {/* ⬅️ dodato */}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

export default MyApp
