import { BriefcaseBusiness } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { getAuthSession } from '~/lib/auth'
import { EmailLoginForm } from './email-login-form'
import { SocialLoginButtons } from './social-login-buttons'

function sanitizeCallback(value: string | string[] | undefined) {
  if (typeof value !== 'string') return null
  if (!value.startsWith('/') || value.startsWith('//')) return null
  return value
}

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = (await searchParams) ?? {}
  const callbackUrl = sanitizeCallback(resolvedParams.callbackUrl) ?? '/app'
  const authSession = await getAuthSession()

  if (authSession) return redirect(callbackUrl)

  return (
    <div className="bg-background selection:bg-foreground selection:text-background flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="border-foreground w-full max-w-md overflow-hidden rounded-none border-4 shadow-[12px_12px_0_0_var(--color-foreground)]">
        <CardHeader className="border-foreground bg-foreground space-y-4 border-b-4 px-6 py-8 text-center">
          <div className="bg-background border-foreground mx-auto flex h-16 w-16 items-center justify-center border-4 shadow-[4px_4px_0_0_var(--color-primary)]">
            <BriefcaseBusiness className="text-foreground size-8 stroke-[3]" />
          </div>
          <CardTitle className="text-background text-3xl font-black tracking-widest uppercase">
            Welcome back
          </CardTitle>
          <CardDescription className="text-background/80 text-xs font-bold tracking-widest uppercase">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 px-6 pt-8 sm:px-8">
          <div className="border-foreground bg-secondary border-4 p-5 shadow-[4px_4px_0_0_var(--color-foreground)]">
            <p className="text-secondary-foreground text-center text-xs leading-relaxed font-bold tracking-wider uppercase">
              <span className="border-foreground mb-2 block border-b-2 pb-1 font-black">
                New to our site?
              </span>
              No need to create a separate account. Simply use one of the
              options below to both sign up and log in.
            </p>
          </div>

          <EmailLoginForm callbackUrl={callbackUrl} />

          <div className="relative pt-2 pb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="border-foreground w-full border-t-4" />
            </div>
            <div className="relative flex justify-center text-xs font-black tracking-widest uppercase">
              <span className="bg-background text-foreground border-foreground border-4 px-4 py-1.5 shadow-[2px_2px_0_0_var(--color-foreground)]">
                Or continue with
              </span>
            </div>
          </div>

          <SocialLoginButtons callbackUrl={callbackUrl} />
        </CardContent>
        <CardFooter className="border-foreground bg-muted flex flex-col border-t-4 p-6">
          <div className="w-full text-center text-xs font-black tracking-widest uppercase">
            <Link
              href="/"
              className="text-foreground hover:bg-foreground hover:text-background hover:border-foreground mx-auto block w-max border-2 border-transparent px-4 py-2 transition-colors"
            >
              Return to home page
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
