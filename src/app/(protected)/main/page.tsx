import { ProtectedRoute } from '@/components/auth/protected-route'
import { getCurrentUser } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LogoutButton from '@/components/auth/logout-button'

export const metadata = {
  title: 'Main',
}

export default async function MainPage() {
  const user = await getCurrentUser()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Link href="/">
              <Button variant="outline">Back Home</Button>
            </Link>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
            {user && (
              <div className="space-y-2">
                <p className="text-gray-600">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-600">
                  <strong>User ID:</strong> {user.id}
                </p>
                <p className="text-gray-600">
                  <strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}
                </p>
              </div>
            )}

            <LogoutButton />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
