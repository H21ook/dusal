'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardContent,
} from "@/components/ui/card"

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Eye, EyeClosed, Lock, Mail } from 'lucide-react'

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


            <div className='flex flex-col items-center text-center'>
                <div className='size-16 rounded-lg bg-amber-200 mb-4'>

                </div>
                <h1 className='text-2xl font-semibold tracking-tight'>Нэвтрэх</h1>
                <p className='text-sm text-muted-foreground'>Нэвтрэх мэдээллээ оруулна уу.</p>
            </div>

            <Card className="w-full bg-clip-padding backdrop-filter backdrop-blur bg-card/40 ring-0 shadow-md">

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                        {error && (
                            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}


                        <FieldGroup>
                            <Field className='gap-2'>
                                <FieldLabel htmlFor="email">И-мэйл</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <Mail />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        type="email"
                                        required
                                        className='text-sm'
                                        autoComplete="off"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="И-мэйл хаяг оруулна уу"
                                    />
                                </InputGroup>
                            </Field>

                            <Field className='gap-2'>
                                <FieldLabel htmlFor="password">Нууц үг</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <Lock />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="password"
                                        className='text-sm'
                                        type={isShowPassword ? "text" : "password"}
                                        required
                                        placeholder='Нууц үг оруулна уу'
                                        autoComplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            aria-label={isShowPassword ? "Нууц үг нуух" : "Нууц үг харах"}
                                            title={isShowPassword ? "Нууц үг нуух" : "Нууц үг харах"}
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

                            <Field className='gap-2'>
                                <div className="flex items-center">
                                    <div></div>
                                    <Link
                                        href="/auth/forgot-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-primary"
                                    >
                                        Нууц үг мартсан
                                    </Link>
                                </div>
                                <Button disabled={loading} className='rounded-lg' size="lg" type="submit">Нэвтрэх</Button>

                                <FieldSeparator className='my-2'>
                                    эсвэл
                                </FieldSeparator>

                                <Button disabled={loading} className='rounded-lg' size="lg" variant="outline" type="button">
                                    Google-ээр нэвтрэх
                                </Button>
                                <FieldDescription className="text-center text-sm">
                                    Бүртгэлгүй юу? &nbsp; <Link className='text-primary no-underline!' href="/auth/signup">Бүртгүүлэх</Link>
                                </FieldDescription>
                            </Field>

                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}
