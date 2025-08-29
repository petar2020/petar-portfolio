// pages/_app.js
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { NextIntlClientProvider } from 'next-intl'

function MyApp({ Component, pageProps }) {
  // Read locale and messages from pageProps with safe fallbacks
  const locale = pageProps?.locale ?? 'sr';
  const messages = pageProps?.messages ?? {};
  
  return (
    <NextIntlClientProvider 
      locale={locale} 
      messages={messages} 
      timeZone="Europe/Belgrade"
    >
      <ThemeProvider attribute="class">
        <AnimatePresence exitBeforeEnter initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

export default MyApp