'use client'

import { BriefcaseBusiness } from 'lucide-react'
import Link from 'next/link'
import { NavigationSidebar } from '~/components/navigation-sidebar'
import { getAppNavigation } from '~/lib/app-navigation'

export function AppSidebar() {
  return (
    <NavigationSidebar
      groups={getAppNavigation()}
      header={
        <Link
          href="/app"
          className="flex h-10 items-center gap-2 px-2 text-sm font-semibold transition-opacity hover:opacity-80 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
            <BriefcaseBusiness className="text-primary size-4" />
          </div>
          <span className="truncate group-data-[collapsible=icon]:hidden">
            Office Hours
          </span>
        </Link>
      }
    />
  )
}
