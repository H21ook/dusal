'use client'

import { useState } from 'react'
import { useAuthContext } from '@/components/contexts/auth-context'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const { signOut } = useAuthContext()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleSignOut} disabled={loading} className="ml-2">
      {loading ? 'Signing out...' : 'Sign out'}
    </Button>
  )
}
