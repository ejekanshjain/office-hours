'use client'

import { useSyncExternalStore } from 'react'
import { formatDate, type FormatDateOptions } from '~/lib/format-date'

type DateInput = Date | string | number | null | undefined

function getDateTime(date: DateInput) {
  if (date == null) {
    return undefined
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined
  }

  return parsedDate.toISOString()
}

function subscribe() {
  return () => {}
}

function getBrowserLocale(): string {
  return typeof navigator !== 'undefined' ? navigator.language : 'en-US'
}

function getServerLocale(): string {
  return 'en-US'
}

export function LocalizedDateTime({
  date,
  options,
  className
}: {
  date: DateInput
  options?: Omit<FormatDateOptions, 'locale'>
  className?: string
}) {
  const locale = useSyncExternalStore(
    subscribe,
    getBrowserLocale,
    getServerLocale
  )

  const formattedDate = formatDate(date, {
    ...options,
    locale
  })

  return (
    <time
      dateTime={getDateTime(date)}
      className={className}
      suppressHydrationWarning
    >
      {formattedDate}
    </time>
  )
}
