# @starter/shared

Shared utilities used across the monorepo.

## Overview

This package provides:

- **NanoID** - Unique ID generation
- **Utilities** - Common helper functions
- **Shared Types** - TypeScript type definitions

## Usage

### Importing

```typescript
import { nanoid } from "@starter/shared/nanoid";
```

### NanoID

```typescript
import { nanoid } from "@starter/shared/nanoid";

// Generate a unique ID
const id = nanoid(); // "V1StGXR8_Z5jdHi6B-myT"

// Generate with custom length
const shortId = nanoid(10); // "V1StGXR8_Z"
```

## Project Structure

```
shared/
├── src/
│   └── nanoid.ts       # NanoID utility
└── package.json
```

## Key Dependencies

- `nanoid` - Small, fast, URL-friendly unique ID generator

## Exports

| Export   | Path                     | Description          |
| -------- | ------------------------ | -------------------- |
| `nanoid` | `@starter/shared/nanoid` | Unique ID generation |

## Learn More

- [NanoID Documentation](https://github.com/ai/nanoid)
