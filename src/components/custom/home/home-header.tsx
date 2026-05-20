"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from "@supabase/supabase-js"
import { Bell } from "lucide-react"

const HomeHeader = ({
    user
}: {
    user: User
}) => {
    const username = user.email?.split("@")[0] || "User"
    const fallback = username.slice(0, 2).toUpperCase()

    return (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-2xl supports-backdrop-filter:bg-background/60">
            <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                    <Avatar size="lg" className="shadow-sm">
                        <AvatarFallback className="bg-muted font-semibold">{fallback}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Сайн уу?</p>
                        <h1 className="truncate text-base font-semibold">{username}</h1>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-muted/70 shadow-sm hover:bg-muted"
                    aria-label="Мэдэгдэл"
                >
                    <Bell className="size-5" />
                </Button>
            </div>
        </header>
    )
}

export default HomeHeader
