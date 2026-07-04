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
    <header className="bg-background border-foreground sticky top-0 z-40 border-b-4">
      <div className="mx-auto flex h-[72px] w-full max-w-[1416px] items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 transition-transform hover:-translate-y-0.5"
        >
          <span className="bg-foreground text-background border-foreground flex size-9 shrink-0 items-center justify-center border-2 shadow-[2px_2px_0_0_var(--color-primary)]">
            <MapPin className="size-5 fill-current" />
          </span>
          <span className="truncate text-lg font-black tracking-widest uppercase">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-black tracking-widest uppercase md:flex">
          <Link
            href="/#product"
            className="hover:bg-foreground hover:text-background hover:border-foreground border-2 border-transparent px-3 py-1.5 transition-colors"
          >
            Product
          </Link>
          <Link
            href="/#setup"
            className="hover:bg-foreground hover:text-background hover:border-foreground border-2 border-transparent px-3 py-1.5 transition-colors"
          >
            Setup
          </Link>
          <Link
            href="/privacy"
            className="hover:bg-foreground hover:text-background hover:border-foreground border-2 border-transparent px-3 py-1.5 transition-colors"
          >
            Privacy
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-foreground hidden h-10 rounded-none border-2 px-5 text-xs font-black uppercase shadow-[2px_2px_0_0_var(--color-foreground)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_var(--color-foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:inline-flex"
          >
            <Link href="/privacy">View privacy</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="border-foreground bg-foreground text-background h-10 rounded-none border-2 px-6 text-xs font-black uppercase shadow-[4px_4px_0_0_var(--color-primary)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-primary)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
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
