import { Clock, History, UserCog } from 'lucide-react'
import type { SidebarNavGroup } from '~/components/navigation-sidebar'

export const getAppNavigation = (): SidebarNavGroup[] => [
  {
    label: 'Workspace',
    items: [
      {
        title: 'Tracking logs',
        url: '/app',
        icon: History,
        exact: true
      },
      {
        title: 'Manual entry',
        url: '/app/manual',
        icon: Clock
      },
      {
        title: 'Profile',
        url: '/profile',
        icon: UserCog
      }
    ]
  }
]
