# @starter/tsconfig

Shared TypeScript configurations for the starter boilerplate monorepo.

## 🎯 Purpose

This package provides standardized TypeScript configurations to ensure consistent type checking and compiler options across all packages and applications.

## 📦 Available Configurations

### `base.json`

Base TypeScript configuration with strict settings. Suitable for most packages.

```json
{
  "extends": "@starter/tsconfig/base.json"
}
```

**Features:**

- Strict type checking enabled
- ES2022 target + libs
- ESNext modules with bundler resolution
- Isolated modules and JSON module support

### `bun.json`

Configuration optimized for Bun runtime applications.

```json
{
  "extends": "@starter/tsconfig/bun.json"
}
```

**Features:**

- ESNext target and DOM libs
- JSX support (react-jsx)
- Allow JS + TS extension imports
- No emit for Bun runtime

### `react-library.json`

Configuration for React library packages.

```json
{
  "extends": "@starter/tsconfig/react-library.json"
}
```

**Features:**

- JSX support for component libraries
- Builds on library.json defaults

### `tanstack-start.json`

Configuration for TanStack Start applications.

```json
{
  "extends": "@starter/tsconfig/tanstack-start.json"
}
```

**Features:**

- Vite client types and JSX support
- No emit with side-effect import checks

### `library.json`

General-purpose library config for non-React packages.

```json
{
  "extends": "@starter/tsconfig/library.json"
}
```

### `node.json`

Configuration for Node-style tooling or scripts.

```json
{
  "extends": "@starter/tsconfig/node.json"
}
```

## 🔧 Usage

1. Add the package as a dev dependency in your `package.json`:

```json
{
  "devDependencies": {
    "@starter/tsconfig": "workspace:*"
  }
}
```

2. Extend the appropriate config in your `tsconfig.json`:

```json
{
  "extends": "@starter/tsconfig/base.json",
  "compilerOptions": {
    // Override or add options as needed
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## 📖 Related Documentation

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig)
