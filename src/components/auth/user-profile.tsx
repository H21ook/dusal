'use client'

import { useAuthContext } from '@/components/contexts/auth-context'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function UserProfile() {
  const { user, loading, signOut } = useAuthContext()

  if (loading) {
    return <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link href="/auth/login">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button size="sm">
            Sign Up
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <p className="font-medium">{user.email}</p>
      </div>
      <Button
        onClick={signOut}
        variant="outline"
        size="sm"
      >
        Sign Out
      </Button>
    </div>
  )
}
