// pages/index.jsx
export default function Index() {
  return null; // neće se nikad renderovati jer radimo SSR redirect
}

export async function getServerSideProps({ locale, req }) {
  // ako Next već prosledi locale (preko middleware-a/intl), koristi ga
  if (locale) {
    return {
      redirect: { destination: `/${locale}`, permanent: false },
    };
  }

  // fallback: pogodi iz Accept-Language header-a (English is the default)
  const header = req.headers['accept-language'] || '';
  const pref = header.toLowerCase().startsWith('sr') ? 'sr' : 'en';

  return {
    redirect: { destination: `/${pref}`, permanent: false },
  };
}
