# AGENTS.md - Database Package (@starter/db)

## Overview

Drizzle ORM + PostgreSQL. Type-safe database layer.

## Structure

- `src/index.ts` - Database client
- `src/env.ts` - Env validation
- `src/schema/` - Table definitions

## Usage

```typescript
import { db } from "@starter/db";
import { users, posts } from "@starter/db/schema";
import { eq, and, desc } from "drizzle-orm";

// Query
const allUsers = await db.query.users.findMany();
const user = await db.query.users.findFirst({ where: eq(users.id, id) });

// Insert
await db.insert(users).values({ id: nanoid(), email, name });

// Update
await db.update(users).set({ name }).where(eq(users.id, id));

// Delete
await db.delete(users).where(eq(users.id, id));
```

## Table Pattern

```typescript
import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const posts = pgTable(
  "posts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    content: text("content"),
    published: boolean("published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("posts_user_id_idx").on(table.userId),
    index("posts_published_idx").on(table.published),
  ],
);

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, { fields: [posts.userId], references: [users.id] }),
}));
```

## Conventions

**Naming:**

- snake_case for database columns
- camelCase for TypeScript properties
- `tableName` + `Relations` for relation definitions

**Primary Keys:**

- Use `text("id").primaryKey()` with nanoid (not serial/auto-increment)

**Timestamps:**

- Always include `createdAt` and `updatedAt`
- Use `.$onUpdate(() => new Date())` for auto-update

**Indexes:**

- Add indexes for foreign keys and frequently queried columns
- Define in second parameter: `(table) => [index(...)]`

**Foreign Keys:**

- Include `onDelete` and `onUpdate` behavior
- `cascade` - delete/update related rows
- `set null` - set to null when parent deleted

## Migrations

```bash
bun db:generate      # Generate migration files
bun db:migrate       # Run migrations
bun db:push          # Push schema (dev only, no migration files)
bun db:pull          # Introspect database
bun db:studio        # Drizzle Studio UI
```

From `apps/server/` (where drizzle.config.ts lives)

## Add Table

1. Create file in `src/schema/`
2. Export from `src/schema/index.ts`
3. Run `bun db:generate` and `bun db:migrate`

## Query Operators

```typescript
import {
  eq,
  and,
  or,
  gt,
  gte,
  lt,
  lte,
  like,
  ilike,
  isNull,
  isNotNull,
  inArray,
} from "drizzle-orm";

// Equals
where: eq(users.id, userId);

// Multiple conditions
where: and(eq(users.active, true), gte(users.createdAt, date));

// OR
where: or(eq(users.role, "admin"), eq(users.role, "mod"));

// IN
where: inArray(users.id, ["id1", "id2"]);

// LIKE
where: like(users.email, "%@gmail.com");

// NULL checks
where: isNotNull(users.emailVerified);
```

## Common Patterns

**Pagination:**

```typescript
const offset = (page - 1) * limit;
const items = await db.query.posts.findMany({ limit, offset });
const [{ total }] = await db.select({ total: count() }).from(posts);

return { items, total, page, limit, hasMore: offset + limit < total };
```

**Soft Delete:**

```typescript
// Schema
deletedAt: timestamp("deleted_at"),

// Query only active
const active = await db.query.users.findMany({
  where: isNull(users.deletedAt),
});

// Soft delete
await db.update(users).set({ deletedAt: new Date() }).where(eq(users.id, id));
```

**Transactions:**

```typescript
await db.transaction(async (tx) => {
  const [user] = await tx.insert(users).values({ ... }).returning();
  await tx.insert(profiles).values({ userId: user.id, ... });
  await tx.update(stats).set({ totalUsers: sql`${stats.totalUsers} + 1` });
});
```

**Aggregations:**

```typescript
import { count, sum, avg, max, min } from "drizzle-orm";

// Count
const [{ total }] = await db.select({ total: count() }).from(users);

// Group by
const postCounts = await db
  .select({ userId: posts.userId, count: count() })
  .from(posts)
  .groupBy(posts.userId);
```

**Relations:**

```typescript
// With related data
const posts = await db.query.posts.findMany({
  with: {
    user: true,
    tags: { with: { tag: true } },
  },
});
```

## Best Practices

1. **Always include timestamps** - createdAt and updatedAt on all tables
2. **Use text + nanoid for IDs** - Not auto-increment for distributed systems
3. **Add indexes strategically** - Foreign keys and frequently queried columns
4. **Define relations** - For type-safe joins with `.with()`
5. **Use transactions** - For multi-step operations that must succeed/fail together
6. **Validate before insert** - Use Zod schemas to validate data
7. **Use migrations in production** - Never use `db:push` in prod
8. **snake_case columns** - camelCase TypeScript properties

## Troubleshooting

**Connection issues:**

```bash
bun db:studio  # Test connection
```

**Type errors after schema changes:**

```bash
bun db:generate  # Regenerate types
```

**Migration conflicts (dev only):**

```bash
rm -rf apps/server/migrations
bun db:generate
bun db:push
```
