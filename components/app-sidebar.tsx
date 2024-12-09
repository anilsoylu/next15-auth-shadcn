"use client"
import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import {
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Command,
  User2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  contactlistMenu,
  dashboardPrefix,
  profileMenu,
} from "@/types/dashboard-menu-list"
import { useUser } from "@/lib/auth"
import { signOut } from "@/app/auth/login/actions"
import { menuItems, themes } from "@/types/dashboard-menu-items"
import { panelText } from "@/lib/utils"

export default function AppSidebar() {
  const { user, setUser } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const { setTheme } = useTheme()

  const handleItemClick = useCallback(
    (url: string) => {
      router.push(url)
      router.refresh()
    },
    [router]
  )

  async function handleSignOut() {
    setUser(null)
    await signOut()
    router.push("/")
  }

  return (
    <Sidebar className="bg-muted/40">
      <SidebarHeader className="font-bold uppercase min-h-[60px] flex flex-row cursor-default items-center justify-center gap-2 p-2'">
        <div className="flex size-6 items-center justify-center rounded-sm border">
          <Command className="size-4 shrink-0" />
        </div>
        {panelText}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{`General`}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={false}
                  className="group"
                >
                  <SidebarMenuItem>
                    {item.children ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            variant="default"
                            className="hover:no-underline justify-start"
                          >
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  className="w-full"
                                  onClick={() => handleItemClick(child.url)}
                                >
                                  <Button
                                    variant={
                                      pathname.endsWith(child.url)
                                        ? "secondary"
                                        : "link"
                                    }
                                    className="hover:no-underline justify-start"
                                  >
                                    {child.title}
                                  </Button>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        onClick={() => handleItemClick(item.url)}
                        className="hover:no-underline justify-start"
                      >
                        <Button
                          variant={
                            pathname.endsWith(item.url) ? "secondary" : "link"
                          }
                          className="flex items-center gap-2"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Button>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.userName}
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] dark:bg-muted/40"
              >
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() =>
                    router.push(`${dashboardPrefix}/${profileMenu}`)
                  }
                >
                  <span>{`Hesabım`}</span>
                </DropdownMenuItem>
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Tema</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {themes.map((theme) => (
                          <DropdownMenuItem
                            key={theme}
                            onClick={() => setTheme(theme)}
                          >
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => handleSignOut()}
                >
                  <span>{`Çıkış Yap`}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
