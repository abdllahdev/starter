# AGENTS.md - Shared Package (@starter/shared)

## Overview

Small shared utilities.

## Contents

- `src/nanoid.ts` - Custom NanoID helper (16 chars, lowercase alphanumeric)

## Usage

```typescript
import { nanoid } from "@starter/shared/nanoid";

const id = nanoid(); // e.g., "a1b2c3d4e5f6g7h8"
```

## Add Utility

1. Create file in `src/`
2. Export in `package.json` exports field
3. Import via `@starter/shared/<file>`
