import { Home, Inbox } from "lucide-react"
import { contactlistMenu, dashboardPrefix } from "./dashboard-menu-list"

export const themes = ["system", "light", "dark"]

export const menuItems = [
  {
    title: "Home",
    url: dashboardPrefix,
    icon: Home,
  },
  {
    title: "Forms",
    url: `${dashboardPrefix}/${contactlistMenu}`,
    icon: Inbox,
    children: [
      {
        title: "Contact Form",
        url: `${dashboardPrefix}/${contactlistMenu}`,
      },
    ],
  },
]
