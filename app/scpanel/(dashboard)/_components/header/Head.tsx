"use client"

import { Search } from "@/components/search"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useUser } from "@/lib/auth"

const Head = () => {
  const { user } = useUser()
  const headText = user?.name || user?.userName || "Kullanıcı"

  return (
    <header className="max-w-3xl:container max-w-3xl:mx-auto">
      <div className="flex justify-between h-[60px] items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px]">
        <div className="flex items-center justify-center gap-3.5">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <Search />
          <Separator orientation="vertical" className="h-6" />
          <span className="text-xs md:text-lg max-md:hidden">
            {`Hoş Geldin, ${headText}`}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Head
