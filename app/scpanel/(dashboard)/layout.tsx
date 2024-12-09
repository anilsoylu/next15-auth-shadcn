"use client"
import { BlockProvider } from "@/context/block-context"
import Head from "./_components/header/Head"
import { useUser } from "@/lib/auth"
import AppSidebar from "@/components/app-sidebar"

const CrmDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()

  if (user && !user.isActivated) {
    return (
      <div className="w-full min-h-screen flex justify-center flex-col gap-4 items-center bg-destructive">
        <h1 className="text-xl font-semibold uppercase text-center">
          {`Üyeliğiniz Pasif Duruma Getirilmiştir`}
        </h1>
        <p className="text-base text-center">
          {`Hesabınız geçici olarak devre dışı bırakılmıştır. Daha fazla bilgi için lütfen şirket yetkilisi veya teknik destek birimi ile iletişime geçiniz.`}
        </p>
      </div>
    )
  }

  return (
    <BlockProvider>
      <AppSidebar />
      <main className="w-full relative flex flex-col">
        <Head />
        <div className="flex-1 p-4 h-full">{children}</div>
      </main>
    </BlockProvider>
  )
}

export default CrmDashboardLayout
