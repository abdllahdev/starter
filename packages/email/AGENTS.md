# AGENTS.md - Email Package (@starter/email)

## Overview

Email templates with React Email + Resend. Type-safe, component-based templates.

## Structure

- `src/index.ts` - sendEmail utility
- `src/env.ts` - Environment validation
- `src/templates/` - Email components

## Usage

```typescript
import { sendEmail } from "@starter/email";
import { VerificationEmail } from "@starter/email/templates/verification-email";

await sendEmail({
  to: user.email,
  subject: "Verify your email",
  react: <VerificationEmail verificationUrl={url} userName={name} />,
});
```

## Template Pattern

**Structure:**

- Use React Email components: `Html`, `Body`, `Container`, `Text`, `Button`, `Link`, `Hr`
- Export interface for props
- Use inline styles (email clients don't support external CSS)

**Styling:**

- Inline styles only (object syntax)
- Use table-based layouts for complex designs
- Web-safe fonts
- Explicit widths on containers

**Components:**

- Export template function with typed props interface
- Include `<Preview>` for inbox preview text
- Alt text on all images

## Add Template

1. Create file in `src/templates/`
2. Export from `src/templates/index.ts`
3. Use via `sendEmail({ react: <YourTemplate /> })`

## Env

- `RESEND_API_KEY` (required)
- `EMAIL_FROM` (default: noreply@yourdomain.com)

## Template Components

**Available from @react-email/components:**

- `Html`, `Head`, `Body` - Base structure
- `Container`, `Section`, `Row`, `Column` - Layout
- `Text`, `Heading`, `Link`, `Button` - Content
- `Img`, `Hr` - Media & dividers
- `Preview` - Inbox preview text
- `Font` - Custom fonts

**Example pattern:**

```typescript
interface EmailProps {
  userName: string;
  actionUrl: string;
}

export function ActionEmail({ userName, actionUrl }: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Preview text shown in inbox</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Action Required</Text>
          <Text style={paragraph}>Hi {userName},</Text>
          <Button href={actionUrl} style={button}>
            Take Action
          </Button>
        </Container>
      </Body>
    </Html>
  );
}

// Inline styles (email clients don't support external CSS)
const main = { backgroundColor: "#f6f9fc", fontFamily: "sans-serif" };
const container = { backgroundColor: "#fff", margin: "0 auto", padding: "20px" };
const heading = { fontSize: "24px", fontWeight: "bold" };
const paragraph = { fontSize: "16px", lineHeight: "1.4" };
const button = {
  backgroundColor: "#5469d4",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "5px",
  textDecoration: "none",
};
```

## Styling Best Practices

1. **Use inline styles only** - Email clients strip external CSS
2. **Table-based layouts** - Most reliable for complex designs
3. **Explicit widths** - Define widths on containers
4. **Web-safe fonts** - system fonts, avoid custom fonts
5. **Alt text on images** - Always provide alt attributes
6. **Test across clients** - Gmail, Outlook, Apple Mail behave differently

## Common Patterns

**Transactional Email (verification, password reset):**

- Single CTA button
- Plain text alternative
- Link as text below button (for accessibility)
- Clear expiration time
- Security note at bottom

**Notification Email:**

- Brief summary
- Link to full content
- Unsubscribe option (if applicable)

**Marketing Email:**

- Engaging subject + preview text
- Multiple sections
- Images with alt text
- Clear unsubscribe link (required)

## Dev

```bash
bun dev  # React Email preview server at localhost:3000
```

**Features:**

- Live preview of all templates
- Hot reload on changes
- Test with different props
- View HTML source

## Resend Setup

1. Sign up at resend.com
2. Verify domain in dashboard
3. Create API key
4. Add to env: `RESEND_API_KEY=re_xxx`

## Best Practices

1. **Keep it simple** - Avoid complex CSS/layouts
2. **Mobile-first** - Design for small screens
3. **Single CTA** - One primary action per email
4. **Plain text fallback** - Some clients disable HTML
5. **Preview text** - First 50-100 chars shown in inbox
6. **Test thoroughly** - Different clients render differently
7. **Accessibility** - Alt text, semantic HTML, good contrast
