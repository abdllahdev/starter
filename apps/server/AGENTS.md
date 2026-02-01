# AGENTS.md - Server App (@starter/server)

## Overview

Bun HTTP server with `Bun.serve()` + custom fetch router. Hosts oRPC + Better Auth. OpenTelemetry + Sentry.

## Structure

- `src/server.ts` - Bun.serve() entry
- `src/index.ts` - Fetch router
- `src/lib/env.ts` - Env validation (Zod)
- `src/lib/logger.ts` - Pino logger
- `instrument.server.ts` - OpenTelemetry/Sentry bootstrap
- `tsdown.config.ts` - Build config

## Routing Pattern

**`src/index.ts` - Path-based routing:**

```typescript
const url = new URL(request.url);

if (url.pathname === "/health") return rpcHandler(request);
if (url.pathname === "/ready") return rpcHandler(request);
if (url.pathname.startsWith("/rpc")) return rpcHandler(request);
if (url.pathname.startsWith("/api/auth")) return auth.handler(request);
if (url.pathname.startsWith("/api")) return openapiHandler(request);

return new Response("Not Found", { status: 404 });
```

**Routes:**

- `/health`, `/ready` - Health checks (oRPC)
- `/rpc/*` - RPC endpoints (oRPC)
- `/api/auth/*` - Auth endpoints (Better Auth)
- `/api/*` - OpenAPI/REST endpoints (oRPC)
- `/api/reference` - Scalar API docs

## Context

```typescript
const { rpcHandler, openapiHandler } = createHandlers({
  context: { request, db, logger },
});
```

Available in all API handlers: `request`, `db`, `logger`

## Add Endpoint

**API routes (recommended):**
Add in `packages/api/src/router/*`, auto-available via RPC/OpenAPI

**Server-only routes:**
Add branch in `src/index.ts` for webhooks, custom endpoints

## Env

Required: `DATABASE_URL`, `AXIOM_TOKEN`, `SENTRY_DSN`, OAuth credentials

See `src/lib/env.ts` for validation schema

## Scripts

```bash
bun dev          # Watch mode
bun build        # tsdown build
bun start        # Run dist/ with instrumentation
bun db:*         # Drizzle commands
```

## Environment Validation

**Pattern (src/lib/env.ts):**

```typescript
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().default("8080"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  AXIOM_TOKEN: z.string(),
  SENTRY_DSN: z.string().url(),
  // OAuth
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  // Stripe
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
});

export const env = envSchema.parse(process.env); // Fail fast on startup
```

## Logging (Pino)

```typescript
import { logger } from "./lib/logger";

logger.info("Server started", { port: env.PORT });
logger.error("Database connection failed", { error });
logger.debug("Request processed", { userId, duration });

// In context
context.logger?.info("User action", { userId, action });
```

**Structured logging:** Always include context (userId, requestId, etc.)

## Observability

**OpenTelemetry (instrument.server.ts):**

- Automatic tracing for HTTP requests
- Database query tracing
- Custom spans for specific operations

**Sentry:**

- Error tracking with context
- Performance monitoring
- Breadcrumbs for debugging

**Health Checks:**

- `/health` - Always returns 200 (liveness)
- `/ready` - Returns 200 if DB connected (readiness)

## Production Deployment

1. **Build:** `bun build` (outputs to `dist/`)
2. **Set env vars:** All required vars in production
3. **Run:** `bun start` (runs with instrumentation)
4. **Health checks:**
   - Liveness: `GET /health`
   - Readiness: `GET /ready`

## Best Practices

1. **Validate env on startup** - Fail fast if misconfigured
2. **Structured logging** - Include context in all logs
3. **Health endpoints** - Separate liveness/readiness
4. **Error tracking** - Sentry for production errors
5. **No secrets in logs** - Redact sensitive data
6. **Graceful shutdown** - Handle SIGTERM properly

## Key Conventions

- Env validated with Zod on startup (fail fast)
- Pino logger: structured logging with context
- Health: `/health` (liveness), `/ready` (readiness + DB check)
- No Express/Fastify - native Bun.serve()
- Custom fetch router (path-based, no regex)
- Context includes: request, db, logger

## Troubleshooting

**Port already in use:**

```bash
# Change PORT in .env.local
PORT=8081
```

**Database connection issues:**

```bash
bun db:studio  # Test connection
# Check DATABASE_URL format: postgresql://user:pass@host:port/db
```

**Module resolution errors:**
Ensure tsconfig extends `@starter/tsconfig/bun.json`
