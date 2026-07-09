import { desc, sql } from 'drizzle-orm'
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  UserX,
  Users
} from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { LocalizedDateTime } from '~/components/localized-date-time'
import { PageHeading } from '~/components/page-heading'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import { db } from '~/db'
import { trackingLogsTable, usersTable } from '~/db/schema'

export default async function AdminPage() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [userStatsResult, activityStatsResult, recentUsers] = await Promise.all(
    [
      db
        .select({
          total: sql<number>`count(*)::int`,
          admins: sql<number>`count(*) filter (where ${usersTable.role} = 'admin')::int`,
          banned: sql<number>`count(*) filter (where ${usersTable.banned} = true)::int`
        })
        .from(usersTable),
      db
        .select({
          totalLogs: sql<number>`count(*)::int`,
          todayLogs: sql<number>`count(*) filter (where ${trackingLogsTable.timestamp} >= ${today})::int`
        })
        .from(trackingLogsTable),
      db
        .select({
          id: usersTable.id,
          name: usersTable.name,
          email: usersTable.email,
          role: usersTable.role,
          banned: usersTable.banned,
          createdAt: usersTable.createdAt
        })
        .from(usersTable)
        .orderBy(desc(usersTable.createdAt))
        .limit(5)
    ]
  )

  const userStats = userStatsResult[0]
  const activityStats = activityStatsResult[0]
  const activeUsers = Math.max(
    (userStats?.total ?? 0) - (userStats?.banned ?? 0),
    0
  )

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Admin dashboard"
        description="Monitor users, account access, and system-wide tracking activity."
        icon={ShieldCheck}
      >
        <Button asChild size="sm">
          <Link href="/admin/users">
            Manage users
            <ArrowRight />
          </Link>
        </Button>
      </PageHeading>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total users"
          value={userStats?.total ?? 0}
          description="All registered accounts"
          icon={Users}
        />
        <MetricCard
          title="Active users"
          value={activeUsers}
          description="Users without an active ban"
          icon={UserCheck}
        />
        <MetricCard
          title="Banned users"
          value={userStats?.banned ?? 0}
          description="Accounts blocked from access"
          icon={UserX}
        />
        <MetricCard
          title="Logs today"
          value={activityStats?.todayLogs ?? 0}
          description={`${(activityStats?.totalLogs ?? 0).toLocaleString()} total logs`}
          icon={Activity}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent users</CardTitle>
          <CardDescription>
            Latest accounts created across the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="min-w-0">
                        <div className="truncate font-medium">{user.name}</div>
                        <div className="text-muted-foreground truncate text-xs">
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === 'admin' ? 'default' : 'outline'}
                      >
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.banned ? 'destructive' : 'secondary'}
                      >
                        {user.banned ? 'Banned' : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right">
                      <LocalizedDateTime
                        date={user.createdAt}
                        options={{ time: true }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-muted-foreground flex min-h-40 items-center justify-center rounded-md border border-dashed text-sm">
              No users yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon
}: {
  title: string
  value: number
  description: string
  icon: FC<{ className?: string }>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground size-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  )
}
