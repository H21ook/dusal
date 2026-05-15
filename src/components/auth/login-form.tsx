'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Eye, EyeClosed } from 'lucide-react'

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const result = await signIn(email, password)

            if (result?.success) {
                router.replace('/main')
            } else {
                setError(result?.error || "")
            }
        } catch (err) {
            console.log("wtf ", err)
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            {/* <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <p className="text-gray-500">Enter your credentials to access your account</p>
            </div> */}
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                        {error && (
                            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}


                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    type="email"
                                    required
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link
                                        href="/auth/forgot-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <InputGroup>
                                    <InputGroupInput
                                        id="password"
                                        type={isShowPassword ? "text" : "password"}
                                        required
                                        autoComplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            aria-label={isShowPassword ? "Hide password" : "Show password"}
                                            title={isShowPassword ? "Hide password" : "Show password"}
                                            size="icon-xs"
                                            onClick={() => {
                                                setIsShowPassword(prev => !prev)
                                            }}
                                        >
                                            {isShowPassword ? <EyeClosed /> : <Eye />}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>

                            <Field>
                                <Button disabled={loading} type="submit">Login</Button>
                                <Button disabled={loading} variant="outline" type="button">
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}
