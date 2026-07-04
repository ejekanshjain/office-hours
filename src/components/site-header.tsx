import { MapPin } from 'lucide-react'
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
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-[72px] w-full max-w-[1416px] items-center justify-between gap-4 px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="bg-primary text-primary-foreground shadow-primary/25 flex size-9 shrink-0 items-center justify-center rounded-full shadow-sm">
            <MapPin className="size-5 fill-current" />
          </span>
          <span className="truncate text-base font-bold tracking-normal">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-12 text-sm font-medium md:flex">
          <Link href="/#product" className="hover:text-primary">
            Product
          </Link>
          <Link href="/#setup" className="hover:text-primary">
            Setup
          </Link>
          <Link href="/privacy" className="hover:text-primary">
            Privacy
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hidden sm:inline-flex"
          >
            <Link href="/privacy">View privacy</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="shadow-primary/20 h-10 px-5 shadow-sm"
          >
            <Link href={user ? '/app' : '/login'}>
              {user ? 'Dashboard' : 'Start tracking'}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
