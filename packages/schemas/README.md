# @starter/schemas

Shared Zod schemas for validation across the monorepo.

## Overview

This package provides:

- **Shared Schemas** - Reusable Zod schemas
- **Type Inference** - TypeScript types from schemas
- **Validation** - Input/output validation
- **Consistency** - Same schemas across client and server

## Usage

### Importing

```typescript
import { signInSchema, signUpSchema } from "@starter/schemas/auth";
```

### Validation

```typescript
import { signInSchema } from "@starter/schemas/auth";

// Parse and validate
const credentials = signInSchema.parse(data);

// Safe parse
const result = signInSchema.safeParse(data);
if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error);
}
```

### Type Inference

```typescript
import { signUpSchema } from "@starter/schemas/auth";
import { z } from "zod";

type SignUpInput = z.infer<typeof signUpSchema>;
```

## Project Structure

```
schemas/
├── src/
│   └── auth.ts         # Auth-related schemas
└── package.json
```

## Key Dependencies

- `zod` - Schema validation library

## Example Schemas

```typescript
import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});
```

## Learn More

- [Zod Documentation](https://zod.dev)
