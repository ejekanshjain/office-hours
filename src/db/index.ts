import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '~/env'
import * as schema from './schema'

// In development, Next.js hot-reloading can re-evaluate modules frequently.
// Keep a single postgres-js client on `globalThis` to avoid opening multiple
// database connections during local development.
const globalForDb = globalThis as unknown as {
  client?: ReturnType<typeof postgres>
}

// Prefer the cached client (dev) and fall back to creating a new one.
//
// The extra options make the pool resilient against Neon's serverless
// behaviour: Neon auto-suspends idle compute (~5 min) and its pooler drops
// idle server-side connections. Without recycling, a long-lived socket goes
// stale and the next query fails with `CONNECT_TIMEOUT`. To avoid that:
// - `idle_timeout` closes idle connections before Neon can drop them, so we
//   never reuse a dead socket.
// - `max_lifetime` recycles connections periodically as a backstop.
// - `connect_timeout` gives new connections enough time to survive a Neon
//   compute cold start instead of failing fast.
// `max: 1` keeps the pool small for serverless, and `prepare: false` is
// required for Neon's pooled (PgBouncer) connection string.
const client =
  globalForDb.client ??
  postgres(env.DATABASE_URL, {
    max: 1,
    prepare: false,
    idle_timeout: 30, // seconds an idle connection is kept before closing
    max_lifetime: 60 * 5, // recycle a connection after 5 minutes
    connect_timeout: 60 // seconds to wait for a connection (Neon cold start)
  })

// Only cache the client outside production to avoid unexpected cross-request
// state retention in long-lived production processes.
if (env.APP_ENV !== 'production') globalForDb.client = client

/**
 * Drizzle ORM database client for PostgreSQL.
 *
 * Backed by a postgres-js client configured via `env.DATABASE_URL`, and wired
 * up with schema + relations so you get typed query helpers.
 *
 * Use this instance throughout the app for all database operations.
 *
 * @example
 * const users = await db.query.usersTable.findMany()
 * const newUser = await db.insert(usersTable).values({ email: 'user@example.com' })
 *
 * @example
 * await db.transaction(async (tx) => {
 *   await tx.insert(usersTable).values({ email: 'user@example.com' })
 * })
 */
export const db = drizzle(client, {
  schema: { ...schema }
})

/** The transaction client type passed into `db.transaction(async (tx) => ...)`. */
export type DbTx = Parameters<Parameters<(typeof db)['transaction']>[0]>[0]
