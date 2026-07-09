import {
  Blocks,
  Clock,
  History,
  KeyRound,
  LayoutDashboard,
  UserCog,
  Users
} from 'lucide-react'
import type { SidebarNavGroup } from '~/components/navigation-sidebar'

export const getAppNavigation = (): SidebarNavGroup[] => [
  {
    label: 'Workspace',
    items: [
      {
        title: 'Dashboard',
        url: '/app',
        icon: LayoutDashboard,
        exact: true
      },
      {
        title: 'Tracking logs',
        url: '/app/tracking-logs',
        icon: History
      },
      {
        title: 'Manual entry',
        url: '/app/manual',
        icon: Clock
      },
      {
        title: 'API keys',
        url: '/api-keys',
        icon: KeyRound
      },
      {
        title: 'Profile',
        url: '/profile',
        icon: UserCog
      }
    ]
  }
]

export const getAdminNavigation = (): SidebarNavGroup[] => [
  {
    label: 'Admin',
    items: [
      {
        title: 'Dashboard',
        url: '/admin',
        icon: LayoutDashboard,
        exact: true
      },
      {
        title: 'Users',
        url: '/admin/users',
        icon: Users
      },
      {
        title: 'App workspace',
        url: '/app',
        icon: Blocks,
        exact: true
      }
    ]
  }
]
