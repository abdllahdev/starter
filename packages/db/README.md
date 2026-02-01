# @starter/db

Database layer with Drizzle ORM.

## Overview

This package provides:

- **Drizzle ORM** - Type-safe SQL query builder
- **PostgreSQL Support** - Via `pg` driver
- **Schema Definitions** - Database schema in TypeScript
- **Zod Integration** - Schema validation
- **Migration Tools** - Drizzle Kit for migrations

## Usage

### Importing

```typescript
import { db, sql } from "@starter/db";
```

### Querying Data

```typescript
// Health check query
await db.execute(sql`SELECT 1`);

// Query typed tables
const user = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.email, "user@example.com"),
});
```

### Relationships

Relations are defined in `packages/db/src/schema/auth.ts` for users, sessions, accounts, and org tables.

## Project Structure

```
db/
├── src/
│   ├── index.ts        # Database client export
│   ├── env.ts          # Env validation
│   └── schema/
│       ├── auth.ts     # Users, sessions, orgs, api keys
│       └── index.ts
└── package.json
```

## Key Dependencies

- `drizzle-orm` - Type-safe ORM
- `pg` - PostgreSQL client
- `drizzle-kit` - Migration CLI
- `zod` - Schema validation

## Database Schema

Schemas are defined using Drizzle's TypeScript DSL in `packages/db/src/schema/auth.ts`.

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

## Learn More

- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [PostgreSQL Documentation](https://postgresql.org/docs)
