import { TreePalm, UsersRound } from "lucide-react"

import { cn } from "@/lib/utils"
import { Group } from "@/lib/types"

const cardStyles = [

    {
        background: "from-blue-400 via-blue-500 to-cyan-400",
        glow: "bg-blue-100/30",
        text: "text-white"
    },
    {
        background: "from-indigo-500 via-purple-500 to-red-400",
        glow: "bg-indigo-100/30",
        text: "text-white"
    },
    {
        background: "from-emerald-500 via-green-400 to-emerald-300",
        glow: "bg-emerald-200/40",
        text: "text-white"
    },
    {
        background: "from-yellow-500 via-orange-400 to-amber-300",
        glow: "bg-yellow-100/40",
        text: "text-white"
    },
]

const GroupItem = ({
    data,
    index = 0
}: {
    data: Group,
    index: number
}) => {
    const style = cardStyles[index % cardStyles.length]

    return (
        <article
            role="listitem"
            className={cn(
                "relative min-h-24 overflow-hidden rounded-md bg-linear-to-br p-4 bg-muted shadow-sm",
                style.background,
                style.text
            )}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_35%,rgba(255,255,255,0.32),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(0,0,0,0.12),transparent_30%)]" />
            <div className={cn("absolute -right-8 -top-10 size-28 rounded-full blur-2xl", style.glow)} />
            <div className="absolute -bottom-2 right-4 flex items-center opacity-10">
                <UsersRound className="size-24" strokeWidth={1.5} />
            </div>

            <div className="relative flex min-h-16 flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <TreePalm />
                    </div>
                    <div className={cn("flex items-center gap-1.5 text-[10px] font-semibold rounded-full px-2 py-0.5 bg-background/20",)}>
                        {/* <UsersRound className="size-4" /> */}

                        <span>{data.memberCount}</span> гишүүн
                    </div>
                </div>

                <div>
                    <div className="flex items-end gap-1">
                        <span className="text-xl font-bold leading-none">{data.totalAmount}</span>
                        <span className="text-sm font-semibold">₮</span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm leading-none">
                        {data.name}
                    </p>
                    {/* <p className="mt-1 text-xs font-medium opacity-80">{data.date}</p> */}
                </div>
            </div>
        </article>
    )
}

export default GroupItem
