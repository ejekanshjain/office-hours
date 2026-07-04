export type FormatDateOptions = {
  short?: boolean
  time?: boolean
  noYear?: boolean
  locale?: Intl.LocalesArgument
}

export const formatDate = (
  date: Date | string | number | null | undefined,
  options?: FormatDateOptions
): string => {
  if (date == null) return '—'

  return new Date(date).toLocaleDateString(options?.locale ?? 'en-US', {
    ...(options?.noYear ? {} : { year: 'numeric' }),
    month: options?.short ? 'short' : 'long',
    day: 'numeric',
    ...(options?.time ? { hour: '2-digit', minute: '2-digit' } : {})
  })
}
