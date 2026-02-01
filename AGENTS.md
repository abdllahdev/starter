# AGENTS.md - Starter Monorepo

## Overview

Full-stack monorepo: Bun + Turborepo + TanStack Start + oRPC. Strict TypeScript, end-to-end type safety.

## Structure

- `apps/web/` - TanStack Start frontend
- `apps/server/` - Bun.serve() backend
- `packages/api/` - oRPC routes
- `packages/auth/` - Better Auth
- `packages/db/` - Drizzle schemas
- `packages/ui/` - Shared components
- `packages/email/` - React Email templates
- `packages/schemas/` - Zod schemas
- `packages/shared/` - Utilities

## Coding Conventions

**File Naming:**

- kebab-case: `sign-in-form.tsx`, `user-service.ts`
- `.tsx` for React, `.ts` for utilities
- `index.ts` for barrel exports
- `-components/` for private route components (not routable)
- `route.tsx` for layout routes, `$param.tsx` for dynamic params

**Imports:**

- Use `@starter/*` workspace aliases
- Type-only imports: `import type { Session } from "@starter/auth"`
- Prefer named exports over default

**Code Style (oxfmt):**

- 100 char line width, 2 space indent
- Double quotes, semicolons required, trailing commas

**TypeScript:**

- Strict mode, no `any`, no unused vars
- Use `satisfies` for type narrowing
- Isolated modules, verbatim module syntax

**Database (Drizzle):**

- snake_case for columns, camelCase for properties
- `text("id").primaryKey()` with nanoid (not serial)
- Always include `createdAt` and `updatedAt` timestamps
- Use `.$onUpdate(() => new Date())` for auto-update

**API Routes (oRPC):**

- Three-part pattern: definition (satisfies Route), schema, handler
- `publicProcedure` for unauthenticated, `protectedProcedure` for auth required
- Default export per route file
- Flat structure or domain folders with `index.ts` re-exports

**Web Routes (TanStack Router):**

- Export `Route = createFileRoute("/path")({ ... })`
- Component function named `RouteComponent`
- Use `beforeLoad` for auth/redirects, `loader` for SSR data
- Never edit `routeTree.gen.ts` (auto-generated)

## Common Workflows

### Add Web Route

1. Create file in `apps/web/src/routes/`
2. Export `Route` with `createFileRoute()`
3. Private components go in `-components/` folder

### Add API Route

1. Create route file in `packages/api/src/router/` (flat or domain folder)
2. Use `publicProcedure` or `protectedProcedure`
3. Export from `packages/api/src/router/index.ts`

### Add DB Table

1. Create schema in `packages/db/src/schema/`
2. Export from `packages/db/src/schema/index.ts`
3. Run `bun db:generate` and `bun db:migrate` from `apps/server`

### Add UI Component

1. Create in `packages/ui/src/components/`
2. Use `cn()` for className merging
3. Export both component and variants (if using CVA)

## Error Handling

**API Layer:**

```typescript
import { ORPCError } from "@orpc/server";

throw new ORPCError("UNAUTHORIZED");
throw new ORPCError("NOT_FOUND", { message: "Post not found" });
throw new ORPCError("BAD_REQUEST", { message: "Invalid input" });
```

**Frontend:**

```typescript
import { toast } from "sonner";

// Form errors
fetchOptions: {
  onError: (ctx) => toast.error("Failed", { description: ctx.error?.message }),
}

// Query errors
const { error } = useQuery({ ... });
if (error) toast.error(error.message);
```

## Forms & Validation

**Pattern:**

```typescript
import { useForm } from "@tanstack/react-form";
import { signInSchema } from "@starter/schemas/auth";

const form = useForm({
  defaultValues: { email: "", password: "" },
  validators: { onChange: signInSchema }, // Zod schema
  onSubmit: async ({ value }) => {
    await orpc.auth.signIn.mutate(value);
  },
});

// Field rendering
<form.Field name="email">
  {(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
        <Input
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    );
  }}
</form.Field>
```

## Environment Variables

**Pattern:** Always validate with Zod schemas

```typescript
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().default("8080"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export const env = envSchema.parse(process.env);
```

**Client (Vite):** Prefix with `VITE_` for client-side access
**Server:** Use `process.env`, fail fast on startup if invalid

## Best Practices

1. **Type Safety**
   - Use Zod for all validation (API inputs, env vars, forms)
   - Export types from packages for client inference
   - Use `satisfies` for type narrowing without widening

2. **Database**
   - Always include `createdAt` and `updatedAt` timestamps
   - Use `text + nanoid` for IDs, not auto-increment
   - Add indexes for foreign keys and frequently queried columns
   - Use transactions for multi-step operations

3. **API Design**
   - Separate public/protected procedures
   - Use domain folders for related CRUD operations
   - Include pagination for list endpoints
   - Log important actions with context.logger

4. **Security**
   - Require email verification for auth
   - Enforce strong password requirements in schemas
   - Use HTTP-only cookies for sessions
   - Validate all inputs with Zod schemas
   - Never trust client data

5. **Error Handling**
   - Use appropriate HTTP status codes (UNAUTHORIZED, NOT_FOUND, etc.)
   - Include helpful error messages for users
   - Log errors with Sentry for tracking
   - Handle edge cases explicitly

6. **Performance**
   - Prefetch data in route loaders for SSR
   - Use TanStack Query for caching
   - Add database indexes strategically
   - Minimize bundle size (code splitting)

7. **Code Organization**
   - Keep handlers focused, extract complex logic to services
   - Co-locate route-specific components in `-components/`
   - Use barrel exports (`index.ts`) for clean imports
   - Avoid circular dependencies

## Common Patterns

### Pagination

```typescript
const inputSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

const offset = (page - 1) * limit;
const items = await db.query.posts.findMany({ limit, offset });
const [{ total }] = await db.select({ total: count() }).from(posts);

return { items, total, page, limit, hasMore: offset + limit < total };
```

### Auth Protection

```typescript
// Route protection
beforeLoad: async ({ context }) => {
  const session = await getSessionFn(context);
  if (!session) throw redirect({ to: "/auth/sign-in" });
  return { session };
};

// API protection (middleware handles this)
export default protectedProcedure.handler(async ({ context }) => {
  // context.user and context.session are available
});
```

### Soft Delete

```typescript
// Schema
deletedAt: timestamp("deleted_at"),

// Query only active
where: isNull(table.deletedAt)

// Soft delete
await db.update(table).set({ deletedAt: new Date() }).where(eq(table.id, id));
```

## Observability

**Logging (Pino):**

```typescript
context.logger?.info("Action completed", { userId, postId });
context.logger?.error("Operation failed", { error, context });
```

**Tracing (OpenTelemetry):** Automatic for HTTP requests, DB queries

**Error Tracking (Sentry):** Automatic capture with context

## Commands

```bash
bun dev              # Start all apps
bun build            # Build all
bun typecheck        # Type check
bun lint             # Run oxlint
bun format           # Run oxfmt
bun db:generate      # Generate migrations
bun db:migrate       # Run migrations
bun db:studio        # Drizzle Studio
```
