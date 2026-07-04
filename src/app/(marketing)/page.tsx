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
    <div className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      <section id="product" className="border-foreground relative border-b-4">
        <MapLayer />

        <div className="relative mx-auto grid w-full max-w-[1416px] gap-16 px-6 pt-24 pb-24 lg:grid-cols-[620px_minmax(0,1fr)] lg:items-start lg:px-12 lg:pt-32 lg:pb-24">
          <div className="max-w-[610px] space-y-10 lg:pl-11">
            <div className="space-y-6">
              <div className="border-foreground bg-primary text-primary-foreground inline-block border-2 px-3 py-1 font-bold tracking-widest uppercase shadow-[4px_4px_0_0_var(--color-foreground)]">
                Time Tracking Protocol v1.0
              </div>
              <h1 className="max-w-[548px] text-6xl leading-[1.0] font-black tracking-tight uppercase sm:text-7xl lg:text-[72px]">
                OFFICE TIME TRACKING THAT{' '}
                <span className="bg-primary text-primary-foreground px-2">
                  STARTS
                </span>{' '}
                WHEN YOU ARRIVE.
              </h1>
              <p className="border-foreground max-w-[520px] border-l-4 pl-4 text-xl leading-8 font-medium">
                Connect your phone automations using an API key. Check in when
                you arrive, check out when you leave, and keep clean, searchable
                logs of your office time.
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="border-foreground bg-primary text-primary-foreground h-16 rounded-none border-4 px-10 text-lg font-bold tracking-wider uppercase shadow-[8px_8px_0_0_var(--color-foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0_0_var(--color-foreground)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none"
              >
                <Link href="/login">
                  START TRACKING
                  <ArrowRight className="ml-2 size-6 stroke-[3]" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground bg-background h-16 rounded-none border-4 px-10 text-lg font-bold tracking-wider uppercase shadow-[8px_8px_0_0_var(--color-foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0_0_var(--color-foreground)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none"
              >
                <Link href="/privacy">VIEW PRIVACY</Link>
              </Button>
            </div>

            <div className="border-foreground grid max-w-[610px] gap-6 border-t-4 pt-10 sm:grid-cols-3">
              <ProofPoint
                icon={MapPin}
                title="LOCATION TRIGGERED"
                description="Automatically check in and out based on where you are."
                color="bg-secondary"
              />
              <ProofPoint
                icon={ShieldCheck}
                title="PRIVATE BY DESIGN"
                description="Your data stays yours. We don't sell or share your location."
                color="bg-primary"
              />
              <ProofPoint
                icon={Search}
                title="SEARCH & EXPORT"
                description="Find what you need fast and export anytime in CSV."
                color="bg-accent"
              />
            </div>
          </div>

          <div className="relative min-h-[460px]">
            <AutomationCard />
            <RecentActivityPreview />
          </div>
        </div>
      </section>

      <section
        id="setup"
        className="border-foreground bg-secondary relative border-b-4"
      >
        <div className="border-foreground bg-background mx-auto w-full max-w-[1416px] border-x-4">
          <div className="border-foreground bg-accent text-accent-foreground border-b-4 px-6 py-16 text-center sm:px-10">
            <h2 className="text-4xl font-black tracking-tight uppercase sm:text-5xl">
              SIMPLE SETUP. <br /> AUTOMATIC TRACKING.
            </h2>
            <p className="bg-background text-foreground border-foreground mt-4 inline-block border-2 px-4 py-2 text-xl font-bold shadow-[4px_4px_0_0_var(--color-foreground)]">
              GET CONNECTED IN MINUTES AND LET YOUR PHONE HANDLE THE REST.
            </p>
          </div>

          <div className="border-foreground grid gap-0 border-b-4 lg:grid-cols-3">
            <SetupStep
              number="1"
              icon={Building2}
              title="CREATE YOUR WORKSPACE"
              description="Add your office locations and invite teammates."
              className="border-foreground bg-primary/20 border-b-4 p-10 lg:border-r-4 lg:border-b-0"
            />
            <SetupStep
              number="2"
              icon={KeyRound}
              title="ADD YOUR API KEY"
              description="Use the key in your phone automation to send check-in and check-out events."
              className="border-foreground bg-secondary/20 border-b-4 p-10 lg:border-r-4 lg:border-b-0"
            />
            <SetupStep
              number="3"
              icon={CheckCircle2}
              title="START TRACKING"
              description="Arrive, leave, and we'll keep clean logs of your office time."
              className="bg-accent/20 p-10"
            />
          </div>

          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <LocationPreview />
            <div className="border-foreground border-t-4 lg:border-t-0 lg:border-l-4">
              <ClarityPreview />
            </div>
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
        className="absolute inset-y-0 right-0 w-full opacity-20 mix-blend-multiply lg:w-[60%] dark:mix-blend-screen"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--color-foreground) 0, var(--color-foreground) 2px, transparent 2px, transparent 14px)',
          backgroundSize: '100% 100%'
        }}
      />
      <div className="bg-primary border-foreground absolute top-14 right-[15%] hidden h-16 w-16 animate-[spin_10s_linear_infinite] border-4 shadow-[8px_8px_0_0_var(--color-foreground)] lg:block" />
      <div className="bg-secondary border-foreground absolute right-7 bottom-24 hidden h-12 w-12 rotate-12 border-4 shadow-[6px_6px_0_0_var(--color-foreground)] lg:block" />
      <div className="bg-accent border-foreground absolute top-40 right-[40%] hidden h-20 w-20 rounded-full border-4 shadow-[8px_8px_0_0_var(--color-foreground)] lg:block" />
    </div>
  )
}

function AutomationCard() {
  return (
    <div className="border-foreground bg-background absolute top-6 left-0 z-10 w-[240px] border-4 p-0 shadow-[8px_8px_0_0_var(--color-foreground)] lg:left-0">
      <div className="border-foreground bg-secondary flex items-center gap-3 border-b-4 px-4 py-3">
        <Phone className="text-secondary-foreground size-5 stroke-[3]" />
        <h2 className="text-secondary-foreground text-sm font-black tracking-wider uppercase">
          PHONE AUTOMATION
        </h2>
      </div>
      <div className="p-5">
        <p className="text-xs leading-5 font-bold">
          USE THIS API KEY IN YOUR AUTOMATION (SHORTCUTS, TASKER, OR SIMILAR).
        </p>
        <p className="text-primary mt-5 text-[10px] font-black tracking-widest uppercase">
          YOUR API KEY
        </p>
        <div className="border-foreground bg-foreground text-background mt-2 flex items-center justify-between border-2 px-3 py-2.5 font-mono text-xs font-bold shadow-[4px_4px_0_0_var(--color-primary)]">
          <span className="truncate">oh_live_8f3c6d9a9e2b4c1e</span>
          <ClipboardCopy className="hover:text-primary ml-2 size-4 shrink-0 cursor-pointer transition-colors" />
        </div>
        <Link
          href="/login"
          className="hover:text-primary mt-4 inline-flex items-center gap-1 text-[11px] font-black uppercase decoration-2 underline-offset-4 hover:underline"
        >
          REGENERATE KEY
          <ArrowRight className="size-4 stroke-[3]" />
        </Link>
        <div className="border-foreground mt-6 border-t-4 pt-5">
          <p className="text-primary text-[10px] font-black tracking-widest uppercase">
            EXAMPLE WORKFLOW
          </p>
          <WorkflowStep
            number="1"
            title="ARRIVE AT OFFICE"
            detail="Run check-in request"
          />
          <WorkflowStep
            number="2"
            title="LEAVE OFFICE"
            detail="Run check-out request"
          />
          <WorkflowStep number="3" title="DONE" detail="We'll log the rest" />
        </div>
      </div>
      <Link
        href="/login"
        className="border-foreground bg-foreground text-background hover:bg-primary flex w-full items-center justify-between border-t-4 px-5 py-3 text-xs font-black uppercase transition-colors"
      >
        VIEW SETUP GUIDE
        <ArrowRight className="size-4 stroke-[3]" />
      </Link>
    </div>
  )
}

function RecentActivityPreview() {
  return (
    <div className="border-foreground bg-background absolute top-20 right-0 w-full max-w-[480px] border-4 p-0 shadow-[12px_12px_0_0_var(--color-foreground)] lg:right-[20px]">
      <div className="border-foreground bg-primary flex items-center justify-between border-b-4 px-5 py-4">
        <h2 className="text-primary-foreground text-sm font-black tracking-wider uppercase">
          RECENT ACTIVITY
        </h2>
        <Link
          href="/login"
          className="bg-background text-foreground border-foreground hover:bg-secondary border-2 px-3 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0_0_var(--color-foreground)] transition-colors"
        >
          VIEW ALL
        </Link>
      </div>

      <div className="border-foreground grid grid-cols-2 gap-0 border-b-4 sm:grid-cols-4">
        <ActivityMetric
          label="TODAY"
          value="2H 47M"
          note="IN OFFICE"
          color="bg-secondary"
        />
        <ActivityMetric
          label="CHECK-INS"
          value="2"
          note="TODAY"
          color="bg-background"
        />
        <ActivityMetric
          label="LAST"
          value="9:01 AM"
          note="TODAY"
          color="bg-background"
        />
        <ActivityMetric
          label="STATUS"
          value="IN"
          note="OFFICE"
          dot
          color="bg-accent text-accent-foreground"
        />
      </div>

      <div className="overflow-hidden p-0">
        <div className="border-foreground bg-foreground text-background grid grid-cols-[1fr_1fr_1.3fr_0.8fr] border-b-4 px-5 py-3 text-[10px] font-black tracking-widest uppercase">
          <span>TIME</span>
          <span>TYPE</span>
          <span>LOCATION</span>
          <span className="text-right">DURATION</span>
        </div>
        <div className="px-5">
          {recentRows.map((row, i) => (
            <div
              key={`${row.time}-${row.type}-${i}`}
              className="border-foreground/30 grid grid-cols-[1fr_1fr_1.3fr_0.8fr] items-center border-b-2 border-dashed py-3 text-xs font-bold uppercase last:border-b-0"
            >
              <span>{row.time}</span>
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    'border-foreground flex size-5 items-center justify-center border-2',
                    row.active
                      ? 'bg-primary text-primary-foreground shadow-[2px_2px_0_0_var(--color-foreground)]'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  <ArrowRight className="size-3 stroke-[3]" />
                </span>
                {row.type}
              </span>
              <span>{row.location}</span>
              <span className="text-right">{row.duration}</span>
            </div>
          ))}
        </div>
        <div className="border-foreground bg-muted border-t-4 px-5 py-2">
          <p className="text-[10px] font-bold tracking-wider uppercase">
            ALL TIMES SHOWN IN YOUR LOCAL TIME ZONE.
          </p>
        </div>
      </div>
    </div>
  )
}

function ProofPoint({
  icon: Icon,
  title,
  description,
  color
}: {
  icon: FC<{ className?: string }>
  title: string
  description: string
  color: string
}) {
  return (
    <div className="border-foreground bg-background flex flex-col gap-4 border-4 p-4 shadow-[4px_4px_0_0_var(--color-foreground)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-foreground)]">
      <span
        className={cn(
          'border-foreground flex size-12 items-center justify-center border-4 shadow-[4px_4px_0_0_var(--color-foreground)]',
          color
        )}
      >
        <Icon className="size-6 stroke-[3]" />
      </span>
      <div>
        <h3 className="text-sm font-black tracking-wider uppercase">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed font-bold">{description}</p>
      </div>
    </div>
  )
}

function ActivityMetric({
  label,
  value,
  note,
  color,
  dot = false
}: {
  label: string
  value: string
  note: string
  color: string
  dot?: boolean
}) {
  return (
    <div
      className={cn(
        'border-foreground border-r-4 border-b-4 p-3 last:border-r-0 sm:border-b-0',
        color
      )}
    >
      <p className="text-[10px] font-black tracking-widest uppercase">
        {label}
      </p>
      <p className="mt-2 flex items-center gap-2 text-xl font-black uppercase">
        {dot ? (
          <span className="border-foreground bg-primary size-3 animate-pulse border-2" />
        ) : null}
        {value}
      </p>
      {note ? (
        <p className="mt-1 text-[10px] font-bold uppercase">{note}</p>
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
    <div className="mt-4 flex items-start gap-3">
      <span className="border-foreground bg-foreground text-background flex size-6 shrink-0 items-center justify-center border-2 text-xs font-black">
        {number}
      </span>
      <div>
        <p className="text-[11px] font-black tracking-wider uppercase">
          {title}
        </p>
        <p className="mt-0.5 text-[11px] font-bold">{detail}</p>
      </div>
    </div>
  )
}

function SetupStep({
  number,
  icon: Icon,
  title,
  description,
  className
}: {
  number: string
  icon: FC<{ className?: string }>
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="relative inline-flex">
        <span className="border-foreground bg-foreground text-background absolute -top-3 -right-3 z-10 flex size-8 items-center justify-center border-2 text-sm font-black shadow-[2px_2px_0_0_var(--color-primary)]">
          {number}
        </span>
        <span className="border-foreground bg-background flex size-16 items-center justify-center border-4 shadow-[4px_4px_0_0_var(--color-foreground)]">
          <Icon className="size-8 stroke-[3]" />
        </span>
      </div>
      <div>
        <h3 className="text-xl font-black tracking-wider uppercase">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed font-bold">{description}</p>
      </div>
    </div>
  )
}

function LocationPreview() {
  return (
    <div className="bg-primary/10 relative min-h-[320px] overflow-hidden p-10">
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, var(--color-foreground) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="border-foreground bg-background relative mt-8 max-w-[340px] border-4 p-0 shadow-[8px_8px_0_0_var(--color-foreground)] transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_var(--color-foreground)]">
        <div className="border-foreground bg-accent border-b-4 px-5 py-3">
          <h3 className="text-accent-foreground text-[15px] font-black tracking-widest uppercase">
            OFFICE LOCATIONS
          </h3>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <LocationRow
            color="bg-primary"
            title="MAIN OFFICE"
            detail="123 MARKET ST, SAN FRANCISCO, CA"
          />
          <LocationRow
            color="bg-secondary"
            title="WAREHOUSE"
            detail="880 INDUSTRIAL RD, SAN FRANCISCO, CA"
          />
        </div>
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
    <div className="border-foreground bg-background flex gap-4 border-4 p-3 shadow-[4px_4px_0_0_var(--color-foreground)]">
      <span
        className={cn('border-foreground mt-1 size-4 shrink-0 border-2', color)}
      />
      <div>
        <p className="text-sm font-black tracking-wider uppercase">{title}</p>
        <p className="mt-1 text-[10px] font-bold uppercase">{detail}</p>
      </div>
    </div>
  )
}

function ClarityPreview() {
  return (
    <div className="bg-background h-full p-8 sm:p-12">
      <h2 className="text-3xl font-black tracking-tight uppercase sm:text-4xl">
        BUILT FOR CLARITY <br /> & ACCOUNTABILITY.
      </h2>
      <p className="border-primary mt-4 border-l-4 pl-4 text-lg font-bold">
        See who's in the office, who's out, and for how long.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_260px]">
        <div className="border-foreground bg-background border-4 shadow-[8px_8px_0_0_var(--color-foreground)]">
          <div className="border-foreground bg-secondary/30 flex flex-col justify-between gap-4 border-b-4 p-4 sm:flex-row sm:items-center">
            <div className="border-foreground bg-background flex h-12 flex-1 items-center gap-3 border-4 px-4 text-sm font-bold shadow-[4px_4px_0_0_var(--color-foreground)]">
              <Search className="size-5 stroke-[3]" />
              SEARCH TEAM MEMBERS...
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="border-foreground h-12 w-12 rounded-none border-4 shadow-[4px_4px_0_0_var(--color-foreground)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <ArrowRight className="size-5 rotate-180 stroke-[3]" />
              </Button>
              <Button
                variant="outline"
                className="border-foreground h-12 rounded-none border-4 px-6 font-black uppercase shadow-[4px_4px_0_0_var(--color-foreground)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                TODAY
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-foreground h-12 w-12 rounded-none border-4 shadow-[4px_4px_0_0_var(--color-foreground)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <CalendarDays className="size-5 stroke-[3]" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="border-foreground bg-foreground text-background grid min-w-[600px] grid-cols-5 border-b-4 px-5 py-4 text-[10px] font-black tracking-widest uppercase">
              <span>MEMBER</span>
              <span>STATUS</span>
              <span>SINCE</span>
              <span>TODAY</span>
              <span>THIS WEEK</span>
            </div>
            <div className="min-w-[600px]">
              <MemberRow
                name="ALEX RIVERA"
                status="IN OFFICE"
                since="9:01 AM"
                today="2H 47M"
                week="12H 31M"
              />
              <MemberRow
                name="MAYA CHEN"
                status="OUT"
                since="12:05 PM"
                today="3H 04M"
                week="18H 10M"
                muted
              />
            </div>
          </div>
        </div>

        <div className="border-foreground bg-background border-4 p-0 shadow-[8px_8px_0_0_var(--color-foreground)]">
          <div className="border-foreground bg-primary border-b-4 px-5 py-3">
            <h3 className="text-primary-foreground text-sm font-black tracking-widest uppercase">
              LIVE TIMELINE
            </h3>
          </div>
          <div className="space-y-6 p-5">
            <TimelineItem
              time="9:01 AM"
              name="ALEX RIVERA"
              note="CHECKED IN MAIN OFFICE"
            />
            <TimelineItem
              time="12:05 PM"
              name="MAYA CHEN"
              note="CHECKED OUT MAIN OFFICE"
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
    <div className="border-foreground/30 grid grid-cols-5 items-center border-b-2 border-dashed px-5 py-4 text-xs font-bold last:border-b-0">
      <span className="font-black">{name}</span>
      <span
        className={cn(
          'border-foreground inline-block w-max border-2 px-2 py-1 text-[10px] font-black uppercase',
          muted
            ? 'bg-muted'
            : 'bg-secondary shadow-[2px_2px_0_0_var(--color-foreground)]'
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
    <div className="relative pl-6">
      <span
        className={cn(
          'border-foreground absolute top-1 left-0 size-3 border-2',
          muted
            ? 'bg-muted'
            : 'bg-accent shadow-[2px_2px_0_0_var(--color-foreground)]'
        )}
      />
      <div className="flex flex-col gap-1 text-xs">
        <span className="bg-foreground text-background w-max px-1 font-mono font-black">
          {time}
        </span>
        <div>
          <p className="font-black tracking-wider uppercase">{name}</p>
          <p className="border-foreground mt-1 border-l-2 pl-2 text-[10px] font-bold uppercase">
            {note}
          </p>
        </div>
      </div>
    </div>
  )
}
