# @starter/api

Type-safe oRPC router and fetch handlers for the monorepo.

## Overview

This package provides:

- **Router** - Health and readiness routes (`/health`, `/ready`)
- **Handlers** - RPC + OpenAPI fetch handlers for Bun server integration
- **Middleware** - Auth, retries, DB injection, and Sentry/OTel logging
- **Types** - Router input/output inference for clients

## Usage

### Server Usage

```typescript
import { createHandlers } from "@starter/api";

const { openApiHandler, rpcHandler, corsConfig } = createHandlers({
  corsOrigin: env.CORS_ORIGIN,
  apiUrl: env.API_URL,
  port: env.PORT,
  isDevelopment: env.NODE_ENV === "development",
  logger,
});
```

### Client Usage (Web App)

```typescript
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@starter/api";

const link = new RPCLink({
  url: "http://localhost:8080/rpc",
  fetch: (url, init) => fetch(url, { ...init, credentials: "include" }),
});

const client: RouterClient = createORPCClient(link);
```

### Adding a Route

Create a new file under `packages/api/src/router/` and register it in `packages/api/src/router/index.ts`:

```typescript
// packages/api/src/router/example.ts
import { z } from "zod";
import { publicProcedure } from "../lib/procedures";

export default publicProcedure
  .route({ method: "GET", path: "/example", summary: "Example" })
  .output(z.object({ ok: z.boolean() }))
  .handler(async () => ({ ok: true }));
```

## Project Structure

```
api/
├── src/
│   ├── index.ts          # Public exports
│   ├── lib/
│   │   ├── context.ts     # ORPC context types
│   │   ├── handlers.ts    # RPC + OpenAPI handlers
│   │   └── procedures.ts  # public/protected procedures
│   ├── middlewares/       # Auth, retry, Sentry, DB
│   └── router/            # Route definitions
└── package.json
```

## Learn More

- [oRPC Documentation](https://orpc.dev)
