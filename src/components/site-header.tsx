import { BriefcaseBusiness } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { siteConfig } from '~/lib/siteConfig'

type SiteHeaderProps = {
  user: {
    name: string
    email: string
  } | null
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-full">
            <BriefcaseBusiness className="text-primary size-5" />
          </span>
          <span className="truncate text-sm font-semibold">
            {siteConfig.name}
          </span>
        </Link>

        <Button asChild size="sm">
          <Link href={user ? '/app' : '/login'}>
            {user ? 'Dashboard' : 'Login'}
          </Link>
        </Button>
      </div>
    </header>
  )
}
