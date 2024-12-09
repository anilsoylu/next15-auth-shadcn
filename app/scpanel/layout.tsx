import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { SearchProvider } from "@/context/search-context"
import { UserProvider } from "@/lib/auth"
import { getUser } from "@/lib/db/queries"
import { panelText } from "@/lib/utils"
import { StrictMode } from "react"

export async function generateMetadata() {
  return {
    title: {
      template: `%s | ${panelText}`,
      default: panelText,
    },
    robots: "noindex,nofollow",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let userPromise = getUser()

  return (
    <StrictMode>
      <UserProvider userPromise={userPromise}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
        >
          <SidebarProvider>
            <SearchProvider>
              {children}
              <Toaster />
            </SearchProvider>
          </SidebarProvider>
        </ThemeProvider>
      </UserProvider>
    </StrictMode>
  )
}
