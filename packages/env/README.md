# @starter/env

Centralized, type-safe environment variable management for the starter monorepo using [`@t3-oss/env-core`](https://env.t3.gg/).

## Overview

This package consolidates all environment variables across the monorepo into a single source of truth with:

- **Type Safety** - Full TypeScript autocomplete and compile-time checking
- **Runtime Validation** - Immediate feedback on misconfiguration using Zod schemas
- **Server/Client Separation** - Client prefix enforcement prevents exposing server secrets
- **Clear Error Messages** - Descriptive validation errors on startup

## Architecture

The package provides two configurations:

1. **`server.ts`** - Node.js server environment (for `apps/server`)
   - Pure backend variables
   - All secrets and API keys
   - Database URLs, OAuth credentials, etc.

2. **`web.ts`** - Vite web app environment (for `apps/web`)
   - **Server-side**: SSR variables (Axiom, telemetry)
   - **Client-side**: Browser variables (must use `VITE_` prefix)
   - Both in a single `createEnv()` call for simplicity

## Usage

### Server-Only Apps (apps/server, packages/\*)

```typescript
import { serverEnv } from "@starter/env/server";

// Access any server variable
const db = new Database(serverEnv.DATABASE_URL);
const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY);
```

### Web App (apps/web)

```typescript
import { webEnv } from "@starter/env/web";

// Server-side only (SSR)
if (typeof window === "undefined") {
  console.log(webEnv.AXIOM_TOKEN);
}

// Client-side (browser)
const apiUrl = webEnv.VITE_API_URL;
```

**Note**: Vite built-ins like `import.meta.env.DEV` don't need validation and can be used directly.

## Adding New Variables

### 1. Server Variables

Add to `src/server.ts` under the `server` object:

```typescript
export const serverEnv = createEnv({
  server: {
    // ... existing variables
    NEW_API_KEY: z.string().min(1),
    NEW_URL: z.string().url().default("https://api.example.com"),
  },
  // ...
});
```

### 2. Client Variables (Browser)

Add to `src/web.ts` under the `client` object. **MUST use `VITE_` prefix**:

```typescript
export const webEnv = createEnv({
  client: {
    // ... existing variables
    VITE_NEW_FEATURE_FLAG: z.boolean().default(false),
  },
  clientPrefix: "VITE_",
  // ...
});
```

### 3. SSR-Only Variables (Web App)

Add to `src/web.ts` under the `server` object:

```typescript
export const webEnv = createEnv({
  server: {
    // ... existing variables
    SSR_API_KEY: z.string(),
  },
  // ...
});
```

## Environment Files

Create `.env` files at the app level:

**`apps/server/.env`**:

```bash
NODE_ENV=development
DATABASE_URL=postgresql://...
RESEND_API_KEY=re_...
STRIPE_SECRET_KEY=sk_test_...
# ... etc
```

**`apps/web/.env`**:

```bash
# Server-side only
AXIOM_TOKEN=xaat-...

# Client-side (VITE_ prefix required)
VITE_API_URL=http://localhost:8080
VITE_SENTRY_DSN=https://...
```

## Validation & Error Handling

### Skip Validation (Build Time)

```bash
SKIP_ENV_VALIDATION=1 bun run build
```

### Empty String Handling

The `emptyStringAsUndefined: true` option treats empty strings as undefined:

```bash
# These are equivalent:
DATABASE_URL=
# DATABASE_URL not set
```

### Common Errors

**Error: "Invalid environment variables"**

- Check the error message for which variable failed validation
- Ensure all required variables are set in `.env`
- Verify URLs use correct format (http:// or https://)

**Error: "CLIENT variable does not have VITE\_ prefix"**

- Client variables MUST start with `VITE_` in `web.ts`
- This prevents accidentally exposing server secrets

## Migration from Old Approach

**Before** (scattered env.ts files):

```typescript
// apps/server/src/lib/env.ts
export const env = z
  .object({
    DATABASE_URL: z.string().url(),
  })
  .parse(process.env);

// Usage:
import { env } from "./lib/env";
env.DATABASE_URL;
```

**After** (centralized):

```typescript
// No local env.ts file needed
import { serverEnv } from "@starter/env/server";

// Usage:
serverEnv.DATABASE_URL;
```

## Benefits

1. **Single Source of Truth** - All env schemas in one package
2. **Type Safety** - Full autocomplete and type checking
3. **Runtime Validation** - Immediate feedback on misconfiguration
4. **Security** - Client prefix enforcement prevents exposing secrets
5. **Better DX** - Clear separation of server/client variables
6. **Maintainability** - Easy to add/modify environment variables
7. **Consistency** - Same pattern across all apps and packages

## Troubleshooting

### TypeScript Errors After Adding Variables

1. Run `bun install` to update lockfile
2. Restart TypeScript server in your editor
3. Check that the variable is exported from the correct file

### Variables Not Available at Runtime

1. Ensure variable is set in `.env` file
2. Restart the dev server
3. Check for typos in variable names
4. Verify the variable is in the correct config (server vs web)

### Circular Dependency Warnings

This package should never import from other workspace packages. If you see circular dependency warnings, the package dependency graph needs fixing.

## Learn More

- [t3-env Documentation](https://env.t3.gg/)
- [Zod Documentation](https://zod.dev/)
- [Vite Environment Variables](https://vite.dev/guide/env-and-mode.html)
