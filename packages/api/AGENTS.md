# AGENTS.md - API Package (@starter/api)

## Overview

oRPC router + handlers. Type-safe RPC + OpenAPI endpoints. Exports types for client inference.

## Structure

- `src/index.ts` - Public exports (router, createHandlers, types)
- `src/lib/procedures.ts` - publicProcedure, protectedProcedure
- `src/lib/context.ts` - Context types
- `src/router/` - Route definitions
- `src/middlewares/` - auth, db, retry, sentry

## Route Pattern

**Three parts:** definition (satisfies Route), schema, handler

```typescript
import type { Route } from "@orpc/server";
import { z } from "zod";
import { publicProcedure } from "../lib/procedures";

const definition = {
  method: "GET",
  tags: ["Posts"],
  path: "/posts",
  successStatus: 200,
  summary: "List posts",
} satisfies Route;

const inputSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().max(100).default(20),
});

const outputSchema = z.object({
  items: z.array(postSchema),
  total: z.number(),
});

export default publicProcedure
  .route(definition)
  .input(inputSchema)
  .output(outputSchema)
  .handler(async ({ input, context }) => {
    // Implementation
  });
```

## Organization

**Flat (simple routes):**

- `router/health.ts` - Default export
- `router/index.ts` - `export const router = { health };`

**Domain folders (CRUD):**

- `router/posts/list.ts`, `get.ts`, `create.ts`
- `router/posts/index.ts` - Re-export all
- `router/index.ts` - `export * as posts from "./posts"`

## Procedures

- `publicProcedure` - No auth
- `protectedProcedure` - Requires auth (adds `session`, `user` to context)

**Middleware chain:**

```typescript
const _base = base.use(retry).use(useSentry);
export const publicProcedure = _base;
export const protectedProcedure = _base.use(useAuth);
```

## Context

```typescript
// Base
{ request: Request, db: typeof db, logger?: Logger }

// Protected (adds)
{ session: Session, user: User }
```

## Error Handling

```typescript
import { ORPCError } from "@orpc/server";

throw new ORPCError("UNAUTHORIZED");
throw new ORPCError("NOT_FOUND", { message: "Post not found" });
```

## Client Usage

```typescript
import type { Router } from "@starter/api";

const orpc = createORPCClient<Router>({ baseURL: "..." });
await orpc.posts.list.query({ page: 1 });
```

## Add Route

1. Create file in `router/` (flat or domain folder)
2. Use `publicProcedure` or `protectedProcedure`
3. Default export
4. Export from `router/index.ts`

## Best Practices

1. **Always use Zod schemas** for input/output validation
2. **Separate concerns** - Use domain folders for related CRUD routes
3. **Leverage middleware** - Don't repeat auth/logging in handlers
4. **Type everything** - Export types for client inference
5. **Document routes** - Use descriptive summaries and OpenAPI tags
6. **Handle errors gracefully** - Use appropriate ORPCError codes
7. **Log important actions** - Use context.logger for debugging
8. **Keep handlers focused** - Extract complex logic to services

## Common Patterns

**Pagination:**

```typescript
const inputSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

const outputSchema = z.object({
  items: z.array(itemSchema),
  total: z.number(),
  hasMore: z.boolean(),
});
```

**Filtering:**

```typescript
const inputSchema = z.object({
  status: z.enum(["draft", "published"]).optional(),
  search: z.string().optional(),
  userId: z.string().optional(),
});
```

**Sorting:**

```typescript
const inputSchema = z.object({
  sortBy: z.enum(["createdAt", "title"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
```

**Reusable Schemas:**

```typescript
// In @starter/schemas
export const postSchema = z.object({ id: z.string(), title: z.string(), ... });
export const createPostSchema = postSchema.omit({ id: true, createdAt: true });
export const updatePostSchema = createPostSchema.partial();

// In API route
import { createPostSchema } from "@starter/schemas/posts";
export default protectedProcedure.input(createPostSchema).handler(...);
```

## Testing

```typescript
import { describe, it, expect } from "bun:test";
import { router } from "./router";

describe("Posts API", () => {
  it("should list posts", async () => {
    const result = await router.posts.list({
      input: { page: 1, limit: 10 },
      context: { request, db, user: mockUser, session: mockSession },
    });
    expect(result.items).toBeArray();
  });
});
```

## Conventions

- Three-part pattern (definition, schemas, handler)
- Default export per route file
- Use `satisfies Route` for type safety
- Zod for all input/output validation
- Async arrow function handlers
- Context destructured: `{ input, context }`

## OpenAPI Documentation

Routes auto-generate docs at `/api/reference` (Scalar UI)

Customize:

```typescript
const definition = {
  tags: ["Posts"],
  summary: "Create a new post",
  description: "Creates a new blog post with the provided data",
  deprecated: false,
} satisfies Route;
```
