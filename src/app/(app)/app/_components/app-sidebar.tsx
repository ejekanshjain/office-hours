'use client'

import { NavigationSidebar } from '~/components/navigation-sidebar'
import { getAppNavigation } from '~/lib/app-navigation'

export function AppSidebar() {
  return (
    <NavigationSidebar
      groups={getAppNavigation()}
      header={
        <div className="flex h-10 items-center px-2 text-sm font-semibold">
          Office Hours
        </div>
      }
    />
  )
}
