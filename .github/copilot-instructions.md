# Copilot Instructions for Octochangelog

## Project Overview

**Octochangelog** is a TanStack Start web application that compares GitHub changelogs across multiple releases in a single view. It parses, normalizes, groups, and sorts release notes from GitHub repositories to help users quickly identify breaking changes, features, and bug fixes between version ranges.

- **Tech Stack**: TanStack Start (with Vite), TanStack Router, React 19, TypeScript, Chakra UI, TanStack Query
- **Key Features**: Markdown parsing with unified.js, GitHub API integration via Octokit, MSW for API mocking
- **Deployment**: Static site generation on Netlify using Vite
- **Testing**: Vitest for unit tests, Playwright for E2E tests

## Package Management

**CRITICAL**: This project uses **pnpm** (v10.26.0+), NOT npm or yarn.

- **Node.js version**: v22.21.1 (specified in `.nvmrc`)
- **pnpm version**: ^10.26.0 (required, specified in `package.json` engines)
- **Package manager**: pnpm@10.26.2 (specified in `packageManager` field)

### Bootstrap Commands

```bash
# Enable corepack if not already enabled (manages pnpm automatically)
corepack enable

# Install dependencies - ALWAYS run this first
pnpm install

# The postinstall script automatically runs:
# - pnpm gen:theme-typings (generates Chakra UI theme types)
# - husky (sets up git hooks)
```

## Build & Development Commands

### Installation (Always First)

```bash
pnpm install
```

**IMPORTANT**: Always run `pnpm install` before any other commands, especially after:

- Cloning the repository
- Switching branches
- Pulling new changes
- Adding or updating dependencies

### Development

```bash
# Start development server (localhost:3000)
pnpm dev
```

### Build

```bash
# Production build
pnpm build
```

**Build Timing**: ~30-60 seconds on CI, may vary locally.

### Testing

```bash
# Run unit tests with Vitest
pnpm test

# Run unit tests in watch mode
pnpm test:watch

# Run unit tests with coverage (used in CI)
pnpm test:ci
```

**Test Output**: Creates `test-report.junit.xml` and coverage reports in CI mode.

### E2E Testing

```bash
# Run Playwright E2E tests
pnpm e2e

# Run with UI mode (interactive)
pnpm e2e:ui

# Show test report
pnpm e2e:report
```

**E2E Requirements**:

- Requires the build artifact (`dist` directory) to exist (in CI)
- Uses MSW to mock GitHub API calls
- Runs against `http://localhost:3000`
- In CI: runs `pnpm start` (requires prior `pnpm build`)
- Locally: runs `pnpm dev` automatically via webServer config

### Linting & Formatting

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

### Type Checking

```bash
# Type check TypeScript
pnpm type-check
```

## CI/CD Pipeline

### GitHub Actions Workflow

The main workflow is `.github/workflows/verifications.yml` which runs on PRs and pushes to `main`.

**Environment Variables in CI**:

- `VITE_API_MOCKING=enabled` (enables MSW mocking)
- Various secrets for Happo, Currents, Sentry, and Codecov

**Jobs**:

1. **code_validation** (matrix job with 10min timeout):
   - `pnpm lint` - ESLint validation
   - `pnpm type-check` - TypeScript type checking
   - `pnpm format:check` - Prettier formatting check
   - `pnpm test:ci` - Vitest unit tests with coverage

2. **build** (5min timeout):
   - `pnpm build` - Vite production build
   - Uploads `dist` artifact for E2E tests

3. **e2e-tests** (10min timeout, depends on build):
   - Runs in Playwright container (mcr.microsoft.com/playwright:v1.57.0-noble)
   - Matrix sharded across 3 parallel jobs
   - Downloads build artifact
   - Runs: `pnpm run happo --nonce $NONCE_ID -- pnpm run e2e --shard=N/3`

4. **e2e-finalize** (5min timeout, runs after e2e-tests):
   - Finalizes Happo visual regression testing
   - Runs even if e2e-tests are cancelled

**Setup Action**: `.github/actions/setup-project/action.yml`

- Sets up pnpm
- Sets up Node.js (from `.nvmrc`)
- Runs `pnpm install`

## Git Hooks

**Pre-commit Hook** (`.husky/pre-commit`):

- Runs `lint-staged` to lint and format only changed files
- Prevents commits directly to `main` branch (use `-n` flag to bypass)
- Configuration in `lint-staged.config.js`:
  - Runs `eslint --fix` on JS/TS files
  - Runs `prettier --write` on all files

## Project Structure

```
octochangelog/
├── .github/
│   ├── actions/setup-project/    # Reusable CI setup action
│   ├── workflows/verifications.yml  # Main CI workflow
│   └── pull_request_template.md
├── src/
│   ├── routes/                    # TanStack Router routes
│   │   ├── __root.tsx            # Root layout
│   │   ├── index.tsx             # Home page
│   │   ├── compare.tsx           # Compare page
│   │   ├── auth.callback.tsx     # GitHub OAuth callback
│   │   ├── -compare/             # Compare page components (private route segments)
│   │   │   ├── comparator-context.tsx  # State management
│   │   │   ├── RepositoryReleasesComparator.tsx
│   │   │   ├── ComparatorChangelogResults.tsx
│   │   │   └── [other components]
│   │   └── -home/                # Home page components (private route segments)
│   ├── components/               # Shared React components
│   ├── hooks/                    # Custom React hooks
│   │   ├── useProcessDescriptionMdast.ts  # Markdown processing
│   │   └── useProcessReleases.ts          # Release processing
│   ├── queries/                  # TanStack Query hooks
│   │   ├── release.tsx           # GitHub releases API
│   │   └── repository.tsx        # GitHub repos API
│   ├── mocks/                    # MSW mock handlers
│   │   ├── handlers/
│   │   ├── browser.ts            # Browser MSW setup
│   │   └── server.ts             # Node MSW setup
│   ├── fixtures/                 # Test data/fixtures
│   │   └── github/               # GitHub API response fixtures
│   ├── __tests__/                # Unit tests
│   ├── custom-theme.ts           # Chakra UI theme
│   ├── github-auth.ts            # GitHub OAuth logic
│   ├── github-client.ts          # Octokit client
│   ├── utils.ts                  # Utility functions
│   ├── test-utils.tsx            # Testing utilities
│   ├── router.tsx                # TanStack Router configuration
│   └── vitest.setup.ts           # Vitest setup
├── e2e/                          # Playwright E2E tests
│   ├── compare.spec.ts
│   ├── auth.spec.ts
│   ├── home.spec.ts
│   ├── not-found.spec.ts
│   └── playwright-utils.ts
├── public/                       # Static assets
├── eslint.config.js              # ESLint flat config
├── tsconfig.json                 # TypeScript config
├── vitest.config.ts              # Vitest config
├── playwright.config.ts          # Playwright config
├── vite.config.ts                # Vite config (with TanStack Start, Netlify, Sentry)
├── package.json                  # Dependencies & scripts
├── pnpm-lock.yaml                # pnpm lockfile
├── pnpm-workspace.yaml           # pnpm workspace config
└── [other config files]
```

## Key Configuration Files

- **TypeScript**: `tsconfig.json` - Path aliases: `@/*` → `./src/*`, `@/public/*` → `./public/*`
- **ESLint**: `eslint.config.js` - Flat config with React, TypeScript, import sorting, a11y rules
- **Prettier**: `prettier.config.js` - Single quotes, no semicolons, tabs
- **Vitest**: `vite.config.ts` - Setup file: `src/vitest.setup.ts`, excludes `e2e/`
- **Playwright**: `playwright.config.ts` - Test dir: `e2e/`, runs against localhost:3000
- **Vite**: `vite.config.ts` - TanStack Start plugin, Netlify adapter, Sentry integration, prerendering config
- **TanStack Router**: `src/router.tsx` - Router configuration, auto-generated route tree at `src/routeTree.gen.ts`

## Code Style & Conventions

- **Import Order**: Enforced by ESLint (import-x plugin)
  - Builtin → External → Internal (`@/*`) → Parent/Sibling → Type imports
  - Newlines between groups, alphabetically sorted
- **TypeScript**: Strict mode enabled, no unused locals/parameters
- **React**: Prefer type imports, consistent type exports, array types as `Array<T>`
- **Playwright**: Import test from `e2e/playwright-utils`, not `@playwright/test` directly
- **No console.log**: Warns on console statements (use proper logging if needed)

## Environment Variables

**Development** (`.env` checked in, `.env.local` for overrides):

```bash
VITE_GITHUB_APP_CLIENT_ID=notset
VITE_API_MOCKING=disabled  # Set to 'enabled' to use MSW mocking
```

**CI Environment Variables** (from GitHub secrets):

- `HAPPO_API_KEY`, `HAPPO_API_SECRET` - Visual regression testing
- `CURRENTS_PROJECT_ID`, `CURRENTS_RECORD_KEY` - Playwright dashboard
- `CODECOV_TOKEN` - Code coverage reporting
- Sentry auth tokens (optional, warnings if not set)

## Testing Strategy

### Unit Tests (Vitest)

- Located in: `src/__tests__/`
- Run with: `pnpm test` or `pnpm test:watch`
- Uses: React Testing Library via `src/test-utils.tsx`
- MSW mocking: Controlled by `VITE_API_MOCKING` env var
- Coverage: ~16% (focused on utility functions)

### E2E Tests (Playwright)

- Located in: `e2e/`
- Run with: `pnpm e2e` (requires build in CI, uses dev server locally)
- Browsers: Chromium, Firefox, WebKit
- MSW mocking: Always enabled (`VITE_API_MOCKING=enabled` in CI)
- Sharding: 3 shards in CI for parallel execution
- Visual testing: Integrated with Happo

### Test Fixtures

- Mock data in: `src/fixtures/github/`
- MSW handlers in: `src/mocks/handlers/`
- Limited search results: Only "testing library" and "renovate" repositories

## Common Commands Summary

```bash
# Setup
pnpm install                    # Install dependencies (always first)

# Development
pnpm dev                        # Start dev server

# Validation (runs in CI)
pnpm lint                       # Lint code
pnpm type-check                 # Check types
pnpm format:check               # Check formatting
pnpm test:ci                    # Run tests with coverage

# Build
pnpm build                      # Production build
pnpm start                      # Start production server (requires build)

# E2E
pnpm e2e                        # Run E2E tests
pnpm e2e:ui                     # Run E2E with UI

# Fixes
pnpm lint:fix                   # Auto-fix lint issues
pnpm format                     # Auto-format code
```

## Important Notes

1. **Always use pnpm**: Never use `npm` or `yarn` commands
2. **Run pnpm install first**: Before any build, test, or development commands
3. **MSW API Mocking**: Limited repository search (testing-library, renovate only)
4. **No direct main commits**: Pre-commit hook prevents commits to main branch
5. **Theme type generation**: Runs automatically via postinstall (Chakra UI theme types)
6. **CI timeouts**: code_validation and e2e-tests: 10min, build: 5min
7. **Path aliases**: Use `@/` prefix for src imports, `@/public/` for public assets
8. **Routing**: TanStack Router uses file-based routing with `src/routes/` directory

## Troubleshooting

**pnpm command not found**:

- Enable corepack: `corepack enable`
- Corepack will automatically install the correct pnpm version based on `packageManager` field in package.json

**Pre-commit hook blocks commit**:

- If on main branch: Switch to feature branch or use `git commit -n` to bypass
- If linting fails: Run `pnpm lint:fix` and `pnpm format`

**E2E tests fail locally**:

- Ensure dev server is not already running on port 3000
- Check that `VITE_API_MOCKING=enabled` if needed

**Type errors after changes**:

- Run `pnpm gen:theme-typings` to regenerate Chakra UI theme types
- TanStack Router types are auto-generated on file changes in development

## Trust These Instructions

These instructions have been validated by running all commands successfully. Only search for additional information if:

- These instructions are incomplete for your specific task
- You encounter errors not documented here
- You need details about specific code implementation (not build/test process)
