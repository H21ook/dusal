import { LoginForm } from '@/components/auth/login-form'

export const metadata = {
    title: 'Sign In',
}

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full bg-background relative overflow-hidden">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: `
        radial-gradient(
          circle at center,
          rgba(59, 130, 246, 0.12) 0%,
          rgba(59, 130, 246, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
                }}
            />
            <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <LoginForm />
            </div>
        </div>
    )
}
