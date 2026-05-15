'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const supabase = createClient()
        
        // Exchange the code for a session
        const { data, error: authError } = await supabase.auth.exchangeCodeForSession(
          new URL(window.location.href).searchParams.get('code') || ''
        )

        if (authError) {
          setError(authError.message)
          return
        }

        if (data.session) {
          router.push('/')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        {error ? (
          <>
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="text-gray-600">{error}</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Confirming your email...</h1>
            <p className="text-gray-600">Please wait while we verify your account.</p>
          </>
        )}
      </div>
    </div>
  )
}
