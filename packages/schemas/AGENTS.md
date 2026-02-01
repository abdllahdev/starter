# AGENTS.md - Schemas Package (@starter/schemas)

## Overview

Shared Zod validation schemas (auth, forms, API contracts).

## Structure

- `src/auth.ts` - Auth schemas (sign-in, sign-up, password reset)
- Add domain schemas as needed

## Usage

```typescript
import { signInSchema, signUpSchema } from "@starter/schemas/auth";

// In API
export default publicProcedure.input(signInSchema).handler(...)

// In forms
const form = useForm({ validators: { onChange: signInSchema } });
```

## Pattern

```typescript
export const signInSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password required"),
  rememberMe: z.boolean(),
});

export type SignIn = z.infer<typeof signInSchema>;
```

## Add Schema

1. Create file in `src/`
2. Export schema + inferred type
3. Auto-available via wildcard: `@starter/schemas/<file>`
