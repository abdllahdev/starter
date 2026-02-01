# @starter/web

Frontend web application built with TanStack Start, React 19, and Tailwind CSS v4.

## Overview

The web app is a full-stack React application featuring:

- **TanStack Router** - File-based routing with type safety
- **TanStack Query** - Server state management and data fetching
- **TanStack Form** - Form handling with validation
- **Better Auth** - Authentication integration via `@starter/auth`
- **oRPC Client** - Type-safe API calls with TanStack Query utilities
- **Tailwind CSS v4** - Modern utility-first styling
- **Theme Support** - Dark/light mode with better-themes
- **OpenTelemetry** - Performance monitoring and tracing
- **Sentry** - Error tracking

## Scripts

| Script          | Description                           |
| --------------- | ------------------------------------- |
| `bun dev`       | Start development server on port 3000 |
| `bun build`     | Build for production                  |
| `bun preview`   | Preview production build              |
| `bun start`     | Start production server               |
| `bun typecheck` | Run TypeScript type checking          |

## Project Structure

```
web/
├── src/
│   ├── components/     # React components
│   ├── lib/            # Utility functions
│   ├── routes/         # TanStack Router routes (file-based)
│   ├── routeTree.gen.ts # Generated route tree
│   └── router.tsx      # Router setup
├── public/             # Static assets
└── package.json
```

## Key Dependencies

- `@tanstack/react-router` - Type-safe routing
- `@tanstack/react-query` - Data fetching
- `@tanstack/react-form` - Form management
- `@tanstack/react-start` - Full-stack framework
- `@orpc/client` - Type-safe API client
- `better-auth` - Authentication
- `tailwindcss` v4 - Styling
- `react` v19 - UI library

## Environment Variables

Create `apps/web/.env.local`:

```env
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
AXIOM_TOKEN=your-axiom-token

# Optional (defaults shown)
AXIOM_ENDPOINT=https://api.axiom.co
AXIOM_DATASET=starter-web
OTEL_SERVICE_NAME=starter-web
OTEL_SERVICE_VERSION=1.0.0
VITE_APP_VERSION=dev
VITE_API_URL=http://localhost:8080
# Required for production client RPC calls
VITE_SERVER_URL=https://api.your-domain.com
```

## Development

```bash
# Start development server
bun dev

# The app will be available at http://localhost:3000
```

## Building

```bash
# Build for production
bun build

# Output will be in `.output/` directory
```

## Learn More

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
