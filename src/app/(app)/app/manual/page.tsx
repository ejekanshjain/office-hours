import { Clock } from 'lucide-react'
import { PageHeading } from '~/components/page-heading'
import { ManualTrackingForm } from './manual-tracking-form'

export default async function ManualTrackingPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Manual entry"
        description="Record a check-in or check-out without using phone automation."
        icon={Clock}
      />
      <ManualTrackingForm />
    </div>
  )
}
