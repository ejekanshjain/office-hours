import Link from 'next/link'
import { siteConfig } from '~/lib/siteConfig'

export const SiteFooter = () => {
  return (
    <footer className="border-foreground bg-secondary border-t-4">
      <div className="text-foreground container flex flex-col items-center justify-between gap-4 py-8 text-xs font-bold tracking-widest uppercase sm:flex-row">
        <p className="bg-background border-foreground border-2 px-4 py-2 shadow-[2px_2px_0_0_var(--color-foreground)]">
          &copy; {new Date().getUTCFullYear()} {siteConfig.name}. ALL RIGHTS
          RESERVED.
        </p>
        <div className="flex gap-8">
          <Link
            href="/terms"
            className="hover:bg-foreground hover:text-background hover:border-foreground border-2 border-transparent px-3 py-1.5 transition-colors"
          >
            TERMS
          </Link>
          <Link
            href="/privacy"
            className="hover:bg-foreground hover:text-background hover:border-foreground border-2 border-transparent px-3 py-1.5 transition-colors"
          >
            PRIVACY
          </Link>
        </div>
      </div>
    </footer>
  )
}
