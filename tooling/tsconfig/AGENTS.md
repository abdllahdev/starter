# AGENTS.md - TSConfig Package (@starter/tsconfig)

## Overview

Shared TypeScript configs for monorepo.

## Configs

- `base.json` - Base config (strict, ES2022)
- `bun.json` - Bun-specific settings
- `library.json` - For packages
- `node.json` - For Node.js apps
- `react-library.json` - For React packages
- `tanstack-start.json` - For TanStack Start app

## Usage

```json
{
  "extends": "@starter/tsconfig/bun.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

## Add Config

1. Create JSON file in `tooling/tsconfig/`
2. Reference via `extends` in packages/apps
