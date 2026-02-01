# AGENTS.md - Auth Package (@starter/auth)

## Overview

Better Auth: sessions, OAuth (Google/GitHub/Microsoft), email verification, password reset, Stripe subscriptions.

## Structure

- `src/index.ts` - Server auth instance
- `src/server.tsx` - Better Auth config
- `src/react.ts` - React client
- `src/types.ts` - Session, User types
- `src/env.ts` - Env validation

## Usage

**Server (API middleware):**

```typescript
import { getSession } from "@starter/auth";

const session = await getSession(context.request);
if (!session?.user) throw new ORPCError("UNAUTHORIZED");
```

**Client:**

```typescript
import { authClient } from "@starter/auth";

// Sign in
await authClient.signIn.email({ email, password, rememberMe: true });

// Sign out
await authClient.signOut();

// Get session
const { data: session } = await authClient.getSession();

// Sign up
await authClient.signUp.email({ email, password, name });

// Social
await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" });

// Password reset
await authClient.forgetPassword({ email });
await authClient.resetPassword({ token, password });
```

**Route protection:**

```typescript
import { getSessionFn } from "~/lib/auth/get-session-fn";

beforeLoad: async ({ context }) => {
  const session = await getSessionFn(context);
  if (!session) throw redirect({ to: "/auth/sign-in" });
  return { session };
};
```

## Configuration

**Add OAuth provider:**

1. Get credentials from provider dashboard
2. Add `PROVIDER_CLIENT_ID` and `PROVIDER_CLIENT_SECRET` to env
3. Update `src/server.tsx` socialProviders

**Add Stripe plan:**
Update `stripe({ subscription: { plans: [...] } })` in `src/server.tsx`
Use actual Stripe price IDs from dashboard

## Env

Required: OAuth credentials, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`

## Types

```typescript
import type { Session, User } from "@starter/auth/types";
```

## Account Management

**Update profile:**

```typescript
await authClient.updateUser({ name, image });
```

**Change password:**

```typescript
await authClient.changePassword({ currentPassword, newPassword });
```

**Change email:**

```typescript
await authClient.changeEmail({ email }); // Requires verification
```

**List sessions:**

```typescript
const { data: sessions } = await authClient.listSessions();
```

**Revoke session:**

```typescript
await authClient.revokeSession({ sessionId });
```

## Stripe Integration

**Get subscription:**

```typescript
import { getActiveSubscription } from "@starter/auth";
const subscription = await getActiveSubscription(userId);
// { plan, status, currentPeriodEnd }
```

**Create checkout:**

```typescript
const { url } = await authClient.stripe.createCheckoutSession({
  priceId: "price_pro",
  successUrl: "/dashboard?success=true",
  cancelUrl: "/pricing",
});
window.location.href = url;
```

**Manage subscription:**

```typescript
await authClient.stripe.updateSubscription({ priceId: "price_enterprise" });
await authClient.stripe.cancelSubscription();
await authClient.stripe.restoreSubscription();
```

## Security Best Practices

1. **Password Requirements**
   - Min 8 characters (enforced in Better Auth config)
   - Enforce complexity in Zod schema (uppercase, lowercase, number, special char)

   ```typescript
   password: z.string()
     .min(8)
     .regex(/[A-Z]/, "Must contain uppercase")
     .regex(/[a-z]/, "Must contain lowercase")
     .regex(/[0-9]/, "Must contain number")
     .regex(/[^A-Za-z0-9]/, "Must contain special character");
   ```

2. **Email Verification**
   - Required by default in config
   - Check `emailVerified` in protected routes

3. **Session Security**
   - HTTP-only cookies (automatic)
   - CSRF protection enabled
   - Secure cookies in production (HTTPS)

4. **Rate Limiting**
   - Implement on auth endpoints
   - Prevent brute force attacks

## Database Schema

Better Auth auto-creates:

- `user` - User accounts
- `session` - Active sessions
- `account` - OAuth accounts
- `verification` - Email verification tokens

**Extend user table:**

```typescript
// packages/db/src/schema/auth.ts
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false),
  name: text("name"),
  image: text("image"),

  // Custom fields
  role: text("role").default("user"),
  bio: text("bio"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
```

## Conventions

- Email verification required by default
- Min 8 char password (enforce complexity in schema)
- HTTP-only cookies for sessions
- Better Auth creates DB tables automatically
- Always check `emailVerified` in protected procedures
- Log security events (sign-ins, password changes)

## Troubleshooting

**Session not persisting:**

- Check `credentials: "include"` in fetch
- Verify CORS configuration
- Check cookie settings (domain, secure)

**OAuth redirect fails:**

- Verify redirect URIs in provider dashboard
- Check callback URL matches config
- Ensure HTTPS in production

**Email not sending:**

- Verify RESEND_API_KEY is set
- Check Resend dashboard for errors
