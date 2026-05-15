'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/actions/auth'

export default function LogoutButton() {
    const [loading, setLoading] = useState(false)

    const handleSignOut = async () => {
        setLoading(true)
        try {
            await signOut()
        } catch (err) {
            console.error('Error signing out:', err)
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
