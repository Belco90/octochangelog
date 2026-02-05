# Code Style Guide

This guide describes code conventions, automated tooling, and style enforcement capabilities.

## Automated Code Quality

The project uses automated tooling to maintain consistent code style:

- **ESLint** for code quality and best practices
- **Prettier** for formatting
- **TypeScript** for type safety

These tools run automatically during development and CI.

## Linting and Formatting Commands

```bash
# Check for code quality issues
pnpm lint

# Auto-fix issues where possible
pnpm lint:fix

# Check code formatting
pnpm format:check

# Auto-format all files
pnpm format
```

Linting runs with zero-warning tolerance in CI (build fails on warnings).

## TypeScript Conventions

### Type Safety

TypeScript strict mode is enabled with additional strictness:

- Unused local variables trigger errors
- Unused function parameters trigger errors

This encourages clean, intentional code.

### Preferred Syntax

**Type imports**: Use explicit type imports for clarity

```typescript
// Preferred
import type { ComponentProps } from 'react'
import { useState } from 'react'

// Avoid
import { ComponentProps, useState } from 'react'
```

**Array types**: Use generic syntax

```typescript
// Preferred
const items: Array<string> = []
const users: Array<User> = []

// Avoid
const items: string[] = []
const users: User[] = []
```

**Type exports**: Keep type exports separate and consistent

```typescript
// Preferred
export type { MyType, AnotherType }
```

## Import Organization

ESLint enforces a specific import order for consistency:

### Order Rules

1. Built-in Node.js modules
2. External packages from node_modules
3. Internal modules using path aliases (`@/*`)
4. Relative imports (parent/sibling)
5. Type imports (always last)

Groups are separated by blank lines and sorted alphabetically within each group.

### Example

```typescript
// 1. Built-ins
import { readFile } from 'node:fs/promises'

// 2. External
import { Box, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

// 3. Internal
import { githubClient } from '@/lib/github'
import { parseReleases } from '@/utils'

// 4. Relative
import { useComparator } from '../comparator-context'
import { ComparatorHeader } from './ComparatorHeader'

// 5. Types
import type { Release } from '@octokit/rest'
```

## React Patterns

### Component Style

Use function components with hooks:

```typescript
export function MyComponent({ title }: { title: string }) {
	const [state, setState] = useState('')
	return <Box>{title}</Box>
}
```

### Hook Rules

React hooks rules are enforced automatically:

- Only call hooks at the top level
- Only call hooks from React functions
- Hook names must start with `use`

ESLint will catch violations of these rules.

## Linting Rules

The ESLint configuration includes plugins for:

- TypeScript best practices
- React and React hooks
- Import/export validation and ordering
- JSX accessibility
- TanStack Query and Router conventions
- Vitest and Playwright test best practices
- General JavaScript/Node.js quality

Key enforced rules:

- **No console.log**: Use proper logging if needed
- **Import order**: Automatic grouping and sorting
- **Accessibility**: JSX accessibility checks
- **Type safety**: Strict checking, no unused variables

CI runs with `--max-warnings 0` (any warnings fail the build).

## Formatting Rules

Prettier handles all formatting automatically with these settings:

- Single quotes for strings
- No semicolons
- Tabs for indentation
- Trailing commas where valid in ES5

Formatting runs automatically:

- On file save (if editor is configured)
- Via pre-commit hook (staged files only)
- Manually with `pnpm format`

## Special Conventions

### Chakra UI v3 Patterns

**Critical**: This project uses Chakra UI v3, which has significant API differences from v2:

```typescript
// Correct - Chakra v3 compound components
import { Dialog } from '@chakra-ui/react'

<Dialog.Root open={isOpen}>
  <Dialog.Content>
    <Dialog.Title>Title</Dialog.Title>
  </Dialog.Content>
</Dialog.Root>

// Wrong - Chakra v2 pattern (no longer works)
<Modal isOpen={isOpen}>
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
  </ModalContent>
</Modal>
```

**Component Import Sources**:
```typescript
// Import base components from @chakra-ui/react
import { Box, Button, Input, Alert } from '@chakra-ui/react'

// Import snippet components from components/snippets
import { ColorModeButton } from '@/components/snippets/color-mode'
import { Tooltip } from '@/components/snippets/tooltip'
```

**Prop Naming**:
```typescript
// Correct - v3 semantic naming
<Button disabled loading>Submit</Button>
<Dialog.Root open={isOpen}>

// Wrong - v2 "is" prefix (no longer works)
<Button isDisabled isLoading>Submit</Button>
<Modal isOpen={isOpen}>
```

**Color Tokens**:
```typescript
// Preferred - semantic tokens that adapt to light/dark mode
<Box bg="bg" color="fg" borderColor="border.muted" />

// Alternative - useColorModeValue for custom values
import { useColorModeValue } from '@/components/snippets/color-mode'
const bg = useColorModeValue('white', 'gray.800')
```

For comprehensive Chakra v3 patterns and migration rules, see [docs/CHAKRA-V3.md](./CHAKRA-V3.md).

### Playwright Test Imports

**Critical**: Always import from the project's Playwright utilities:

```typescript
// Correct
import { test, expect } from './playwright-utils'

// Wrong - bypasses custom fixtures
import { test, expect } from '@playwright/test'
```

### Path Aliases

Use path aliases for cleaner imports:

```typescript
// Preferred
import { utils } from '@/utils'
import logo from '@/public/logo.png'

// Avoid
import { utils } from '../../utils'
import logo from '../../public/logo.png'
```

Configuration for path aliases lives in TypeScript and build tool configs.
