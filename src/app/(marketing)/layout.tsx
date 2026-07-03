import { SiteFooter } from '~/components/site-footer'
import { SiteHeader } from '~/components/site-header'
import { getAuthSession } from '~/lib/auth'

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const authSession = await getAuthSession()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        user={
          authSession
            ? {
                name: authSession.user.name,
                email: authSession.user.email
              }
            : null
        }
      />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
