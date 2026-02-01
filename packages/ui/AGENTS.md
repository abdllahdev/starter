# AGENTS.md - UI Package (@starter/ui)

## Overview

Shared component library: React 19 + Tailwind CSS v4 + Base UI + shadcn patterns.

## Structure

- `src/components/` - UI components
- `src/components/icons/` - Icon components
- `src/components/logos/` - Logo components
- `src/hooks/` - React hooks (use-mobile)
- `src/lib/utils.ts` - cn() utility
- `src/styles/globals.css` - Global CSS + Tailwind theme

## Key Utilities

**`cn()` - ClassName merging:**

```typescript
import { cn } from "@starter/ui/lib/utils";
<div className={cn("base", condition && "conditional", className)} />
```

**`useMobile()` - Responsive hook:**

```typescript
import { useMobile } from "@starter/ui/hooks/use-mobile";
const isMobile = useMobile(); // true if < 768px
```

## Component Pattern

**With Variants (CVA):**

```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", outline: "..." },
      size: { sm: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

export { buttonVariants }; // Export variants too
```

**Without Variants:**

```typescript
export function Separator({ className, ...props }: SeparatorProps) {
  return <div className={cn("base-classes", className)} {...props} />;
}
```

## Conventions

- Use `cn()` for all className merging
- Forward refs for DOM access
- Export both component and variants (if using CVA)
- Type props: interface extends HTML attributes + VariantProps
- Use semantic HTML elements
- ARIA labels for accessibility

## Styling (Tailwind CSS v4)

**CSS Variables in `globals.css`:**

```css
@theme {
  --color-background: oklch(...);
  --color-foreground: oklch(...);
  --color-primary: oklch(...);
  --radius-md: 0.5rem;
}
```

**Usage:**

```typescript
<div className="bg-background text-foreground border-border rounded-md">
```

## Add Component

1. Create file in `src/components/`
2. Use CVA for variants, `cn()` for className merging
3. Export component and variants
4. Auto-available via wildcard exports: `@starter/ui/components/<name>`

## Form Integration (TanStack Form)

```typescript
import { useForm } from "@tanstack/react-form";
import { Field, FieldLabel, FieldError } from "@starter/ui/components/field";
import { Input } from "@starter/ui/components/input";
import { Button } from "@starter/ui/components/button";

function MyForm() {
  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => { ... },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      <form.Field name="email">
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Accessibility

**Keyboard Navigation:**

- Tab/Shift+Tab: Focus navigation
- Enter/Space: Activate buttons
- Escape: Close dialogs/menus
- Arrow keys: Navigate menus/lists

**ARIA Labels:**

```typescript
<Button aria-label="Close dialog" onClick={onClose}>
  <X className="size-4" />
</Button>

<Input aria-describedby="email-error" aria-invalid={isInvalid} />
{isInvalid && <span id="email-error" role="alert">Invalid email</span>}
```

## Best Practices

1. **Always use `cn()`** for className merging
2. **Forward refs** for components needing DOM access
3. **Export variants** alongside component (for external use)
4. **Type all props** - extend HTML attributes + VariantProps
5. **Use CVA** for variant management
6. **Semantic HTML** - use correct elements
7. **Accessibility** - ARIA labels, keyboard nav
8. **Consistent naming** - `ComponentName`, `componentVariants`

## Common Components

**Button variants:**

- `default` - Primary action
- `destructive` - Delete/remove actions
- `outline` - Secondary actions
- `secondary` - Tertiary actions
- `ghost` - Minimal styling
- `link` - Text link style

**Form components:**

- `Field` - Wrapper with error state
- `FieldLabel` - Accessible label
- `FieldError` - Error message display
- `Input` - Text input
- `Textarea` - Multi-line text
- `Select` - Dropdown selection

**Layout components:**

- `Card` - Content container
- `Separator` - Divider
- `Sheet` - Side panel
- `Dialog` - Modal overlay

**Feedback:**

- `toast` (Sonner) - Notifications
- `Alert` - Inline messages
- `Spinner` - Loading state

## Import CSS

In app root:

```typescript
import "@starter/ui/globals.css";
```

## Troubleshooting

**Tailwind classes not working:**

- Ensure globals.css imported in root
- Check Tailwind config includes UI package
- Restart dev server

**Type errors:**

```bash
bun typecheck
```
