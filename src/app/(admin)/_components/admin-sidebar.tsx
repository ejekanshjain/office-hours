'use client'

import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { NavigationSidebar } from '~/components/navigation-sidebar'
import { getAdminNavigation } from '~/lib/app-navigation'

export function AdminSidebar() {
  return (
    <NavigationSidebar
      groups={getAdminNavigation()}
      header={
        <Link
          href="/admin"
          className="flex h-10 items-center gap-2 px-2 text-sm font-semibold transition-opacity group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 hover:opacity-80"
        >
          <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
            <ShieldCheck className="text-primary size-4" />
          </div>
          <span className="truncate group-data-[collapsible=icon]:hidden">
            Admin
          </span>
        </Link>
      }
    />
  )
}
