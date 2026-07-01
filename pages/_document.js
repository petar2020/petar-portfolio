// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    // Routes are pages/[locale]/..., so the locale is the first path segment.
    const locale = ctx.query?.locale === 'sr' ? 'sr' : 'en';
    return { ...initialProps, locale };
  }

  render() {
    const { locale } = this.props;
    return (
    <Html lang={locale} className="dark" style={{ backgroundColor: '#06100E' }}>
      <Head>
        {/* FOUC prevention — hide until stylesheet loads */}
        <style dangerouslySetInnerHTML={{ __html: 'html{opacity:0}' }} />

        {/* osnovni favikoni */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Apple & PWA */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#06100E" />

        {/* (opciono) Android ikone već su u manifestu; ostaju i ove dve za starije browsere */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    );
  }
}
