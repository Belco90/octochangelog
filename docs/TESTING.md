# Testing Guide

This guide describes the testing capabilities and approaches used in the project.

## Testing Layers

The project has three primary testing strategies:

1. **Unit Tests** - Test individual functions and components in isolation (Node environment)
2. **Component Tests** - Test React components in a real browser environment
3. **E2E Tests** - Test complete user workflows in a real browser environment

All layers use mocked GitHub API responses for consistency and reliability.

## Test Projects Configuration

This project uses [Vitest's projects feature](https://vitest.dev/guide/workspace.html) to separate unit and browser tests into distinct projects. This enables:

- **Faster unit tests**: Run in Node environment without browser overhead
- **Isolated browser tests**: Run only component tests that need real browser APIs
- **Selective test execution**: Run specific test types independently
- **Better organization**: Clear separation between test environments

The configuration is defined in `vite.config.ts`:

```typescript
test: {
  projects: [
    {
      name: 'unit',
      test: {
        include: [
          'src/__tests__/unit/**/*.test.{ts,tsx}',  // Unit tests directory
          'src/**/*.unit.test.{ts,tsx}',            // Explicit .unit.test files anywhere
        ],
        environment: 'node',
      },
    },
    {
      name: 'browser',
      test: {
        include: [
          'src/__tests__/browser/**/*.test.{ts,tsx}',  // Browser tests directory
          'src/**/*.browser.test.{ts,tsx}',            // Explicit .browser.test files anywhere
        ],
        browser: {
          enabled: true,
          provider: playwright(),
          instances: [{ browser: 'chromium' }],
        },
      },
    },
  ],
}
```

### Test File Organization

Tests are organized into dedicated directories and by naming convention:

**Unit Tests (run in Node environment):**

- `src/__tests__/unit/` - Primary location for unit tests
  - Example: `src/__tests__/unit/utils.test.ts`
- `src/**/*.unit.test.ts` - Explicit unit tests anywhere (TypeScript)
- `src/**/*.unit.test.tsx` - Explicit unit tests anywhere (React/TSX)
  - Example: `src/services/api.unit.test.ts`

**Browser Tests (run in Chromium browser):**

- `src/__tests__/browser/` - Primary location for component/browser tests
  - Example: `src/__tests__/browser/Button.test.tsx`
  - Shared utilities: `src/__tests__/browser/test-utils.tsx`
- `src/**/*.browser.test.ts` - Explicit browser tests anywhere (TypeScript)
- `src/**/*.browser.test.tsx` - Explicit browser tests anywhere (React/TSX)
  - Example: `src/utils/dom.browser.test.ts`

**Naming Convention Guidelines:**

**Prefer directory-based organization** (recommended):

- Place unit tests in `src/__tests__/unit/` directory
- Place browser/component tests in `src/__tests__/browser/` directory
- This is the primary organization method for the project

**Use explicit naming** (`.unit.test.*` or `.browser.test.*`) when:

- You need to co-locate unit and browser tests for the same module
- Testing browser-specific utilities outside of the main test directories
- A test file could be ambiguous about which environment it needs

Examples:

```
src/__tests__/
  unit/
    utils.test.ts              # Unit tests (preferred location)
    apiHelpers.test.ts
  browser/
    Button.test.tsx            # Browser tests (preferred location)
    Modal.test.tsx
    test-utils.tsx             # Shared browser test utilities

src/services/
  github.unit.test.ts          # Co-located unit test (explicit naming)

src/utils/
  dom.browser.test.ts          # Browser-specific util test (explicit naming)
```

## Unit Testing

### Running Unit Tests

```bash
# Run all tests (both unit and browser)
pnpm test

# Run only unit tests (faster - Node environment)
pnpm test:unit

# Watch mode for unit tests only
pnpm test:unit:watch

# Watch mode for all tests
pnpm test:watch

# All tests with coverage (used in CI)
pnpm test:ci
```

### Unit Test Capabilities

Unit tests focus on:

- Utility functions and data transformations
- Component behavior in isolation
- Hook logic
- API response parsing

Tests run in a Node environment using Vitest with React Testing Library support. Coverage reports are generated in CI mode.

### Mocking in Unit Tests

The `VITE_API_MOCKING` environment variable controls API mocking behavior. When enabled, MSW handlers intercept requests just like in development mode.

Test utilities and setup helpers can be found by searching for test-related configuration files.

## Component Testing

### Overview

Component tests use **Vitest Browser Mode** to test React components in a real browser environment (Chromium). Unlike unit tests that run in Node, component tests execute in an actual browser with real DOM APIs, CSS rendering, and user interactions.

### Running Component Tests

```bash
# Run only browser tests (browser visible) - useful for debugging
pnpm test:browser

# Run with Vitest UI for better debugging experience
pnpm test:browser:ui

# Run in headless mode (no visible browser) - used in CI
pnpm test:browser:headless

# Run all tests (both unit and browser)
pnpm test
```

The `test:browser` commands now use the `--project browser` flag to run only component tests in the browser project, making them faster by skipping unit tests.

### When to Use Component Tests vs Unit Tests

**Use Component Tests for:**

- Components with complex styling or CSS-in-JS behavior
- Components that interact with browser APIs (localStorage, sessionStorage, etc.)
- Testing actual user interactions (clicks, typing, etc.)
- Visual components where layout and rendering matter
- Components that need to render in a ChakraProvider context

**Use Unit Tests for:**

- Pure functions and utilities
- Business logic and data transformations
- Simple component logic that doesn't require browser APIs
- Fast feedback loops during development

### Test File Location

Component/browser tests are centrally located in the `src/__tests__/browser/` directory:

```
src/
  __tests__/
    browser/
      test-utils.tsx          # Shared test utilities for browser tests
      Button.test.tsx         # Component tests
      Modal.test.tsx
      OptimizedImage.test.tsx
  components/
    Button.tsx                # Component source files
    Modal.tsx
    OptimizedImage.tsx
```

This centralized structure:

- Makes it easy to find all browser tests in one location
- Keeps component source files clean and focused
- Provides a clear home for shared test utilities (`test-utils.tsx`)
- Aligns with the unit test structure in `src/__tests__/unit/`

### Writing Component Tests

#### Basic Example

```typescript
// src/__tests__/browser/MyComponent.test.tsx
import { render, userEvent } from './test-utils'
import { expect } from 'vitest'
import { MyComponent } from '@/components/MyComponent'

it('should render with correct text', async () => {
  // IMPORTANT: render() is async - always await it!
  const screen = await render(<MyComponent text="Hello World" />)

  // Query elements from the screen object returned by render()
  const heading = screen.getByRole('heading', { name: /hello world/i })

  // Use toBeVisible() instead of toBeInTheDocument()
  await expect.element(heading).toBeVisible()
})
```

#### Test Utilities

The `test-utils.tsx` file provides:

- **`render()`**: Wraps components with `ChakraProvider` and custom theme (all components need this). **MUST be awaited!**
- **`userEvent`**: Browser-based user interaction APIs

Import `expect` and `vi` directly from `vitest`:

```typescript
import { render, userEvent } from './test-utils'
import { expect, vi } from 'vitest'
```

#### Querying Elements

**IMPORTANT**: Always query elements from the `screen` object returned by `render()`, not from the global `page` object.

```typescript
// ✅ CORRECT: Use screen returned by render()
const screen = await render(<MyComponent />)
const button = screen.getByRole('button', { name: /submit/i })

// ❌ INCORRECT: Don't use global page object
const button = page.getByRole('button', { name: /submit/i })
```

Query methods available on `screen`:

```typescript
// By role (preferred - most accessible)
const button = screen.getByRole('button', { name: /submit/i })
const heading = screen.getByRole('heading', { level: 1 })

// By text
const element = screen.getByText(/welcome/i)

// By test ID
const container = screen.getByTestId('my-container')

// By label
const input = screen.getByLabel(/email address/i)
```

#### Assertions

Use `expect.element()` for DOM assertions (these auto-retry). **Use `toBeVisible()` instead of `toBeInTheDocument()`**:

```typescript
// Visibility (preferred)
await expect.element(button).toBeVisible()

// Attributes
await expect.element(button).toHaveAttribute('aria-label', 'Submit')
await expect.element(link).toHaveAttribute('href', '/about')

// Text content
await expect.element(heading).toHaveTextContent('Welcome')

// Semantic HTML checks
const element = button.element()
expect(element.tagName.toLowerCase()).toBe('button')
```

#### User Interactions

Use element's click method or userEvent for interactions:

```typescript
import { userEvent } from './test-utils'

// Click (using element method)
const button = screen.getByRole('button')
await button.click()

// Type
await userEvent.fill(input, 'test@example.com')

// Keyboard
await userEvent.keyboard('Enter')
```

### Mocking in Component Tests

#### Mocking Modules

Use Vitest's `vi.mock()` at the top of your test file:

```typescript
import { expect, vi } from 'vitest'

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
	useSearch: vi.fn(() => ({})),
	createLink: vi.fn((comp) => comp),
}))

// Mock with implementation
vi.mock('@/github-auth', () => ({
	getGitHubAuthUrl: vi.fn(() => 'https://github.com/oauth'),
}))
```

#### Mocking Browser APIs

```typescript
import { expect, vi } from 'vitest'

// Mock sessionStorage
const getItemSpy = vi.spyOn(window.sessionStorage, 'getItem')
getItemSpy.mockReturnValue('mock-value')

// Verify calls
expect(getItemSpy).toHaveBeenCalledWith('key')
```

### Common Patterns

#### Testing Interactive Components

```typescript
import { render } from './test-utils'
import { expect } from 'vitest'

it('should toggle state on click', async () => {
  const screen = await render(<ToggleButton />)

  const button = screen.getByRole('button')

  // Initial state
  await expect.element(button).toHaveAttribute('aria-pressed', 'false')

  // Click and verify state change
  await button.click()
  await expect.element(button).toHaveAttribute('aria-pressed', 'true')
})
```

#### Testing Components with Context

Components automatically receive ChakraProvider context via the `render()` utility:

```typescript
import { render } from './test-utils'
import { expect } from 'vitest'

it('should use theme colors', async () => {
  const screen = await render(<ThemedComponent />)

  const element = screen.getByTestId('themed-element').element()
  const style = window.getComputedStyle(element)

  // Theme colors are available
  expect(style.color).toBeTruthy()
})
```

#### Testing Async Rendering

The `render()` function is async, so always await it:

```typescript
import { render } from './test-utils'
import { expect } from 'vitest'

it('should render async component', async () => {
  const screen = await render(<AsyncComponent />)

  // Query from container if needed for complex selectors
  const element = screen.container.querySelector('.custom-class')
  expect(element).toBeTruthy()
})
```

### Best Practices

Following these best practices ensures your tests are reliable, maintainable, and follow the recommended patterns from [vitest-browser-react](https://www.npmjs.com/package/vitest-browser-react):

1. **Always await `render()`**: The render function is async and must be awaited

   ```typescript
   // ✅ CORRECT
   const screen = await render(<MyComponent />)

   // ❌ INCORRECT
   render(<MyComponent />)
   ```

2. **Query from `screen`, not global `page`**: Use the object returned by `render()`

   ```typescript
   // ✅ CORRECT
   const screen = await render(<MyComponent />)
   const button = screen.getByRole('button')

   // ❌ INCORRECT
   await render(<MyComponent />)
   const button = page.getByRole('button')
   ```

3. **Use `toBeVisible()` instead of `toBeInTheDocument()`**: More reliable in browser tests

   ```typescript
   // ✅ CORRECT
   await expect.element(button).toBeVisible()

   // ❌ INCORRECT (works but not recommended)
   await expect.element(button).toBeInTheDocument()
   ```

4. **Mock modules at the top of the file**: `vi.mock()` must be hoisted before all imports

   ```typescript
   // ✅ CORRECT
   import { expect, vi } from 'vitest'

   vi.mock('@tanstack/react-router', () => ({
     useSearch: vi.fn(() => ({}))
   }))

   import { MyComponent } from '../MyComponent'

   // ❌ INCORRECT - mock after component import
   import { MyComponent } from '../MyComponent'
   import { vi } from 'vitest'
   vi.mock('@tanstack/react-router', ...)
   ```

5. **Always await element queries before assertions**: Ensures elements are found

   ```typescript
   // ✅ CORRECT
   const button = screen.getByRole('button')
   await expect.element(button).toBeVisible()

   // Also correct for direct access
   const element = button.element()
   expect(element.textContent).toBe('Click me')
   ```

6. **Name tests with "should"**: Start test descriptions with "should" or "should not" to clearly express expected behavior

   ```typescript
   // ✅ CORRECT - clear, behavioral descriptions
   it('should render with correct text', async () => {
   	/* ... */
   })
   it('should toggle state on click', async () => {
   	/* ... */
   })
   it('should not submit when form is invalid', async () => {
   	/* ... */
   })

   // ❌ INCORRECT - vague or non-behavioral descriptions
   it('renders with correct text', async () => {
   	/* ... */
   })
   it('toggle test', async () => {
   	/* ... */
   })
   it('form validation', async () => {
   	/* ... */
   })
   ```

7. **Use `describe()` blocks only for organization, not component names**: Reserve `describe()` for grouping related tests by context or state, not for wrapping all tests of a component

   ```typescript
   // ✅ CORRECT - no outer describe block
   it('should render with correct text', async () => {
     const screen = await render(<MyComponent text="Hello" />)
     const heading = screen.getByRole('heading')
     await expect.element(heading).toBeVisible()
   })

   it('should handle click events', async () => {
     // ...
   })

   // ✅ ALSO CORRECT - describe for organizing related tests
   describe('when user is logged in', () => {
     it('should show profile', async () => { /* ... */ })
     it('should show logout button', async () => { /* ... */ })
   })

   describe('when user is logged out', () => {
     it('should show login button', async () => { /* ... */ })
     it('should hide profile', async () => { /* ... */ })
   })

   // ❌ INCORRECT - outer describe just for component name
   describe('MyComponent', () => {
     it('should render with correct text', async () => { /* ... */ })
     it('should handle click events', async () => { /* ... */ })
   })
   ```

8. **Focus tests on behavior, not styling**: Test what the component does, not how it looks. Avoid assertions on computed styles, colors, fonts, sizes, etc.

   ```typescript
   // ✅ CORRECT - testing behavior
   await expect.element(button).toBeVisible()
   await expect.element(button).toHaveAttribute('aria-pressed', 'true')
   await expect.element(link).toHaveTextContent('Home')
   expect(linkElement.tagName.toLowerCase()).toBe('a')

   // ❌ INCORRECT - testing styling
   const style = window.getComputedStyle(element)
   expect(style.backgroundColor).toBe('rgb(0, 0, 0)')
   expect(style.fontSize).toBe('16px')
   expect(style.borderRadius).toBe('9999px')
   await expect.element(button).toHaveStyle({ color: 'blue' })
   ```

   Style tests are fragile and break when design changes. They also don't test actual functionality that users care about.

### Debugging Component Tests

#### Run with UI

The Vitest UI provides the best debugging experience:

```bash
pnpm test:browser:ui
```

This opens a web interface where you can:

- See which tests are running
- View console logs and errors
- Inspect test results
- Re-run individual tests

#### Run in Headed Mode

See the browser while tests run:

```bash
pnpm test:browser
```

#### Console Logs

Regular `console.log()` statements work in component tests and appear in the terminal.

#### Breakpoints

Use `debugger` statements in your test code - the browser will pause when running in headed mode.

### Known Limitations

1. **Type Conflicts**: The `playwright()` provider in `vite.config.ts` has a `@ts-expect-error` due to pnpm creating duplicate type definitions. This doesn't affect runtime behavior.

2. **Router Components**: Components using TanStack Router need proper mocking:

   ```typescript
   vi.mock('@tanstack/react-router', () => ({
   	useSearch: vi.fn(() => ({})),
   	createLink: vi.fn((comp) => comp),
   	ClientOnly: ({ children }: any) => children,
   }))
   ```

3. **Strict Route Typing**: The `RouteLink` component has strict TypeScript types for routes. Only use valid route paths that exist in your application (`/`, `/compare`, etc.).

4. **Async Render**: Unlike React Testing Library, `render()` returns a Promise and must be awaited.

### CI Integration

Component tests run in headless mode in CI:

```yaml
- name: Run component tests
  run: pnpm test:browser:headless
```

The configuration automatically enables headless mode when `process.env.CI` is set.

Test utilities and setup helpers can be found by searching for test-related configuration files.

## E2E Testing

### Running E2E Tests

```bash
# Run all browser tests
pnpm e2e

# Interactive mode with UI
pnpm e2e:ui

# View last test report
pnpm e2e:report
```

### E2E Test Capabilities

E2E tests verify complete user workflows including:

- Changelog comparison between releases
- GitHub OAuth authentication flow
- Search and repository selection
- Error handling and 404 pages

Tests run in Chromium using Playwright. The test server starts automatically with mocked API responses.

### Test Environments

**Local development**: Runs against dev server (port 3000) with automatic mocking

**CI environment**: Runs against production build preview (port 4173)

The test configuration handles server startup automatically.

### Visual Regression Testing

E2E tests integrate with Happo for visual snapshot comparison:

```bash
pnpm run happo -- pnpm run e2e
```

Visual changes are detected by comparing screenshots against baseline images.

### Playwright Test Imports

**Critical Convention**: Always import test utilities from the project's Playwright utils, not directly from `@playwright/test`:

```typescript
// Correct - uses custom fixtures
import { test, expect } from '../playwright-utils'

// Wrong - misses custom test helpers
import { test, expect } from '@playwright/test'
```

The custom utilities file provides extended fixtures and helpers.

## Test Data and Mocking

### Mock API Responses

GitHub API responses are mocked using MSW (Mock Service Worker). This provides:

- Consistent test data across runs
- Fast tests without network calls
- No rate limiting concerns
- Offline development capability

Mock data is organized by API source. Handlers intercept specific request patterns and return fixture data.

### Limited Mock Data

**Important**: Mock fixtures only include specific repositories:

- "testing library" repositories
- "renovate" repositories

Tests searching for other repositories won't find results when mocking is enabled. When writing tests, use these known repository names.

### Mock Setup

- **Browser context**: Used during `pnpm dev:mock`
- **Node context**: Used during unit and E2E tests

Both contexts share the same handlers but initialize differently based on the environment.

## Common Issues

### E2E tests fail locally

- Ensure dev server isn't already running on port 3000
- Check `VITE_API_MOCKING=enabled` if using mocked data
- Verify production build exists when running against preview server

### Unit tests can't find modules

- Run `pnpm install` to sync dependencies
- Check path aliases match between test config and imports

### Missing coverage reports

- Use `pnpm test:ci` instead of `pnpm test`
- Ensure coverage tooling is installed
