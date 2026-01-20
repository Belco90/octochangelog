# CI/CD Guide

This guide covers the GitHub Actions CI/CD pipeline configuration.

## GitHub Actions Workflow

**Main workflow**: `.github/workflows/verifications.yml`

Runs on:

- Pull requests to any branch
- Pushes to `main` branch

## Environment Variables

### CI Environment

```bash
VITE_API_MOCKING=enabled  # Enables MSW for all tests
```

### Secrets (GitHub Repository Secrets)

**Happo** (Visual regression testing):

- `HAPPO_API_KEY`
- `HAPPO_API_SECRET`

**Currents** (Playwright dashboard):

- `CURRENTS_PROJECT_ID`
- `CURRENTS_RECORD_KEY`

**Codecov** (Code coverage reporting):

- `CODECOV_TOKEN`

**Sentry** (Error tracking):

- Sentry auth tokens (optional, warnings if not set)

## CI Jobs

### 1. code_validation

**Matrix job** running validation checks in parallel:

- Timeout: 10 minutes
- Runs on: `ubuntu-latest`

**Steps**:

1. Setup project (via `.github/actions/setup-project`)
2. **Lint**: `pnpm lint` (fails on warnings with `--max-warnings 0`)
3. **Type check**: `pnpm type-check`
4. **Format check**: `pnpm format:check`
5. **Unit tests**: `pnpm test:ci` (with coverage)
6. **Upload coverage**: Sends coverage to Codecov

### 2. e2e-tests

**E2E testing job** running Playwright tests:

- Timeout: 10 minutes
- Runs on: Playwright container (`mcr.microsoft.com/playwright:v1.57.0-noble`)
- **Runs independently** from `code_validation` (no dependency)

**Steps**:

1. Setup project (via `.github/actions/setup-project`)
2. **Build**: `pnpm build` (creates production build in `dist/`)
3. **Run E2E tests**: `pnpm run happo -- pnpm run e2e`
   - Uses Happo for visual regression testing
   - Runs against `http://localhost:4173` (Vite preview server)
   - Controlled by `playwright.config.ts` webServer configuration

**Environment**:

- `VITE_API_MOCKING=enabled` (uses MSW handlers)
- Playwright container includes all necessary browser dependencies

## Setup Action

**File**: `.github/actions/setup-project/action.yml`

Reusable composite action that handles common setup steps:

1. **Setup pnpm**
   - Installs pnpm via corepack
   - Version from `package.json` `packageManager` field

2. **Setup Node.js**
   - Version from `.nvmrc` file
   - Caches pnpm dependencies

3. **Install dependencies**
   - Runs `pnpm install`
   - Automatically runs postinstall scripts (theme typings generation)

## Job Timeouts

All jobs have a **10 minute timeout** to prevent runaway processes:

```yaml
timeout-minutes: 10
```

If a job exceeds this timeout, it will be automatically cancelled.

## Workflow Triggers

```yaml
on:
  pull_request: # All PRs
  push:
    branches:
      - main # Pushes to main branch
```

## Build Timing

- **Production build** (`pnpm build`): ~30-60 seconds on CI
- May vary based on:
  - Runner performance
  - Dependency cache state
  - Prerendering complexity

## Parallelization Strategy

Jobs run in parallel where possible:

- `code_validation` steps run sequentially (share the same environment)
- `e2e-tests` runs independently in parallel with `code_validation`

This maximizes CI throughput while keeping the workflow simple.

## Caching Strategy

Node.js setup action automatically caches:

- pnpm store (global cache)
- node_modules (when using pnpm)

Cache key is based on:

- OS
- `pnpm-lock.yaml` hash

## Artifacts

### Test Reports

- **JUnit XML**: `test-report.junit.xml` (from `pnpm test:ci`)
- **Coverage reports**: Uploaded to Codecov

### Playwright Reports

- **Happo snapshots**: Visual regression reports uploaded to Happo
- **Currents dashboard**: Test results uploaded to Currents

## Troubleshooting CI Failures

### Lint failures

```
ESLint found warnings or errors
```

**Fix locally**:

```bash
pnpm lint:fix
pnpm format
```

### Type check failures

```
TypeScript found type errors
```

**Fix locally**:

```bash
pnpm type-check
```

Check the error messages and fix type issues. May need to regenerate theme typings:

```bash
pnpm gen:theme-typings
```

### Test failures

```
Vitest tests failed
```

**Run locally**:

```bash
pnpm test:watch  # Interactive mode
pnpm test:ci     # CI mode with coverage
```

### E2E test failures

```
Playwright tests failed
```

**Run locally**:

```bash
pnpm build        # Build first (required in CI)
pnpm e2e          # Run E2E tests
pnpm e2e:ui       # Interactive mode
pnpm e2e:report   # View last report
```

Check Playwright traces and screenshots in the report for debugging.

### Build failures

```
Build failed
```

**Common causes**:

- Type errors (run `pnpm type-check`)
- Missing dependencies (run `pnpm install`)
- Vite configuration issues
- Environment variables not set

**Run locally**:

```bash
pnpm build
```

### Timeout failures

```
Job exceeded timeout of 10 minutes
```

**Possible causes**:

- Hanging tests (infinite loops, missing assertions)
- Slow network requests (check MSW mocking is enabled)
- Resource exhaustion

Investigate which step timed out and check logs for hung processes.

## CI Best Practices

1. **Always run validations locally** before pushing:

   ```bash
   pnpm lint && pnpm type-check && pnpm format:check && pnpm test:ci
   ```

2. **Pre-commit hooks** help catch issues early (runs automatically via Husky)

3. **MSW mocking** prevents flaky tests from real API calls

4. **Timeouts** prevent runaway CI jobs from consuming resources

5. **Parallel jobs** maximize CI speed while maintaining clarity
