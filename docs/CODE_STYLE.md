# Code Style Guide

This guide covers TypeScript conventions, linting, formatting, and coding patterns.

## Linting and Formatting

### Commands

```bash
# Run ESLint (fails on warnings in CI)
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Check code formatting with Prettier
pnpm format:check

# Auto-format code with Prettier
pnpm format
```

### Configuration Files

- **ESLint**: `eslint.config.js` (flat config format)
- **Prettier**: `prettier.config.js`
- **lint-staged**: `lint-staged.config.js` (used by pre-commit hook)

## TypeScript Conventions

### Strict Mode

TypeScript strict mode is enabled with additional checks:

- `noUnusedLocals`: Error on unused local variables
- `noUnusedParameters`: Error on unused function parameters

### Type Imports

Prefer type imports for types and interfaces:

```typescript
// Correct
import type { ComponentProps } from 'react'
import { useState } from 'react'

// Avoid
import { ComponentProps, useState } from 'react'
```

### Array Types

Use `Array<T>` syntax instead of `T[]`:

```typescript
// Correct
const items: Array<string> = []
const users: Array<User> = []

// Avoid
const items: string[] = []
const users: User[] = []
```

### Type Exports

Maintain consistent type exports:

```typescript
// Correct
export type { MyType }
export type { AnotherType, YetAnotherType }

// Avoid mixing default and named exports for types
```

## Import Order

ESLint enforces import ordering via `eslint-plugin-import-x`:

### Order

1. **Built-in modules** (Node.js built-ins)
2. **External modules** (from node_modules)
3. **Internal modules** (using `@/*` path alias)
4. **Parent/sibling modules** (relative imports)
5. **Type imports** (always last)

### Formatting

- Newlines between groups
- Alphabetically sorted within groups

### Example

```typescript
// 1. Built-in modules
import { readFile } from 'node:fs/promises'

// 2. External modules
import { useQuery } from '@tanstack/react-query'
import { Box, Text } from '@chakra-ui/react'

// 3. Internal modules
import { githubClient } from '@/github-client'
import { parseReleases } from '@/utils'

// 4. Parent/sibling modules
import { ComparatorHeader } from './ComparatorHeader'
import { useComparator } from '../comparator-context'

// 5. Type imports
import type { Release } from '@octokit/rest'
```

## React Conventions

### Component Patterns

Prefer function components with hooks:

```typescript
export function MyComponent({ title }: { title: string }) {
	const [state, setState] = useState('')

	return <Box>{title}</Box>
}
```

### Hooks

Follow React hooks rules (enforced by `eslint-plugin-react-hooks`):

- Only call hooks at the top level
- Only call hooks from React functions
- Hooks must start with `use`

## ESLint Configuration

### Enabled Plugins

- `@typescript-eslint` - TypeScript-specific rules
- `@eslint-react` - React best practices
- `eslint-plugin-react-hooks` - React hooks rules
- `eslint-plugin-import-x` - Import/export validation and ordering
- `eslint-plugin-jsx-a11y` - Accessibility rules for JSX
- `eslint-plugin-unicorn` - Additional JavaScript/Node.js best practices
- `@tanstack/eslint-plugin-query` - TanStack Query best practices
- `@tanstack/eslint-plugin-router` - TanStack Router best practices
- `@vitest/eslint-plugin` - Vitest test best practices
- `eslint-plugin-playwright` - Playwright test best practices (E2E files only)

### Key Rules

- **No console.log**: Warns on console statements (use proper logging if needed)
- **Import order**: Enforced grouping and sorting
- **React accessibility**: JSX accessibility checks enabled
- **Strict TypeScript**: Type checking and no unused variables

### CI Behavior

In CI, ESLint runs with `--max-warnings 0` (fails on any warnings).

## Prettier Configuration

### Settings

```javascript
{
  singleQuote: true,      // Use single quotes
  semi: false,            // No semicolons
  useTabs: true,          // Use tabs for indentation
  trailingComma: 'es5'    // Trailing commas where valid in ES5
}
```

### Auto-formatting

Prettier runs automatically:

- On file save (if your editor is configured)
- Via pre-commit hook (on staged files)
- Manually with `pnpm format`

## Playwright Test Imports

**Important**: Always import test utilities from `e2e/playwright-utils.ts`:

```typescript
// Correct
import { test, expect } from './playwright-utils'

// Incorrect - DO NOT DO THIS
import { test, expect } from '@playwright/test'
```

This ensures consistent test fixtures and helpers across all E2E tests.

## Path Aliases

Use path aliases for cleaner imports:

```typescript
// Correct
import { utils } from '@/utils'
import logo from '@/public/logo.png'

// Avoid
import { utils } from '../../utils'
import logo from '../../public/logo.png'
```

Path aliases are defined in `tsconfig.json`:

- `@/*` → `./src/*`
- `@/public/*` → `./public/*`
