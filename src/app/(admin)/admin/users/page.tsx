import { Users } from 'lucide-react'
import { PageHeading } from '~/components/page-heading'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { getAuthSession } from '~/lib/auth'
import { AdminUsersTable } from './_components/admin-users-table'

export default async function AdminUsersPage() {
  const authSession = await getAuthSession()

  if (!authSession) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Users"
        description="Review user accounts, search the directory, and ban or unban access."
        icon={Users}
      />

      <Card>
        <CardHeader>
          <CardTitle>User directory</CardTitle>
          <CardDescription>
            Search by name or email, filter by role and status, and manage bans
            from the action menu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminUsersTable currentUserId={authSession.user.id} />
        </CardContent>
      </Card>
    </div>
  )
}
