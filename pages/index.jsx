// pages/index.jsx - Redirect to default locale
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to Serbian locale (default)
    router.replace('/sr')
  }, [router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-white mt-4 text-lg">Redirecting...</p>
      </div>
    </div>
  )
}

// Server-side redirect
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/sr',
      permanent: false,
    },
  }
}
