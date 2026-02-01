# @starter/env

## Package Overview

Central environment variable management using `@t3-oss/env-core` for type-safe, validated environment variables across the monorepo.

## Architecture

- `src/server.ts` - Server-only environment (Node.js apps like apps/server)
- `src/web.ts` - Web app environment (both SSR and client for apps/web)
- `src/index.ts` - Re-exports both configurations

## Key Principles

1. **Type Safety** - All environment variables are validated at runtime and have full TypeScript types
2. **Server/Client Separation** - Client variables MUST use `VITE_` prefix
3. **Single Source of Truth** - All env schemas defined here, consumed by apps/packages
4. **No Direct Access** - Never use `process.env.X` or `import.meta.env.VITE_X` directly

## Usage Patterns

**Server-only code (apps/server, packages/db, packages/email, packages/auth)**:

```typescript
import { serverEnv } from "@starter/env/server";

// Access server variables
serverEnv.DATABASE_URL;
serverEnv.RESEND_API_KEY;
```

**Web app code (apps/web)**:

```typescript
import { webEnv } from "@starter/env/web";

// Server-side only
webEnv.AXIOM_TOKEN;

// Client-side (with VITE_ prefix)
webEnv.VITE_API_URL;
webEnv.VITE_SENTRY_DSN;
```

## Adding New Variables

1. **Server variables**: Add to `src/server.ts` under the `server` object
2. **Client variables**: Add to `src/web.ts` under the `client` object (must use `VITE_` prefix)
3. **SSR-only variables**: Add to `src/web.ts` under the `server` object

## Common Patterns

**Skip validation during build**:

```bash
SKIP_ENV_VALIDATION=1 bun run build
```

**Handle optional variables**:

```typescript
OPTIONAL_VAR: z.string().optional();
OPTIONAL_WITH_DEFAULT: z.string().default("default-value");
```

## Important Notes

- This is a leaf package - it should NOT import from other workspace packages
- Changes here affect all apps/packages - test thoroughly
- Validation runs at module load time - errors will prevent startup
