'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldTitle
} from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { useSafeActionMutation } from '~/lib/safe-action-client'
import { toastErrorMessage, toastSuccessMessage } from '~/lib/toast-message'
import { createTrackingLogAction } from '../../actions/tracking-logs'

const schema = z.object({
  type: z.enum(['check_in', 'check_out']),
  tag: z.string().trim().max(80, 'Tag must be 80 characters or less').optional()
})

type Form = z.infer<typeof schema>

export function ManualTrackingForm() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useSafeActionMutation(
    createTrackingLogAction,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['tracking-logs'] })
        await queryClient.invalidateQueries({ queryKey: ['tracking-log-tags'] })
        toastSuccessMessage('Log created')
        reset({ type: 'check_in', tag: '' })
      },
      onError: error => {
        toastErrorMessage(error.message)
      }
    }
  )

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue
  } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'check_in',
      tag: ''
    }
  })

  const type = useWatch({ control, name: 'type' })

  async function onSubmit(values: Form) {
    await mutateAsync(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual entry</CardTitle>
        <CardDescription>
          Create a check-in or check-out for the current time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-6">
          <Field orientation="vertical">
            <FieldContent>
              <FieldTitle>Type</FieldTitle>
              <Select
                value={type}
                onValueChange={value =>
                  setValue('type', value as Form['type'], {
                    shouldDirty: true,
                    shouldValidate: true
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="check_in">Check in</SelectItem>
                  <SelectItem value="check_out">Check out</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[errors.type]} />
            </FieldContent>
          </Field>

          <Field orientation="vertical">
            <FieldContent>
              <FieldTitle>Tag</FieldTitle>
              <Input
                {...register('tag')}
                placeholder="Office, HQ, client-site"
                aria-invalid={!!errors.tag}
              />
              <FieldDescription>
                Optional label for filtering logs later.
              </FieldDescription>
              <FieldError errors={[errors.tag]} />
            </FieldContent>
          </Field>

          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : null}
            Create log
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
