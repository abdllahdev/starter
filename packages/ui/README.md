# @starter/ui

Shared UI component library for the starter boilerplate. Built with **shadcn/ui**, **base-ui**, and **Tailwind CSS**.

## 🎯 Purpose

This package provides reusable UI components for your applications:

- Pre-built components based on shadcn/ui
- Complete design system with Tailwind CSS
- Consistent UI across all apps and packages
- Dark mode support out of the box

## 📦 Installation

This package is included in the monorepo workspace. No separate installation needed.

## 🎨 Usage

### Importing Components

```tsx
import { Button } from "@starter/ui/components/button";
import { Card, CardHeader, CardTitle, CardContent } from "@starter/ui/components/card";
import { Input } from "@starter/ui/components/input";
import { Dialog, DialogTrigger, DialogContent } from "@starter/ui/components/dialog";
```

### Importing Utilities

```tsx
import { cn } from "@starter/ui/lib/utils";
```

### Importing Hooks

```tsx
import { useMobile } from "@starter/ui/hooks/use-mobile";
```

### Importing Global Styles

```tsx
import "@starter/ui/globals.css";
```

## 📚 Available Components

The package ships a curated set of components:

| Category         | Components                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Layout**       | `card`, `separator`, `resizable`, `scroll-area`, `aspect-ratio`                                                                   |
| **Forms**        | `button`, `input`, `textarea`, `checkbox`, `radio-group`, `select`, `switch`, `slider`, `calendar`, `input-otp`, `field`, `label` |
| **Feedback**     | `alert`, `alert-dialog`, `dialog`, `drawer`, `sheet`, `sonner`, `spinner`, `skeleton`, `progress`                                 |
| **Navigation**   | `breadcrumb`, `navigation-menu`, `menubar`, `tabs`, `pagination`, `sidebar`                                                       |
| **Data Display** | `table`, `badge`, `avatar`, `chart`, `carousel`, `hover-card`, `tooltip`                                                          |
| **Overlays**     | `popover`, `dropdown-menu`, `context-menu`, `command`                                                                             |
| **Misc**         | `accordion`, `collapsible`, `toggle`, `toggle-group`, `kbd`, `empty`, `item`, `button-group`, `input-group`                       |

## 🎨 Color System

The design system uses semantic color names via CSS variables:

```tsx
// ✅ Correct - Use semantic colors
<div className="bg-background text-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-muted text-muted-foreground">
<div className="bg-destructive text-destructive-foreground">
<div className="border-border">

// ❌ Wrong - Don't use arbitrary colors
<div className="bg-[#ffffff]">
<div className="bg-gray-100">
```

### Available Colors

- `background` / `foreground` - Base colors
- `card` / `card-foreground` - Card backgrounds
- `popover` / `popover-foreground` - Popover backgrounds
- `primary` / `primary-foreground` - Primary brand colors
- `secondary` / `secondary-foreground` - Secondary colors
- `muted` / `muted-foreground` - Muted/subtle colors
- `accent` / `accent-foreground` - Accent highlights
- `destructive` / `destructive-foreground` - Error/destructive
- `border`, `input`, `ring` - Border and focus colors
- `chart-1` through `chart-5` - Chart colors

## 🌙 Dark Mode

Colors automatically support dark mode. The system uses CSS variables that change based on the `.dark` class:

```tsx
// No need for dark: variants - colors adapt automatically
<div className="bg-background text-foreground">
```

## 🔧 Configuration

The package uses the "base-nova" style variant of shadcn/ui with:

- **Base Color**: Neutral
- **CSS Variables**: Enabled
- **Icon Library**: Lucide React

## 📖 Related Documentation

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [base-ui Documentation](https://base-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
