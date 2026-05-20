"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CircleUserRound, FileChartColumn, Home, UsersRound } from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  {
    label: "Home",
    href: "/main",
    icon: Home,
  },
  {
    label: "Groups",
    href: "/groups",
    icon: UsersRound,
  },
  {
    label: "Report",
    href: "/report",
    icon: FileChartColumn,
  },
  {
    label: "Account",
    href: "/account",
    icon: CircleUserRound,
  },
]

const BottomNavigation = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
      <div className="mx-auto grid max-w-sm grid-cols-4 gap-1 rounded-[2rem] border bg-background/90 p-2 backdrop-blur-2xl shadow-lg supports-backdrop-filter:bg-background/75">
        {items.map((item) => {
          const Icon = item.icon
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex flex-col items-center justify-center gap-0.5 rounded-[1.5rem] px-2 text-[11px] font-medium text-muted-foreground transition-all",
                "active:scale-[0.97]",
                active ? "text-primary" : "hover:text-primary"
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full transition-all"
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.4 : 2} />
              </span>
              <span className={cn("leading-none", active && "font-semibold")}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation
