'use server'

import { and, asc, desc, eq, ilike, isNull, or, sql } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '~/db'
import { sessionsTable, usersTable } from '~/db/schema'
import { adminActionClient } from '~/lib/safe-action'

const sortOrderSchema = z.enum(['asc', 'desc']).default('desc')
const userFiltersSchema = z
  .record(z.string(), z.array(z.union([z.string(), z.boolean()])))
  .optional()

const getUsersWhere = (
  search?: string,
  filters?: Record<string, (string | boolean)[]>
) => {
  const conditions = []
  const query = search?.trim()

  if (query) {
    conditions.push(
      or(
        ilike(usersTable.email, `%${query}%`),
        ilike(usersTable.name, `%${query}%`)
      )
    )
  }

  const bannedFilters = filters?.banned?.filter(
    (value): value is boolean => typeof value === 'boolean'
  )
  const bannedFilter = bannedFilters?.[0]

  if (bannedFilters?.length === 1 && typeof bannedFilter === 'boolean') {
    conditions.push(eq(usersTable.banned, bannedFilter))
  }

  const roleFilters = filters?.role?.filter(
    (value): value is string => typeof value === 'string'
  )

  if (roleFilters?.length && roleFilters.length < 2) {
    if (roleFilters.includes('admin')) {
      conditions.push(eq(usersTable.role, 'admin'))
    } else if (roleFilters.includes('user')) {
      conditions.push(or(isNull(usersTable.role), eq(usersTable.role, 'user')))
    }
  }

  return conditions.length ? and(...conditions) : undefined
}

const getSortColumn = (sortBy?: string) => {
  switch (sortBy) {
    case 'name':
      return usersTable.name
    case 'email':
      return usersTable.email
    case 'role':
      return usersTable.role
    case 'banned':
      return usersTable.banned
    case 'createdAt':
    default:
      return usersTable.createdAt
  }
}

export const getAdminUsersAction = adminActionClient
  .inputSchema(
    z.object({
      page: z.number().int().min(1).default(1),
      limit: z.number().int().min(1).max(100).default(10),
      sortBy: z.string().optional(),
      sortOrder: sortOrderSchema,
      search: z.string().trim().max(120).optional(),
      filters: userFiltersSchema
    })
  )
  .action(async ({ parsedInput }) => {
    const where = getUsersWhere(parsedInput.search, parsedInput.filters)
    const sortColumn = getSortColumn(parsedInput.sortBy)

    const [countRow] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(usersTable)
      .where(where)

    const rows = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        image: usersTable.image,
        role: usersTable.role,
        banned: usersTable.banned,
        banReason: usersTable.banReason,
        banExpires: usersTable.banExpires,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt
      })
      .from(usersTable)
      .where(where)
      .orderBy(
        parsedInput.sortOrder === 'asc' ? asc(sortColumn) : desc(sortColumn)
      )
      .limit(parsedInput.limit)
      .offset((parsedInput.page - 1) * parsedInput.limit)

    return {
      rows,
      totalCount: countRow?.count ?? 0
    }
  })

export const banAdminUserAction = adminActionClient
  .inputSchema(
    z.object({
      userId: z.string().min(1),
      banReason: z.string().trim().max(240).optional()
    })
  )
  .action(async ({ ctx, parsedInput }) => {
    if (parsedInput.userId === ctx.user.id) {
      throw new Error('You cannot ban yourself.')
    }

    const [user] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.id, parsedInput.userId))
      .limit(1)

    if (!user) {
      throw new Error('User not found.')
    }

    const [updatedUser] = await db.transaction(async tx => {
      const rows = await tx
        .update(usersTable)
        .set({
          banned: true,
          banReason: parsedInput.banReason || 'No reason provided',
          banExpires: null,
          updatedAt: new Date()
        })
        .where(eq(usersTable.id, parsedInput.userId))
        .returning({
          id: usersTable.id,
          banned: usersTable.banned,
          banReason: usersTable.banReason
        })

      await tx
        .delete(sessionsTable)
        .where(eq(sessionsTable.userId, parsedInput.userId))

      return rows
    })

    return updatedUser
  })

export const unbanAdminUserAction = adminActionClient
  .inputSchema(
    z.object({
      userId: z.string().min(1)
    })
  )
  .action(async ({ parsedInput }) => {
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        banned: false,
        banReason: null,
        banExpires: null,
        updatedAt: new Date()
      })
      .where(eq(usersTable.id, parsedInput.userId))
      .returning({
        id: usersTable.id,
        banned: usersTable.banned
      })

    if (!updatedUser) {
      throw new Error('User not found.')
    }

    return updatedUser
  })
