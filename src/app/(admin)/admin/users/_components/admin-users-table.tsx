'use client'

import { useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { Ban, Loader2, MoreHorizontal, Undo2 } from 'lucide-react'
import {
  parseAsInteger,
  parseAsJson,
  parseAsString,
  useQueryStates
} from 'nuqs'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { DataTable } from '~/components/data-table'
import { SortOrderEnum } from '~/components/data-table/enum'
import { LocalizedDateTime } from '~/components/localized-date-time'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Textarea } from '~/components/ui/textarea'
import {
  useSafeActionMutation,
  useSafeActionQuery
} from '~/lib/safe-action-client'
import {
  banAdminUserAction,
  getAdminUsersAction,
  unbanAdminUserAction
} from '../../../actions/users'

type AdminUser = {
  id: string
  name: string
  email: string
  image: string | null
  role: string | null
  banned: boolean | null
  banReason: string | null
  banExpires: Date | null
  createdAt: Date
  updatedAt: Date
}

type AdminUsersTableProps = {
  currentUserId: string
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || 'U'

function AdminUserActions({
  user,
  currentUserId
}: {
  user: AdminUser
  currentUserId: string
}) {
  const queryClient = useQueryClient()
  const [banDialogOpen, setBanDialogOpen] = useState(false)
  const [banReason, setBanReason] = useState('')

  const banMutation = useSafeActionMutation(banAdminUserAction, {
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success('User banned')
      setBanDialogOpen(false)
      setBanReason('')
    },
    onError: error => {
      toast.error(error.message || 'Failed to ban user')
    }
  })

  const unbanMutation = useSafeActionMutation(unbanAdminUserAction, {
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success('User unbanned')
    },
    onError: error => {
      toast.error(error.message || 'Failed to unban user')
    }
  })

  const isSelf = user.id === currentUserId
  const isPending = banMutation.isPending || unbanMutation.isPending

  return (
    <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" disabled={isPending}>
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <MoreHorizontal />
            )}
            <span className="sr-only">Open user actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user.banned ? (
            <DropdownMenuItem
              onSelect={() => unbanMutation.mutate({ userId: user.id })}
            >
              <Undo2 />
              Unban user
            </DropdownMenuItem>
          ) : (
            <DialogTrigger asChild>
              <DropdownMenuItem disabled={isSelf}>
                <Ban />
                Ban user
              </DropdownMenuItem>
            </DialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ban {user.name}</DialogTitle>
          <DialogDescription>
            This immediately revokes active sessions and prevents the user from
            signing in.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={banReason}
          onChange={event => setBanReason(event.target.value)}
          placeholder="Reason for the ban"
          maxLength={240}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={banMutation.isPending}
            onClick={() =>
              banMutation.mutate({
                userId: user.id,
                banReason: banReason || undefined
              })
            }
          >
            {banMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Ban />
            )}
            Ban user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function AdminUsersTable({ currentUserId }: AdminUsersTableProps) {
  const [queryState, setQueryState] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    sortBy: parseAsString.withDefault('createdAt'),
    sortOrder: parseAsString.withDefault(SortOrderEnum.DESC),
    search: parseAsString.withDefault(''),
    filters: parseAsJson(v => v as Record<string, (string | boolean)[]>)
  })

  const input = {
    page: queryState.page,
    limit: queryState.limit,
    sortBy: queryState.sortBy,
    sortOrder:
      queryState.sortOrder === SortOrderEnum.ASC
        ? SortOrderEnum.ASC
        : SortOrderEnum.DESC,
    search: queryState.search || undefined,
    filters: queryState.filters ?? undefined
  }

  const { data, isPending } = useSafeActionQuery(
    'admin-users',
    getAdminUsersAction,
    input
  )

  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'User',
        cell: ({ row }) => (
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="size-8">
              <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
              {row.original.image ? (
                <AvatarImage src={row.original.image} alt={row.original.name} />
              ) : null}
            </Avatar>
            <div className="min-w-0">
              <div className="truncate font-medium">{row.original.name}</div>
              <div className="text-muted-foreground truncate text-xs">
                {row.original.email}
              </div>
            </div>
          </div>
        )
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
          <Badge
            variant={row.original.role === 'admin' ? 'default' : 'outline'}
          >
            {row.original.role === 'admin' ? 'Admin' : 'User'}
          </Badge>
        )
      },
      {
        accessorKey: 'banned',
        header: 'Status',
        cell: ({ row }) =>
          row.original.banned ? (
            <div className="flex flex-col gap-1">
              <Badge variant="destructive">Banned</Badge>
              {row.original.banReason ? (
                <span className="text-muted-foreground max-w-48 truncate text-xs">
                  {row.original.banReason}
                </span>
              ) : null}
            </div>
          ) : (
            <Badge variant="secondary">Active</Badge>
          )
      },
      {
        accessorKey: 'createdAt',
        header: 'Joined',
        cell: ({ row }) => (
          <LocalizedDateTime
            date={row.original.createdAt}
            options={{ time: true }}
          />
        )
      },
      {
        id: 'actions',
        header: '',
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <div className="flex justify-end">
            <AdminUserActions
              user={row.original}
              currentUserId={currentUserId}
            />
          </div>
        )
      }
    ],
    [currentUserId]
  )

  const filters = useMemo(
    () => [
      {
        id: 'banned',
        label: 'Status',
        options: [
          { label: 'Active', value: false },
          { label: 'Banned', value: true }
        ]
      },
      {
        id: 'role',
        label: 'Role',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' }
        ]
      }
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data?.rows ?? []}
      isLoading={isPending}
      enableSearch
      searchPlaceholder="Search users..."
      initialSearch={queryState.search}
      totalCount={data?.totalCount ?? 0}
      manualPagination
      manualSorting
      pageIndex={queryState.page - 1}
      pageSize={queryState.limit}
      initialSorting={[
        {
          id: queryState.sortBy,
          desc: queryState.sortOrder !== SortOrderEnum.ASC
        }
      ]}
      filters={filters}
      activeFilters={queryState.filters ?? {}}
      onParamsChange={params => {
        void setQueryState({
          page: params.page,
          limit: params.limit,
          sortBy: params.sortBy ?? 'createdAt',
          sortOrder:
            params.sortOrder === SortOrderEnum.ASC
              ? SortOrderEnum.ASC
              : SortOrderEnum.DESC,
          search: params.search ?? null,
          filters: params.filters ?? null
        })
      }}
    />
  )
}
