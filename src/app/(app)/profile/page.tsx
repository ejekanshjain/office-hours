import { redirect } from 'next/navigation'
import { env } from '~/env'
import { getAuthSession } from '~/lib/auth'
import { ProfilePageClient } from './_components/profile-page-client'

export default async function ProfilePage() {
  const authSession = await getAuthSession()

  if (!authSession) {
    return redirect('/login')
  }

  return (
    <ProfilePageClient
      apiBaseUrl={env.BETTER_AUTH_URL}
      user={{
        name: authSession.user.name,
        email: authSession.user.email
      }}
    />
  )
}
