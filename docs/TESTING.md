# Testing Guide

This guide covers unit testing with Vitest and E2E testing with Playwright.

## Unit Tests (Vitest)

### Running Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode (for development)
pnpm test:watch

# Run tests with coverage (used in CI)
pnpm test:ci
```

### Test Configuration

- **Test files**: Located in `src/__tests__/`
- **Config**: `vitest.config.ts` (imported from `vite.config.ts`)
- **Setup file**: `src/vitest.setup.ts`
- **Test utilities**: `src/test-utils.tsx` (React Testing Library setup)
- **Excludes**: E2E tests in `e2e/` directory are excluded from Vitest

### Test Output

In CI mode (`pnpm test:ci`), tests generate:

- `test-report.junit.xml` - JUnit format test results
- Coverage reports in `coverage/` directory

### Coverage

Current coverage: ~16% (focused on utility functions)

Coverage is generated using `@vitest/coverage-v8` and reported to Codecov in CI.

### MSW in Unit Tests

MSW (Mock Service Worker) behavior in unit tests is controlled by the `VITE_API_MOCKING` environment variable:

- `enabled`: Uses MSW handlers from `src/mocks/handlers/`
- `disabled`: No mocking (tests may make real API calls or fail)

## E2E Tests (Playwright)

### Running E2E Tests

```bash
# Run all E2E tests
pnpm e2e

# Run with UI mode (interactive)
pnpm e2e:ui

# Show test report after running
pnpm e2e:report
```

### Test Configuration

- **Test files**: Located in `e2e/` directory
- **Config**: `playwright.config.ts`
- **Test utilities**: `e2e/playwright-utils.ts`
- **Browser**: Chromium only (configured in `playwright.config.ts`)

### E2E Test Files

- `e2e/compare.spec.ts` - Changelog comparison functionality
- `e2e/auth.spec.ts` - GitHub OAuth authentication
- `e2e/home.spec.ts` - Home page and search
- `e2e/not-found.spec.ts` - 404 handling

### Test Environment

**Local development**:

- Runs against `http://localhost:3000`
- Uses `pnpm dev:mock` via webServer config (starts automatically)
- MSW mocking is automatically enabled

**CI environment**:

- Runs against `http://localhost:4173`
- Uses `pnpm preview` (requires prior `pnpm build`)
- MSW mocking enabled via `VITE_API_MOCKING=enabled`
- Runs in Playwright container: `mcr.microsoft.com/playwright:v1.57.0-noble`

### Visual Testing

E2E tests are integrated with Happo for visual regression testing:

```bash
# Run E2E tests with visual snapshots
pnpm run happo -- pnpm run e2e
```

Visual snapshots are uploaded to Happo and compared against baseline images.

### Important Playwright Conventions

**Always import test from playwright-utils**:

```typescript
// Correct
import { test, expect } from '../playwright-utils'

// Incorrect - DO NOT DO THIS
import { test, expect } from '@playwright/test'
```

The `playwright-utils.ts` file provides custom fixtures and helpers.

## Test Fixtures

### GitHub API Mock Data

Mock responses are stored in `src/fixtures/github/`:

- Repository data
- Release data
- User data

### MSW Handlers

API mocking handlers are defined in `src/mocks/handlers/`:

- Request interception
- Response stubbing
- Error simulation

### Limited Mock Data

**Important**: Mock data only includes:

- "testing library" repositories
- "renovate" repositories

Tests that search for other repositories will not find results when mocking is enabled.

### MSW Setup Files

- **Browser**: `src/mocks/browser.ts` - Used in development with `pnpm dev:mock`
- **Node**: `src/mocks/server.ts` - Used in unit tests and E2E tests

## Troubleshooting

### E2E tests fail locally

- Ensure no dev server is already running on port 3000
- Check that `VITE_API_MOCKING=enabled` if you need mocked data
- Verify build artifact exists if running against preview server

### Unit tests can't find modules

- Run `pnpm install` to ensure dependencies are installed
- Check that path aliases in `tsconfig.json` match imports

### Coverage reports missing

- Ensure you're running `pnpm test:ci` (not just `pnpm test`)
- Check that `@vitest/coverage-v8` is installed
