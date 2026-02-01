# AGENTS.md - Web App (@starter/web)

## Overview

TanStack Start (React 19): file-based routing, SSR, TanStack Query/Form. Vite + Sentry.

## Structure

- `src/routes/` - File-based routes
- `src/router.tsx` - Router config
- `src/routeTree.gen.ts` - Auto-generated (NEVER edit)
- `src/lib/orpc.ts` - oRPC client
- `src/lib/auth/` - Auth utilities
- `src/lib/tanstack-query/` - Query client setup

## Routing Conventions

**File Structure:**

- `__root.tsx` - Root layout
- `(marketing)/index.tsx` - Route group (no URL segment)
- `auth/route.tsx` - Layout route
- `auth/sign-in.tsx` - Leaf route
- `dashboard/$id.tsx` - Dynamic param
- `auth/-components/` - Private components (not routable)

**Route Pattern:**

```typescript
export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ context }) => {
    // Auth checks, redirects
    if (!context.session) throw redirect({ to: "/auth/sign-in" });
  },
  loader: async ({ context }) => {
    // SSR data fetching
    await context.queryClient.ensureQueryData({ ... });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <div>...</div>;
}
```

**Key Points:**

- Export named `Route` constant
- Component named `RouteComponent`
- `beforeLoad` for auth/redirects
- `loader` for SSR data
- Private components in `-components/`

## Data Fetching

**oRPC Client:**

```typescript
import { orpc } from "~/lib/orpc";

const data = await orpc.posts.list.query({ page: 1 });
await orpc.posts.create.mutate({ title: "..." });
```

**TanStack Query:**

```typescript
const { data } = useQuery({
  queryKey: ["posts"],
  queryFn: () => orpc.posts.list.query(),
});

const mutation = useMutation({
  mutationFn: (data) => orpc.posts.create.mutate(data),
});
```

## Forms

**TanStack Form:**

```typescript
const form = useForm({
  defaultValues: { email: "" },
  validators: { onChange: schema },
  onSubmit: async ({ value }) => { ... },
});

<form.Field name="email">
  {(field) => (
    <Field data-invalid={isInvalid}>
      <Input value={field.state.value} onChange={...} />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )}
</form.Field>
```

## Auth

**Client:**

```typescript
import { authClient } from "@starter/auth/react";

await authClient.signIn.email({ email, password });
const session = await authClient.getSession();
```

**Route Protection:**

```typescript
import { getSessionFn } from "~/lib/auth/get-session-fn";

beforeLoad: async ({ context }) => {
  const session = await getSessionFn(context);
  if (!session) throw redirect({ to: "/auth/sign-in" });
  return { session };
};
```

## Env

Client vars need `VITE_` prefix: `VITE_API_URL`, `VITE_SENTRY_DSN`

## Scripts

```bash
bun dev          # Port 3000
bun build        # Production build
bun start        # Production server
```

## SEO & Meta Tags

```typescript
export const Route = createFileRoute("/posts/")({
  meta: () => [
    { title: "Blog Posts | My App" },
    { name: "description", content: "Read our latest blog posts" },
    { property: "og:title", content: "Blog Posts" },
    { property: "og:description", content: "..." },
  ],
  component: RouteComponent,
});
```

## Error Handling

**Error Boundary:**

```typescript
// In __root.tsx
import { ErrorBoundary } from "~/components/error-boundary";

export const Route = createRootRoute({
  errorComponent: ErrorBoundary,
  notFoundComponent: NotFound,
});
```

**Toast Notifications:**

```typescript
import { toast } from "sonner";

toast.success("Post created!");
toast.error("Failed to create post", { description: error.message });
toast.loading("Creating post...");
toast.promise(createPost(), {
  loading: "Creating...",
  success: "Created!",
  error: "Failed!",
});
```

## SSR Data Loading

```typescript
export const Route = createFileRoute("/posts/")({
  loader: async ({ context }) => {
    // Prefetch data on server (no loading state on client)
    await context.queryClient.ensureQueryData({
      queryKey: ["posts"],
      queryFn: () => orpc.posts.list.query(),
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  // Data already in cache from server
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => orpc.posts.list.query(),
  });
}
```

## Development Workflow

1. **Start server:** `bun dev` (port 3000)
2. **Create route:** Add file in `src/routes/`
3. **Add components:** Import from `@starter/ui`
4. **Make API calls:** Use `orpc` client with full type safety
5. **Check types:** `bun typecheck`

## Production Build

```bash
bun build
```

**Output:**

- `.output/server/` - Server build
- `.output/public/` - Static assets

## Best Practices

1. **Prefetch in loaders** - Use `loader` for SSR data
2. **Protected routes** - Check auth in `beforeLoad`
3. **Type-safe API calls** - Use oRPC client
4. **Form validation** - TanStack Form + Zod schemas
5. **Error boundaries** - Catch errors gracefully
6. **Toast feedback** - User-friendly notifications
7. **SEO meta tags** - Set title/description per route
8. **Private components** - Use `-components/` folders

## Key Conventions

- Never edit `routeTree.gen.ts` (auto-generated)
- Use `~/` alias for `src/`
- Component named `RouteComponent`
- Toast with sonner: `toast.success()`, `toast.error()`
- Error boundary in `__root.tsx`
- `beforeLoad` for auth, `loader` for data
- Private components in `-components/`

## Troubleshooting

**Route not found:**

- Check file is in `src/routes/`
- Verify `routeTree.gen.ts` regenerated
- Restart dev server

**CORS errors:**

- Verify `VITE_API_URL` matches server
- Check server `CORS_ORIGIN` setting

**Module not found:**
Check `tsconfig.json` paths:

```json
{
  "compilerOptions": {
    "paths": { "~/*": ["./src/*"] }
  }
}
```
