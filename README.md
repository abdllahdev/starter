# Starter

A modern, production-ready full-stack boilerplate for building web applications with best-in-class developer experience.

## 🚀 Tech Stack

- **Runtime:** [Bun](https://bun.sh) - Fast JavaScript runtime, bundler, and package manager
- **Monorepo:** [Turborepo](https://turbo.build) - High-performance build system for monorepos
- **Frontend:**
  - [TanStack Router](https://tanstack.com/router) - Type-safe routing
  - [TanStack Query](https://tanstack.com/query) - Powerful data fetching
  - [TanStack Form](https://tanstack.com/form) - Headless form management
  - [TanStack Start](https://tanstack.com/start) - Full-stack React framework
  - [React 19](https://react.dev) - Latest React with concurrent features
  - [Tailwind CSS v4](https://tailwindcss.com) - Utility-first CSS
  - [better-themes](https://www.npmjs.com/package/better-themes) - Theme management
- **Backend:**
  - [oRPC](https://orpc.dev) - End-to-end type-safe APIs (tRPC alternative)
  - [Better Auth](https://better-auth.com) - Authentication framework
  - [Drizzle ORM](https://orm.drizzle.team) - Type-safe SQL ORM
  - [PostgreSQL](https://postgresql.org) - Relational database
  - [Bun.serve()](https://bun.sh/docs/api/http) - Native Bun HTTP server
- **Observability:**
  - [OpenTelemetry](https://opentelemetry.io) - Distributed tracing
  - [Sentry](https://sentry.io) - Error tracking
- **Tooling:**
  - [TypeScript 5.9](https://typescriptlang.org) - Type safety
  - [oxlint](https://oxc-project.github.io) - Fast JavaScript linter
  - [oxfmt](https://oxc-project.github.io) - Fast JavaScript formatter

## 📦 Project Structure

```
starter/
├── apps/
│   ├── web/           # TanStack Start frontend application
│   └── server/        # Bun.serve() backend API server
├── packages/
│   ├── api/           # oRPC API router and procedures
│   ├── auth/          # Better Auth configuration
│   ├── db/            # Drizzle ORM schema and utilities
│   ├── email/         # React Email templates
│   ├── schemas/       # Shared Zod schemas
│   ├── shared/        # Shared utilities (nanoid, etc.)
│   └── ui/            # Shared UI components (shadcn/ui)
└── tooling/
    └── tsconfig/      # Shared TypeScript configurations
```

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.3.5 or higher
- [Node.js](https://nodejs.org) 22 or higher
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd starter

# Install dependencies
bun install
```

### Environment Variables

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

### Development

```bash
# Start all apps in development mode
bun dev

# Start specific app
bun dev --filter=@starter/web
bun dev --filter=@starter/server

# Run database studio
bun db:studio

# Type checking
bun typecheck

# Linting
bun lint

# Formatting
bun format
```

### Database Setup

```bash
# Generate database migrations
bun db:generate

# Push schema to database
bun db:push

# Run migrations
bun db:migrate

# Open Drizzle Studio
bun db:studio
```

## 🧪 Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch
```

## 🏗️ Building

```bash
# Build all apps and packages
bun build

# Production start
bun --filter=@starter/web start
bun --filter=@starter/server start
```

## 📚 Documentation

- [Web App](./apps/web/README.md)
- [Server App](./apps/server/README.md)
- [API Package](./packages/api/README.md)
- [Auth Package](./packages/auth/README.md)
- [Database Package](./packages/db/README.md)
- [Email Package](./packages/email/README.md)
- [Schemas Package](./packages/schemas/README.md)
- [UI Package](./packages/ui/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache-2.0 License.

---

Built with ❤️ using modern web technologies.
