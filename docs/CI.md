# CI/CD Guide

This guide describes the continuous integration capabilities and workflow automation.

## CI Capabilities

The CI pipeline automatically validates code quality on:

- Pull requests to any branch
- Pushes to the main branch

All checks must pass before merging to main.

## Environment and Secrets

### CI Environment Variables

```bash
VITE_API_MOCKING=enabled  # Enables MSW for consistent test data
```

### Required Secrets

The CI pipeline uses GitHub repository secrets for external services:

**Happo** (Visual regression):

- API key and secret for visual snapshot comparison

**Currents** (Playwright dashboard):

- Project ID and record key for test result tracking

**Codecov** (Coverage reporting):

- Token for uploading coverage data

**Sentry** (Error tracking):

- Auth tokens (optional, produces warnings if missing)

## Validation Pipeline

### Code Quality Checks

A matrix job runs multiple validation checks in parallel:

- **Linting**: ESLint with zero-warning tolerance
- **Type checking**: TypeScript strict mode validation
- **Format checking**: Prettier style enforcement
- **Unit tests**: Vitest with coverage reporting
- **Coverage upload**: Results sent to Codecov

Timeout: 10 minutes
Environment: Ubuntu latest

### E2E Testing

An independent job runs browser tests:

- Builds production artifacts
- Runs Playwright tests with visual snapshots
- Uses Happo for visual regression detection
- Reports results to Currents dashboard

Tests run against the production build preview server.
Environment: Playwright Docker container with browser dependencies
Timeout: 10 minutes

### Parallel Execution

Code validation and E2E tests run in parallel for faster feedback. They have no dependencies on each other.

## Shared Setup

A reusable composite action handles common setup steps:

1. Install pnpm via corepack (version from package.json)
2. Setup Node.js with dependency caching (version from .nvmrc)
3. Install dependencies and run postinstall scripts

This ensures consistent environment setup across all jobs.

## Performance

### Timeouts

All jobs have 10-minute timeouts to prevent runaway processes. Jobs exceeding this limit are automatically cancelled.

### Build Timing

Production builds typically complete in 30-60 seconds, varying based on:

- Runner performance
- Cache effectiveness
- Prerendering complexity

### Caching

Node.js setup automatically caches:

- pnpm global store
- node_modules

Cache keys are based on OS and lockfile hash.

## Test Artifacts

The pipeline generates several artifacts:

- **JUnit XML**: Test results in standard format
- **Coverage reports**: Uploaded to Codecov
- **Happo snapshots**: Visual regression comparisons
- **Currents results**: Playwright test dashboard

## Debugging CI Failures

### Lint Failures

**Local reproduction**:

```bash
pnpm lint:fix
pnpm format
```

Fix the issues reported by ESLint and Prettier.

### Type Check Failures

**Local reproduction**:

```bash
pnpm type-check
```

Address TypeScript errors. May need to regenerate theme typings:

```bash
pnpm gen:theme-typings
```

### Test Failures

**Local reproduction**:

```bash
pnpm test:watch  # Interactive
pnpm test:ci     # CI mode
```

### E2E Failures

**Local reproduction**:

```bash
pnpm build       # Required for preview server
pnpm e2e
pnpm e2e:ui      # Interactive mode
pnpm e2e:report  # View traces and screenshots
```

### Build Failures

**Common causes**:

- Type errors
- Missing dependencies
- Configuration issues
- Missing environment variables

**Local reproduction**:

```bash
pnpm build
```

### Timeout Failures

**Possible causes**:

- Hanging tests (infinite loops, missing assertions)
- Network issues (check mocking is enabled)
- Resource exhaustion

Check logs to identify which step timed out.

## Best Practices

1. **Run validations locally before pushing**:

   ```bash
   pnpm lint && pnpm type-check && pnpm format:check && pnpm test:ci
   ```

2. **Pre-commit hooks catch issues early** - They run automatically via Husky

3. **API mocking prevents flaky tests** - MSW ensures consistent GitHub API responses

4. **Timeouts prevent resource waste** - Runaway jobs are killed automatically

5. **Parallel execution maximizes speed** - Independent jobs run concurrently
