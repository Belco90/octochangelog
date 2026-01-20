# Testing Guide

This guide describes the testing capabilities and approaches used in the project.

## Testing Layers

The project has two primary testing strategies:

1. **Unit Tests** - Test individual functions and components in isolation
2. **E2E Tests** - Test complete user workflows in a real browser environment

Both layers use mocked GitHub API responses for consistency and reliability.

## Unit Testing

### Running Unit Tests

```bash
# Interactive mode for development
pnpm test:watch

# Single run with coverage
pnpm test:ci

# Quick run without coverage
pnpm test
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
