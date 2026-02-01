# @starter/email

Email templates and sending using React Email and Resend.

## Overview

This package provides:

- **React Email** - Build emails with React components
- **Resend Integration** - Reliable email delivery
- **Type-Safe Templates** - Fully typed email props
- **Preview Server** - Development email preview
- **Zod Validation** - Email data validation

## Usage

### Sending Emails

```typescript
import { sendEmail } from "@starter/email";
import { VerificationEmail } from "@starter/email/templates/verification-email";

await sendEmail({
  to: "user@example.com",
  subject: "Verify your email",
  react: VerificationEmail({
    verificationUrl: "https://example.com/verify?token=abc123",
  }),
});
```

### Creating Templates

```tsx
// src/templates/welcome.tsx
import { Html, Body, Text, Button } from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export function WelcomeEmail({ name, loginUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Body>
        <Text>Welcome, {name}!</Text>
        <Button href={loginUrl}>Get Started</Button>
      </Body>
    </Html>
  );
}
```

## Project Structure

```
email/
├── src/
│   ├── index.ts        # Main exports and send function
│   ├── templates/      # React Email templates
│   │   ├── verification-email.tsx
│   │   └── password-reset-email.tsx
│   └── env.ts          # Resend environment
└── package.json
```

## Key Dependencies

- `@react-email/components` - Email components
- `react-email` - Email framework
- `resend` - Email delivery service
- `react` - React framework
- `zod` - Schema validation

## Scripts

| Script          | Description                             |
| --------------- | --------------------------------------- |
| `bun dev`       | Start email preview server on port 3001 |
| `bun typecheck` | Run TypeScript type checking            |

## Development

```bash
# Start email preview server
bun dev

# Open http://localhost:3001 to preview emails
```

## Environment Variables

```env
RESEND_API_KEY=re_xxxxxxxx
```

The sender address is currently hardcoded in `packages/email/src/index.ts` as `noreply@starter.ai`.

## Available Templates

- `VerificationEmail` - Email verification
- `PasswordResetEmail` - Password reset

## Learn More

- [React Email Documentation](https://react.email)
- [Resend Documentation](https://resend.com/docs)
