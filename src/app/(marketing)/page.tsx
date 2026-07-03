import {
  ArrowRight,
  Clock,
  Download,
  KeyRound,
  MapPin,
  Smartphone
} from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'

export default async function HomePage() {
  return (
    <div className="border-b">
      <section className="container grid gap-10 py-16 lg:grid-cols-[1fr_500px] lg:items-center lg:py-24">
        <div className="max-w-2xl space-y-7">
          <div className="space-y-5">
            <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
              Office time tracking that runs from your phone.
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Create an API key, connect it to your arrival and leave
              automations, and keep every office check-in and check-out in one
              searchable log.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/login">
                Start tracking
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/privacy">How data is handled</Link>
            </Button>
          </div>

          <div className="grid max-w-xl gap-3 sm:grid-cols-3">
            <Stat value="API" label="Phone automation ready" />
            <Stat value="CSV" label="Filtered exports" />
            <Stat value="10k" label="Rows per export" />
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          <div className="border-b p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">Office activity</p>
                <p className="text-muted-foreground text-sm">
                  Today, sorted latest first
                </p>
              </div>
              <Badge variant="secondary">Live</Badge>
            </div>
          </div>

          <div className="grid gap-4 p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label="Total" value="18" />
              <Metric label="Check-ins" value="9" />
              <Metric label="Check-outs" value="9" />
            </div>

            <div className="space-y-3">
              <ActivityRow type="Check out" tag="office" time="06:14 PM" />
              <ActivityRow
                type="Check in"
                tag="office"
                time="09:02 AM"
                active
              />
              <ActivityRow
                type="Check out"
                tag="client-site"
                time="Yesterday"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 border-t">
        <div className="container grid gap-8 py-14 lg:grid-cols-[360px_1fr] lg:items-start">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">
              Set it up once.
            </h2>
            <p className="text-muted-foreground">
              Use Apple Shortcuts or Samsung Modes and Routines to call your
              tracking endpoint when your phone enters or leaves the office.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Feature
              icon={KeyRound}
              title="Create an API key"
              description="Generate a key from your profile and keep it private."
            />
            <Feature
              icon={Smartphone}
              title="Add phone automation"
              description="Trigger on arrival for check-in and on leaving for check-out."
            />
            <Feature
              icon={Download}
              title="Review and export"
              description="Filter by type or tag, then export clean CSV files."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-background rounded-md border p-3">
      <p className="font-semibold">{value}</p>
      <p className="text-muted-foreground mt-1 text-xs">{label}</p>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background rounded-md border p-3">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  )
}

function ActivityRow({
  type,
  tag,
  time,
  active = false
}: {
  type: string
  tag: string
  time: string
  active?: boolean
}) {
  return (
    <div className="bg-background flex items-center justify-between rounded-md border p-3">
      <div className="flex items-center gap-3">
        <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-md">
          {active ? (
            <MapPin className="size-4" />
          ) : (
            <Clock className="size-4" />
          )}
        </span>
        <div>
          <p className="text-sm font-medium">{type}</p>
          <p className="text-muted-foreground text-xs">{tag}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {active ? <span className="bg-primary size-2 rounded-full" /> : null}
        <span className="text-muted-foreground text-sm">{time}</span>
      </div>
    </div>
  )
}

function Feature({
  icon: Icon,
  title,
  description
}: {
  icon: FC<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="bg-background rounded-lg border p-5">
      <Icon className="text-primary mb-4 size-5" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </div>
  )
}
