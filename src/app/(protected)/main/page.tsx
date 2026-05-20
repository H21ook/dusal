import { getCurrentUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { ArrowDownLeft, ArrowUpRight, ReceiptText } from 'lucide-react'

import HomeHeader from '@/components/custom/home/home-header'
import { Group } from '@/lib/types'
import { ItemGroup } from '@/components/ui/item'
import GroupItem from '@/components/custom/home/group-item'
import ProtectedPage from '@/components/custom/protected-page'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Main',
}

const groupsData: Group[] = [
  {
    id: 1,
    name: 'Хөвсгөл аялал',
    date: '2026-05-23',
  },
  {
    id: 2,
    name: 'Baynaa HBD',
    date: '2026-04-03',
  },
  {
    id: 3,
    name: 'Friends уулзалт',
    date: '2026-02-10',
  }
]

export default async function MainPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <ProtectedPage header={<HomeHeader user={user} />}>
      <main className="mx-auto flex max-w-lg flex-col gap-5 px-4 py-4">
        <section>
          <div className="mb-3">
            <h2 className="text-base font-semibold">Тооцоо</h2>
            <p className="text-xs text-muted-foreground">Авлага болон өглөгийн товч мэдээлэл</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border bg-card p-4">
              <div className="mb-4 flex size-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <ArrowDownLeft className="size-5" />
              </div>
              <p className="text-xs text-muted-foreground">Авлага</p>
              <p className="mt-1 text-2xl font-bold">0₮</p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <div className="mb-4 flex size-9 items-center justify-center rounded-full bg-red-500/10 text-red-600">
                <ArrowUpRight className="size-5" />
              </div>
              <p className="text-xs text-muted-foreground">Өглөг</p>
              <p className="mt-1 text-2xl font-bold">0₮</p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Groups</h2>
              <p className="text-xs text-muted-foreground">Идэвхтэй тооцоонууд</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">
              Бүгд
            </Button>
          </div>

          <ItemGroup className="gap-3">
            {groupsData.map(group => (<GroupItem key={group.id} data={group} />))}
          </ItemGroup>
        </section>

        <section className="rounded-md border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-muted">
              <ReceiptText className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold">Сүүлийн гүйлгээ</h2>
              <p className="text-xs text-muted-foreground">Одоогоор бүртгэл алга</p>
            </div>
          </div>
        </section>
      </main>
    </ProtectedPage>
  )
}
