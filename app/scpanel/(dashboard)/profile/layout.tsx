import SidebarNav from "@/components/sidebar-nav"
import { Separator } from "@/components/ui/separator"
import { sidebarNavItems } from "@/types/profile"

const ProfileDashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and set password preferences.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-2 md:space-y-2 overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full p-1 pr-4 overflow-y-hidden">{children}</div>
      </div>
    </>
  )
}

export default ProfileDashboardLayout
