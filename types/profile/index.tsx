import { IconPasswordFingerprint, IconUser } from "@tabler/icons-react"
import {
  dashboardPrefix,
  profileMenu,
  passwordChangedMenu,
} from "@/types/dashboard-menu-list"

export const sidebarNavItems = [
  {
    title: "Profile",
    icon: <IconUser size={18} />,
    href: `${dashboardPrefix}/${profileMenu}`,
  },
  {
    title: "Security",
    icon: <IconPasswordFingerprint size={18} />,
    href: `${dashboardPrefix}/${profileMenu}/${passwordChangedMenu}`,
  },
]
