"use client"

import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

const Header = ({
    actions,
    showBack = true,
    title
}: {
    actions?: ReactNode,
    showBack?: boolean,
    title?: string
}) => {
    const router = useRouter()

    return (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-2xl supports-backdrop-filter:bg-background/60">
            <div className="mx-auto grid h-16 max-w-lg grid-cols-[3rem_1fr_3rem] items-center gap-2 px-4">
                <div className="flex items-center justify-start">
                    {showBack ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-muted/70 shadow-sm hover:bg-muted"
                            aria-label="Буцах"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="size-5" />
                        </Button>
                    ) : null}
                </div>

                <h1 className="truncate text-center text-sm font-semibold">
                    {title}
                </h1>

                <div className="flex items-center justify-end">
                    {actions}
                </div>
            </div>
        </header>
    )
}

export default Header
