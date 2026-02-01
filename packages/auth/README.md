# @starter/auth

Authentication configuration using Better Auth.

## Overview

This package provides:

- **Better Auth Setup** - Authentication framework configuration
- **Stripe Integration** - Subscription and payment handling
- **Email Integration** - Password reset, verification emails
- **React Client** - Preconfigured Better Auth React client
- **Typed Exports** - Session/user types

## Usage

### Client-Side

```typescript
import { authClient } from "@starter/auth";

// Sign in
await authClient.signIn.email({
  email: "user@example.com",
  password: "password",
});

// Sign out
await authClient.signOut();
```

### Server-Side

```typescript
import { auth } from "@starter/auth";

// Get session
const session = await auth.api.getSession({
  headers: request.headers,
});
```

### React Hook

> Use Better Auth React hooks from `better-auth/react` alongside `authClient` if needed.

## Project Structure

```
auth/
├── src/
│   ├── index.ts        # Main exports
│   ├── react.ts        # React client setup
│   ├── server.tsx      # Better Auth server config
│   └── env.ts          # Auth-related env defaults
└── package.json
```

## Key Dependencies

- `better-auth` - Authentication framework
- `@better-auth/stripe` - Stripe integration for payments
- `@starter/db` - User data storage
- `@starter/email` - Email notifications
- `react` - React integration
- `zod` - Schema validation

## Features

### Authentication Methods

- Email/password with verification
- OAuth (Google)

### Additional Features

- Session management
- Password reset emails
- Stripe subscription management
- Organization/team support

## Configuration

Configure auth in `apps/server/.env.local`:

```env
API_URL=http://localhost:8080
WEB_APP_URL=http://localhost:3000
CORS_HOST=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=sk_live_or_test
STRIPE_WEBHOOK_SECRET=whsec_...
```

For client usage, set `SERVER_URL` in the web app environment (defaults to `http://localhost:8080`).

## Learn More

- [Better Auth Documentation](https://better-auth.com)
