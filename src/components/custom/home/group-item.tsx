import { TreePalm, UsersRound } from "lucide-react"

import { cn } from "@/lib/utils"
import { Group } from "@/lib/types"

const cardStyles = [
    {
        background: "from-violet-400 via-violet-300 to-indigo-400",
        glow: "bg-violet-200/30",
    },
    {
        background: "from-sky-400 via-cyan-300 to-teal-400",
        glow: "bg-cyan-100/30",
    },
    {
        background: "from-rose-400 via-pink-400 to-red-400",
        glow: "bg-rose-100/30",
    },
    {
        background: "from-amber-400 via-orange-300 to-lime-400",
        glow: "bg-yellow-100/30",
    },
]

const GroupItem = ({
    data
}: {
    data: Group
}) => {
    const style = cardStyles[data.id % cardStyles.length]

    return (
        <article
            role="listitem"
            className={cn(
                "relative min-h-24 overflow-hidden rounded-md bg-linear-to-br p-4 text-white shadow-sm",
                style.background
            )}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_35%,rgba(255,255,255,0.32),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(0,0,0,0.12),transparent_30%)]" />
            <div className={cn("absolute -right-8 -top-10 size-28 rounded-full blur-2xl", style.glow)} />
            <div className="absolute inset-y-3 right-4 flex items-center opacity-15">
                <UsersRound className="size-24" strokeWidth={1.5} />
            </div>

            <div className="relative flex min-h-16 flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <TreePalm />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                        {/* <UsersRound className="size-4" /> */}
                        <span>{data.id + 2}</span> гишүүн
                    </div>
                </div>

                <div>
                    <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold leading-none">1,224,400</span>
                        <span className="pb-0.5 text-sm font-semibold opacity-90">₮</span>
                    </div>
                    <h3 className="mt-1 line-clamp-1 text-sm font-semibold leading-none">
                        {data.name}
                    </h3>
                    {/* <p className="mt-1 text-xs font-medium opacity-80">{data.date}</p> */}
                </div>
            </div>
        </article>
    )
}

export default GroupItem
