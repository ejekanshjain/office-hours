'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
  parseAsInteger,
  parseAsJson,
  parseAsString,
  useQueryStates
} from 'nuqs'
import { useMemo } from 'react'
import { DataTable } from '~/components/data-table'
import { SortOrderEnum } from '~/components/data-table/enum'
import { Badge } from '~/components/ui/badge'
import { formatDate } from '~/lib/format-date'
import { useSafeActionQuery } from '~/lib/safe-action-client'
import {
  getTrackingLogTagsAction,
  getTrackingLogsAction
} from '../../actions/tracking-logs'

type TrackingLog = {
  id: string
  tag: string | null
  type: 'check_in' | 'check_out'
  timestamp: Date
}

const columns: ColumnDef<TrackingLog>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    enableSorting: false,
    cell: ({ row }) => (
      <Badge
        variant={row.original.type === 'check_in' ? 'default' : 'secondary'}
      >
        {row.original.type === 'check_in' ? 'Check in' : 'Check out'}
      </Badge>
    )
  },
  {
    accessorKey: 'tag',
    header: 'Tag',
    enableSorting: false,
    cell: ({ row }) => row.original.tag || '—'
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => formatDate(row.original.timestamp, { time: true })
  }
]

export function TrackingLogsTable() {
  const [queryState, setQueryState] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    sortOrder: parseAsString.withDefault(SortOrderEnum.DESC),
    filters: parseAsJson(v => v as Record<string, (string | boolean)[]>)
  })

  const input = {
    page: queryState.page,
    limit: queryState.limit,
    sortOrder:
      queryState.sortOrder === SortOrderEnum.ASC
        ? SortOrderEnum.ASC
        : SortOrderEnum.DESC,
    filters: queryState.filters ?? undefined
  }

  const { data, isPending } = useSafeActionQuery(
    'tracking-logs',
    getTrackingLogsAction,
    input
  )

  const { data: tagOptions } = useSafeActionQuery(
    'tracking-log-tags',
    getTrackingLogTagsAction,
    {}
  )

  const filters = useMemo(
    () => [
      {
        id: 'type',
        label: 'Type',
        options: [
          { label: 'Check in', value: 'check_in' },
          { label: 'Check out', value: 'check_out' }
        ]
      },
      ...(tagOptions?.length
        ? [
            {
              id: 'tag',
              label: 'Tag',
              options: tagOptions
            }
          ]
        : [])
    ],
    [tagOptions]
  )

  return (
    <DataTable
      columns={columns}
      data={data?.rows ?? []}
      isLoading={isPending}
      totalCount={data?.totalCount ?? 0}
      manualPagination
      manualSorting
      pageIndex={queryState.page - 1}
      pageSize={queryState.limit}
      initialSorting={[
        {
          id: 'timestamp',
          desc: queryState.sortOrder !== SortOrderEnum.ASC
        }
      ]}
      filters={filters}
      activeFilters={queryState.filters ?? {}}
      onParamsChange={params => {
        void setQueryState({
          page: params.page,
          limit: params.limit,
          sortOrder:
            params.sortOrder === SortOrderEnum.ASC
              ? SortOrderEnum.ASC
              : SortOrderEnum.DESC,
          filters: params.filters ?? null
        })
      }}
    />
  )
}
