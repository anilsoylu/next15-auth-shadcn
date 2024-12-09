import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { panelText } from "@/lib/utils"

export async function generateMetadata() {
  return {
    title: {
      template: `%s | ${panelText}`,
      default: panelText,
    },
    robots: "noindex,nofollow",
  }
}

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-screen w-full flex flex-col gap-y-10 items-center justify-center">
        {children}
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default AuthLayout
