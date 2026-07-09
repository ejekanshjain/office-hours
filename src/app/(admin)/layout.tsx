import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { DashboardHeader } from '~/components/dashboard-header'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import { TooltipProvider } from '~/components/ui/tooltip'
import { getAuthSession } from '~/lib/auth'
import { AdminSidebar } from './_components/admin-sidebar'

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const authSession = await getAuthSession()

  if (!authSession?.isAdmin) {
    return notFound()
  }

  const cookieStore = await cookies()
  const sidebarStateCookie = cookieStore.get('sidebar_state')?.value
  const defaultOpen = sidebarStateCookie !== 'false'

  return (
    <TooltipProvider>
      <NuqsAdapter>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AdminSidebar />
          <SidebarInset>
            <DashboardHeader
              user={{
                name: authSession.user.name,
                email: authSession.user.email,
                image: authSession.user.image
              }}
            />
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </NuqsAdapter>
    </TooltipProvider>
  )
}
