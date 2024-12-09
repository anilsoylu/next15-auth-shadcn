"use client"
import React from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

import {
  IconArrowRightDashed,
  IconDeviceLaptop,
  IconMoon,
  IconSun,
} from "@tabler/icons-react"
import { useSearch } from "@/context/search-context"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  contactlistMenu,
  dashboardPrefix,
  profileMenu,
} from "@/types/dashboard-menu-list"

export function CommandMenu() {
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()
  const router = useRouter()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <ScrollArea type="hover" className="h-72 pr-1">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          <CommandGroup heading="General">
            <CommandItem
              value="Dashboard"
              onSelect={() => {
                runCommand(() => router.push(dashboardPrefix))
              }}
            >
              <div className="mr-2 flex h-4 w-4 items-center justify-center">
                <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
              </div>
              {`Dashboard`}
            </CommandItem>
            <CommandItem
              value="Contact Form"
              onSelect={() => {
                runCommand(() =>
                  router.push(`${dashboardPrefix}/${contactlistMenu}`)
                )
              }}
            >
              <div className="mr-2 flex h-4 w-4 items-center justify-center">
                <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
              </div>
              {`Contact Form`}
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Other">
            <CommandItem
              value="Profile"
              onSelect={() => {
                runCommand(() =>
                  router.push(`${dashboardPrefix}/${profileMenu}`)
                )
              }}
            >
              <div className="mr-2 flex h-4 w-4 items-center justify-center">
                <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
              </div>
              {`Profile`}
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <IconDeviceLaptop />
              <span>System</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <IconSun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <IconMoon className="scale-90" />
              <span>Dark</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
