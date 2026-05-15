import { LoginForm } from '@/components/auth/login-form'

export const metadata = {
  title: 'Sign In',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  )
}
