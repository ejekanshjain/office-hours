'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { KeyRound, Loader2, Trash2, UserCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PageHeading } from '~/components/page-heading'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldTitle
} from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import { apiKey, deleteUser, updateUser } from '~/lib/auth-client'
import { formatDate } from '~/lib/format-date'
import { toastErrorMessage, toastSuccessMessage } from '~/lib/toast-message'

const profileSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120)
})

const apiKeySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(80)
})

type ProfileForm = z.infer<typeof profileSchema>
type ApiKeyForm = z.infer<typeof apiKeySchema>

type ApiKeyListItem = {
  id: string
  name: string | null
  prefix: string | null
  enabled: boolean | null
  createdAt: Date | string
  expiresAt: Date | string | null
  lastRequest: Date | string | null
}

export function ProfilePageClient({
  user
}: {
  user: {
    name: string
    email: string
  }
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [newApiKey, setNewApiKey] = useState<string | null>(null)
  const [renamingKeyId, setRenamingKeyId] = useState<string | null>(null)
  const [busyKeyId, setBusyKeyId] = useState<string | null>(null)
  const [deletingAccount, setDeletingAccount] = useState(false)

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name
    }
  })

  const apiKeyForm = useForm<ApiKeyForm>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      name: ''
    }
  })

  const {
    data: apiKeys,
    isPending: apiKeysPending,
    refetch: refetchApiKeys
  } = useQuery({
    queryKey: ['profile-api-keys'],
    queryFn: async () => {
      const { data, error } = await apiKey.list({
        query: {
          sortBy: 'createdAt',
          sortDirection: 'desc'
        }
      })

      if (error) throw new Error(error.message ?? 'Failed to load API keys')
      return (data?.apiKeys ?? []) as ApiKeyListItem[]
    }
  })

  async function submitProfile(values: ProfileForm) {
    const { error } = await updateUser({
      name: values.name
    })

    if (error) {
      toastErrorMessage(error.message ?? 'Failed to update profile')
      return
    }

    toastSuccessMessage('Profile updated')
    router.refresh()
  }

  async function createApiKey(values: ApiKeyForm) {
    const { data, error } = await apiKey.create({
      name: values.name
    })

    if (error) {
      toastErrorMessage(error.message ?? 'Failed to create API key')
      return
    }

    setNewApiKey(data?.key ?? null)
    apiKeyForm.reset({ name: '' })
    await queryClient.invalidateQueries({ queryKey: ['profile-api-keys'] })
  }

  async function renameApiKey(keyId: string, name: string) {
    setBusyKeyId(keyId)
    const { error } = await apiKey.update({
      keyId,
      name
    })
    setBusyKeyId(null)

    if (error) {
      toastErrorMessage(error.message ?? 'Failed to rename API key')
      return
    }

    setRenamingKeyId(null)
    toastSuccessMessage('API key updated')
    await refetchApiKeys()
  }

  async function deleteApiKey(keyId: string) {
    const confirmed = window.confirm('Delete this API key?')
    if (!confirmed) return

    setBusyKeyId(keyId)
    const { error } = await apiKey.delete({
      keyId
    })
    setBusyKeyId(null)

    if (error) {
      toastErrorMessage(error.message ?? 'Failed to delete API key')
      return
    }

    toastSuccessMessage('API key deleted')
    await refetchApiKeys()
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      'Delete your account and all tracking logs? This cannot be undone.'
    )
    if (!confirmed) return

    setDeletingAccount(true)
    const { error } = await deleteUser({
      callbackURL: '/login'
    })

    if (error) {
      setDeletingAccount(false)
      toastErrorMessage(error.message ?? 'Failed to delete account')
      return
    }

    router.push('/login')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Profile"
        description="Manage your account and API keys for phone automations."
        icon={UserCog}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={profileForm.handleSubmit(submitProfile)}
              className="max-w-md space-y-6"
            >
              <Field orientation="vertical">
                <FieldContent>
                  <FieldTitle>Name</FieldTitle>
                  <Input
                    {...profileForm.register('name')}
                    aria-invalid={!!profileForm.formState.errors.name}
                  />
                  <FieldError errors={[profileForm.formState.errors.name]} />
                </FieldContent>
              </Field>

              <Button
                type="submit"
                disabled={
                  profileForm.formState.isSubmitting ||
                  !profileForm.formState.isDirty
                }
              >
                {profileForm.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : null}
                Save profile
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger zone</CardTitle>
            <CardDescription>
              Delete your account, sessions, and tracking logs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              disabled={deletingAccount}
              onClick={handleDeleteAccount}
            >
              {deletingAccount ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 />
              )}
              Delete account
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="size-4" />
            API keys
          </CardTitle>
          <CardDescription>
            Create keys for iPhone, Samsung, or other automation routines.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            onSubmit={apiKeyForm.handleSubmit(createApiKey)}
            className="grid gap-3 sm:grid-cols-[minmax(0,320px)_auto]"
          >
            <Field orientation="vertical">
              <FieldContent>
                <FieldTitle className="sr-only">API key name</FieldTitle>
                <Input
                  {...apiKeyForm.register('name')}
                  placeholder="iPhone arrival automation"
                  aria-invalid={!!apiKeyForm.formState.errors.name}
                />
                <FieldDescription>
                  Name keys by device or automation.
                </FieldDescription>
                <FieldError errors={[apiKeyForm.formState.errors.name]} />
              </FieldContent>
            </Field>
            <Button
              type="submit"
              disabled={apiKeyForm.formState.isSubmitting}
              className="sm:self-start"
            >
              {apiKeyForm.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : null}
              Create key
            </Button>
          </form>

          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Prefix</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last used</TableHead>
                  <TableHead className="w-56 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeysPending ? (
                  <TableRow>
                    <TableCell colSpan={5}>Loading API keys...</TableCell>
                  </TableRow>
                ) : apiKeys?.length ? (
                  apiKeys.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {renamingKeyId === item.id ? (
                          <RenameApiKeyForm
                            defaultName={item.name ?? ''}
                            disabled={busyKeyId === item.id}
                            onCancel={() => setRenamingKeyId(null)}
                            onSave={name => renameApiKey(item.id, name)}
                          />
                        ) : (
                          item.name || 'Untitled key'
                        )}
                      </TableCell>
                      <TableCell>{item.prefix || '—'}</TableCell>
                      <TableCell>{formatDate(item.createdAt)}</TableCell>
                      <TableCell>
                        {item.lastRequest
                          ? formatDate(item.lastRequest, { time: true })
                          : 'Never'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={busyKeyId === item.id}
                            onClick={() => setRenamingKeyId(item.id)}
                          >
                            Rename
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            disabled={busyKeyId === item.id}
                            onClick={() => deleteApiKey(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      No API keys yet. Create one to connect a device
                      automation.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!newApiKey} onOpenChange={() => setNewApiKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API key created</DialogTitle>
            <DialogDescription>
              Copy this key now. It will not be shown again.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted overflow-x-auto rounded-md p-3 font-mono text-sm">
            {newApiKey}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function RenameApiKeyForm({
  defaultName,
  disabled,
  onCancel,
  onSave
}: {
  defaultName: string
  disabled: boolean
  onCancel: () => void
  onSave: (name: string) => Promise<void>
}) {
  const [name, setName] = useState(defaultName)

  return (
    <form
      className="flex gap-2"
      onSubmit={event => {
        event.preventDefault()
        void onSave(name)
      }}
    >
      <Input
        value={name}
        onChange={event => setName(event.target.value)}
        disabled={disabled}
        className="h-8"
      />
      <Button type="submit" size="sm" disabled={disabled || !name.trim()}>
        Save
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </form>
  )
}
