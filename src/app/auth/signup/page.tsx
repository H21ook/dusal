import { SignUpForm } from '@/components/auth/signup-form'

export const metadata = {
  title: 'Sign Up',
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignUpForm />
    </div>
  )
}
