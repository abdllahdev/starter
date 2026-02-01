# @starter/server

Backend API server built with Bun.serve(), oRPC, and Bun.

## Overview

The server provides:

- **Bun.serve()** - Native Bun HTTP server
- **oRPC** - End-to-end type-safe API procedures
- **Better Auth** - Authentication endpoints
- **Drizzle ORM** - Database access
- **OpenTelemetry** - Distributed tracing and monitoring
- **Sentry** - Error tracking and performance monitoring
- **Pino** - Fast JSON logging

## Scripts

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `bun dev`       | Start development server with hot reload |
| `bun build`     | Build for production using tsdown        |
| `bun start`     | Start production server                  |
| `bun typecheck` | Run TypeScript type checking             |
| `bun db:*`      | Database commands (see below)            |

## Database Commands

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `bun db:generate` | Generate Drizzle migrations     |
| `bun db:migrate`  | Run database migrations         |
| `bun db:push`     | Push schema changes to database |
| `bun db:pull`     | Pull schema from database       |
| `bun db:studio`   | Open Drizzle Studio             |

## Project Structure

```
server/
├── src/
│   ├── server.ts           # Bun.serve() entry point
│   ├── index.ts            # Fetch handler + routing
│   └── lib/                # Env + logger setup
├── drizzle/                # Database migrations
└── package.json
```

## Key Dependencies

- `@orpc/server` - Type-safe API server
- Bun (native runtime)
- `drizzle-orm` - Database ORM
- `better-auth` - Authentication
- `@opentelemetry/*` - Observability
- `@sentry/bun` - Error tracking
- `pino` - Logging

## Environment Variables

Create `apps/server/.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
AXIOM_TOKEN=your-axiom-token
AXIOM_DATASET=starter-server
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=sk_live_or_test
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional (defaults shown)
PORT=8080
NODE_ENV=development
LOG_LEVEL=info
AXIOM_ENDPOINT=https://api.axiom.co
OTEL_SERVICE_NAME=starter-server
OTEL_SERVICE_VERSION=1.0.0
CORS_ORIGIN=http://localhost:3000
CORS_HOST=http://localhost:3000
API_URL=http://localhost:8080
WEB_APP_URL=http://localhost:3000
```

## Development

```bash
# Start development server with hot reload
bun dev

# Server will run on http://localhost:8080 (default)
```

## Building

```bash
# Build for production
bun build

# Output will be in `dist/` directory
```

## Production

```bash
# Start production server
bun start
```

## API Documentation

The API uses oRPC for type-safe procedures. All API routes are defined in the `@starter/api` package and mounted in this server.

## Learn More

- [oRPC Documentation](https://orpc.dev)
- [Bun.serve() Documentation](https://bun.sh/docs/api/http)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
