import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCopy,
  KeyRound,
  MapPin,
  Phone,
  Search,
  ShieldCheck
} from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/cn'

const recentRows = [
  {
    time: '9:01 AM',
    type: 'Check-in',
    location: 'Main Office',
    duration: '-',
    active: true
  },
  {
    time: '12:05 PM',
    type: 'Check-out',
    location: 'Main Office',
    duration: '3h 04m'
  },
  {
    time: '1:07 PM',
    type: 'Check-in',
    location: 'Main Office',
    duration: '-',
    active: true
  },
  {
    time: '4:12 PM',
    type: 'Check-out',
    location: 'Main Office',
    duration: '3h 05m'
  },
  {
    time: 'Yesterday 9:02 AM',
    type: 'Check-in',
    location: 'Main Office',
    duration: '-',
    active: true
  }
]

export default async function HomePage() {
  return (
    <div className="overflow-hidden">
      <section
        id="product"
        className="dark:bg-background relative bg-white"
      >
        <MapLayer />

        <div className="relative mx-auto grid w-full max-w-[1416px] gap-16 px-6 pt-20 pb-20 lg:grid-cols-[620px_minmax(0,1fr)] lg:items-start lg:px-0 lg:pt-28 lg:pb-16">
          <div className="max-w-[610px] space-y-8 lg:pl-11">
            <div className="space-y-6">
              <h1 className="max-w-[548px] text-5xl leading-[1.08] font-black tracking-tight text-slate-950 sm:text-6xl lg:text-[56px] dark:text-white">
                Office time tracking that{' '}
                <span className="text-primary">starts</span> when you arrive
                <span className="text-primary">.</span>
              </h1>
              <p className="max-w-[520px] text-lg leading-8 text-slate-500 dark:text-slate-400">
                Connect your phone automations using an API key. Check in when
                you arrive, check out when you leave, and keep clean, searchable
                logs of your office time.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="shadow-primary/20 h-12 rounded-full px-8 text-sm shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
              >
                <Link href="/login">
                  Start tracking
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full px-8 text-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Link href="/privacy">View privacy</Link>
              </Button>
            </div>

            <div className="grid max-w-[610px] gap-8 border-t border-slate-100 pt-8 sm:grid-cols-3 dark:border-slate-800">
              <ProofPoint
                icon={MapPin}
                title="Location triggered"
                description="Automatically check in and out based on where you are."
              />
              <ProofPoint
                icon={ShieldCheck}
                title="Private by design"
                description="Your data stays yours. We don't sell or share your location."
              />
              <ProofPoint
                icon={Search}
                title="Search & export"
                description="Find what you need fast and export anytime in CSV."
              />
            </div>
          </div>

          <div className="relative min-h-[460px]">
            <div className="border-primary absolute top-2 right-10 hidden h-24 w-52 rotate-[-26deg] border-t-4 lg:block" />
            <AutomationCard />
            <RecentActivityPreview />
          </div>
        </div>
      </section>

      <section
        id="setup"
        className="relative mx-auto mt-4 w-full max-w-[1392px] px-6 pb-20 lg:px-0 lg:pb-28"
      >
        <div className="dark:bg-card overflow-hidden rounded-2xl border bg-white shadow-lg shadow-slate-950/5">
          <div className="px-6 pt-12 pb-10 text-center sm:px-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Simple setup. Automatic tracking.
            </h2>
            <p className="text-muted-foreground mt-3 text-base">
              Get connected in minutes and let your phone handle the rest.
            </p>
          </div>

          <div className="grid gap-8 px-6 pb-12 sm:px-10 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
            <SetupStep
              number="1"
              icon={Building2}
              title="Create your workspace"
              description="Add your office locations and invite teammates."
            />
            <SetupArrow />
            <SetupStep
              number="2"
              icon={KeyRound}
              title="Add your API key"
              description="Use the key in your phone automation to send check-in and check-out events."
            />
            <SetupArrow />
            <SetupStep
              number="3"
              icon={CheckCircle2}
              title="Start tracking"
              description="Arrive, leave, and we'll keep clean logs of your office time."
            />
          </div>

          <div className="grid border-t lg:grid-cols-[0.9fr_1.1fr]">
            <LocationPreview />
            <ClarityPreview />
          </div>
        </div>
      </section>
    </div>
  )
}

function MapLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-y-0 right-0 w-[58%] opacity-55 dark:opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(16deg, transparent 0 47%, rgba(148,163,184,0.28) 48% 49%, transparent 50%), linear-gradient(94deg, transparent 0 46%, rgba(148,163,184,0.22) 47% 48%, transparent 49%), linear-gradient(130deg, transparent 0 48%, rgba(148,163,184,0.18) 49% 50%, transparent 51%)',
          backgroundSize: '150px 150px, 115px 115px, 190px 190px'
        }}
      />
      <div className="bg-primary ring-primary/10 dark:before:bg-background absolute top-14 right-[15%] h-8 w-8 rounded-full ring-[18px] before:absolute before:inset-2 before:rounded-full before:bg-white" />
      <div className="dark:before:bg-background absolute right-7 bottom-24 h-8 w-8 rounded-full bg-emerald-500 ring-[18px] ring-emerald-500/12 before:absolute before:inset-2 before:rounded-full before:bg-white" />
      <div className="border-primary absolute right-[7%] bottom-40 hidden h-28 w-56 rotate-45 border-b-4 lg:block" />
    </div>
  )
}

function AutomationCard() {
  return (
    <div className="dark:bg-card absolute top-6 left-0 z-10 w-[200px] rounded-xl border bg-white p-5 shadow-2xl shadow-slate-950/10 lg:left-3">
      <div className="flex items-center gap-3">
        <Phone className="size-3.5 text-slate-700 dark:text-slate-200" />
        <h2 className="text-sm font-semibold">Phone automation</h2>
      </div>
      <p className="mt-3.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
        Use this API key in your automation (Shortcuts, Tasker, or similar).
      </p>
      <p className="mt-5 text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase">
        Your API key
      </p>
      <div className="dark:bg-background mt-2.5 flex items-center justify-between rounded-lg border bg-slate-50 px-3 py-2.5 text-[10px] text-slate-700 dark:text-slate-300">
        <span className="truncate">oh_live_8f3c6d9a9e2b4c1e</span>
        <ClipboardCopy className="ml-2 size-3.5 shrink-0" />
      </div>
      <Link
        href="/login"
        className="text-primary mt-3 inline-flex items-center gap-1 text-[11px] font-medium"
      >
        Regenerate key
        <ArrowRight className="size-3" />
      </Link>
      <div className="mt-5 border-t pt-5">
        <p className="text-[10px] font-bold tracking-[0.12em] text-slate-500 uppercase">
          Example workflow
        </p>
        <WorkflowStep
          number="1"
          title="Arrive at office"
          detail="Run check-in request"
        />
        <WorkflowStep
          number="2"
          title="Leave office"
          detail="Run check-out request"
        />
        <WorkflowStep number="3" title="Done" detail="We'll log the rest" />
      </div>
      <div className="mt-1" />
      <Link
        href="/login"
        className="text-primary mt-4 inline-flex items-center gap-1 text-xs font-medium"
      >
        View setup guide
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  )
}

function RecentActivityPreview() {
  return (
    <div className="dark:bg-card absolute top-6 right-0 w-full max-w-[480px] rounded-xl border bg-white shadow-2xl shadow-slate-950/8 lg:right-[60px]">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="text-sm font-bold">Recent activity</h2>
        <Link href="/login" className="text-primary text-xs font-medium">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-0 border-b px-5 py-4">
        <ActivityMetric label="Today" value="2h 47m" note="In office" good />
        <ActivityMetric label="Check-ins" value="2" note="Today" />
        <ActivityMetric label="Last check-in" value="9:01 AM" note="Today" />
        <ActivityMetric label="Status" value="In office" note="" good dot />
      </div>

      <div className="overflow-hidden px-5 pb-4">
        <div className="grid grid-cols-[1fr_1fr_1.3fr_0.8fr] border-b py-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Time</span>
          <span>Type</span>
          <span>Location</span>
          <span className="text-right">Duration</span>
        </div>
        {recentRows.map(row => (
          <div
            key={`${row.time}-${row.type}`}
            className="grid grid-cols-[1fr_1fr_1.3fr_0.8fr] items-center border-b py-2.5 text-xs last:border-b-0"
          >
            <span>{row.time}</span>
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  'flex size-5 items-center justify-center rounded-full',
                  row.active
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'dark:bg-muted bg-slate-100 text-slate-500'
                )}
              >
                <ArrowRight className="size-2.5" />
              </span>
              {row.type}
            </span>
            <span>{row.location}</span>
            <span className="text-right text-slate-600 dark:text-slate-300">
              {row.duration}
            </span>
          </div>
        ))}
        <p className="text-muted-foreground mt-3 text-[11px]">
          All times shown in your local time zone.
        </p>
      </div>
    </div>
  )
}

function ProofPoint({
  icon: Icon,
  title,
  description
}: {
  icon: FC<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="grid grid-cols-[28px_1fr] gap-3.5">
      <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
        <Icon className="size-4 text-emerald-600" />
      </span>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-1.5 text-xs leading-5 sm:text-[13px] sm:leading-[1.6]">
          {description}
        </p>
      </div>
    </div>
  )
}

function ActivityMetric({
  label,
  value,
  note,
  good = false,
  dot = false
}: {
  label: string
  value: string
  note: string
  good?: boolean
  dot?: boolean
}) {
  return (
    <div className="border-r px-3.5 first:pl-0 last:border-r-0 last:pr-0">
      <p className="text-[10px] font-semibold tracking-[0.1em] text-slate-400 uppercase dark:text-slate-500">
        {label}
      </p>
      <p
        className={cn(
          'mt-1.5 flex items-center gap-2 text-lg font-bold',
          good ? 'text-emerald-600' : 'text-slate-950 dark:text-white'
        )}
      >
        {dot ? <span className="size-2 rounded-full bg-emerald-500" /> : null}
        {value}
      </p>
      {note ? (
        <p className="text-muted-foreground text-[11px]">{note}</p>
      ) : null}
    </div>
  )
}

function WorkflowStep({
  number,
  title,
  detail
}: {
  number: string
  title: string
  detail: string
}) {
  return (
    <div className="mt-3 grid grid-cols-[20px_1fr] gap-2">
      <span className="flex size-[18px] items-center justify-center rounded-full border text-[10px] text-slate-500">
        {number}
      </span>
      <div>
        <p className="text-[11px] font-semibold">{title}</p>
        <p className="text-muted-foreground text-[11px]">{detail}</p>
      </div>
    </div>
  )
}

function SetupStep({
  number,
  icon: Icon,
  title,
  description
}: {
  number: string
  icon: FC<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="grid grid-cols-[56px_1fr] gap-5">
      <div className="relative">
        <span className="bg-primary absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-xs font-bold text-white">
          {number}
        </span>
        <span className="bg-primary/8 text-primary flex size-14 items-center justify-center rounded-xl">
          <Icon className="size-6" />
        </span>
      </div>
      <div>
        <h3 className="text-[15px] font-bold">{title}</h3>
        <p className="text-muted-foreground mt-2.5 text-[13px] leading-[1.6]">
          {description}
        </p>
      </div>
    </div>
  )
}

function SetupArrow() {
  return (
    <div className="text-primary hidden items-center justify-center lg:flex">
      <ArrowRight className="size-10 stroke-1" />
    </div>
  )
}

function LocationPreview() {
  return (
    <div className="dark:bg-background/40 relative min-h-[320px] overflow-hidden border-r bg-slate-50/70 p-10">
      <div
        className="absolute inset-0 opacity-60 dark:opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(23deg, transparent 0 48%, rgba(148,163,184,0.25) 49% 50%, transparent 51%), linear-gradient(103deg, transparent 0 48%, rgba(148,163,184,0.18) 49% 50%, transparent 51%)',
          backgroundSize: '120px 120px, 170px 170px'
        }}
      />
      <div className="dark:before:bg-background absolute top-24 right-24 size-8 rounded-full bg-emerald-500 ring-[18px] ring-emerald-500/12 before:absolute before:inset-2 before:rounded-full before:bg-white" />
      <div className="dark:bg-card relative mt-10 max-w-[300px] rounded-xl border bg-white p-5 shadow-lg shadow-slate-950/6">
        <h3 className="text-[15px] font-bold">Office locations</h3>
        <LocationRow
          color="bg-emerald-500"
          title="Main Office"
          detail="123 Market St, San Francisco, CA"
        />
        <LocationRow
          color="bg-primary"
          title="Warehouse"
          detail="880 Industrial Rd, San Francisco, CA"
        />
      </div>
    </div>
  )
}

function LocationRow({
  color,
  title,
  detail
}: {
  color: string
  title: string
  detail: string
}) {
  return (
    <div className="mt-4 flex gap-3.5 border-t pt-4">
      <span className={cn('mt-1 size-2 rounded-full', color)} />
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-muted-foreground text-xs">{detail}</p>
      </div>
    </div>
  )
}

function ClarityPreview() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
        Built for clarity and accountability.
      </h2>
      <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
        See who's in the office, who's out, and for how long.
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_230px]">
        <div className="dark:bg-background rounded-xl border bg-white">
          <div className="flex items-center justify-between gap-3 border-b p-3">
            <div className="flex h-9 max-w-[260px] flex-1 items-center gap-2 rounded-md border px-3 text-sm text-slate-500">
              <Search className="size-4" />
              Search team members...
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon-sm">
                <ArrowRight className="size-4 rotate-180" />
              </Button>
              <Button variant="outline" size="sm">
                Today
              </Button>
              <Button variant="outline" size="icon-sm">
                <CalendarDays className="size-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-5 border-b px-4 py-3.5 text-xs font-medium text-slate-400">
            <span>Member</span>
            <span>Status</span>
            <span>Since</span>
            <span>Today</span>
            <span>This week</span>
          </div>
          <MemberRow
            name="Alex Rivera"
            status="In office"
            since="9:01 AM"
            today="2h 47m"
            week="12h 31m"
          />
          <MemberRow
            name="Maya Chen"
            status="Out"
            since="12:05 PM"
            today="3h 04m"
            week="18h 10m"
            muted
          />
        </div>

        <div className="dark:bg-background rounded-xl border bg-white p-5">
          <h3 className="text-sm font-bold">Live timeline</h3>
          <div className="mt-5 space-y-5 border-l pl-5">
            <TimelineItem
              time="9:01 AM"
              name="Alex Rivera"
              note="Checked in Main Office"
            />
            <TimelineItem
              time="12:05 PM"
              name="Maya Chen"
              note="Checked out Main Office"
              muted
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function MemberRow({
  name,
  status,
  since,
  today,
  week,
  muted = false
}: {
  name: string
  status: string
  since: string
  today: string
  week: string
  muted?: boolean
}) {
  return (
    <div className="grid grid-cols-5 px-4 py-4.5 text-sm">
      <span className="font-semibold">{name}</span>
      <span
        className={cn(
          'font-medium',
          muted ? 'text-slate-500' : 'text-emerald-600'
        )}
      >
        {status}
      </span>
      <span>{since}</span>
      <span>{today}</span>
      <span>{week}</span>
    </div>
  )
}

function TimelineItem({
  time,
  name,
  note,
  muted = false
}: {
  time: string
  name: string
  note: string
  muted?: boolean
}) {
  return (
    <div className="relative">
      <span
        className={cn(
          'absolute top-1 -left-[21px] size-2 rounded-full',
          muted ? 'bg-slate-400' : 'bg-emerald-500'
        )}
      />
      <div className="grid grid-cols-[60px_1fr] gap-3.5 text-sm">
        <span>{time}</span>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-muted-foreground text-xs">{note}</p>
        </div>
      </div>
    </div>
  )
}
