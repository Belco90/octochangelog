# Development Guide

This guide describes the development capabilities and workflows available in this project.

## Prerequisites

- **Node.js**: v22.22.0 (check `.nvmrc` for current version)
- **pnpm**: ^10.26.0 (managed automatically by corepack)

## Initial Setup

```bash
# Enable corepack if not already enabled (manages pnpm automatically)
corepack enable

# Install dependencies - ALWAYS run this first
pnpm install
```

**IMPORTANT**: Always run `pnpm install` before any other commands, especially after:

- Cloning the repository
- Switching branches
- Pulling new changes
- Adding or updating dependencies

The `postinstall` script automatically generates Chakra UI v3 theme types after dependency installation.

## Development Capabilities

### Local Development Server

You can run a local development server that supports:

- Hot module replacement for fast iteration
- Real GitHub API integration (requires OAuth client ID)
- Optional API mocking for offline development

**With real GitHub API**:

```bash
pnpm dev
```

**With mocked API responses**:

```bash
pnpm dev:mock
```

The mocked mode intercepts GitHub API calls and serves fixture data. This is useful for:

- Offline development
- Consistent test data
- Avoiding rate limits

Note: Mocked data includes limited repositories (search for "testing library" or "renovate" to see results).

### Production Builds

The application can be built for production deployment:

```bash
pnpm build
```

This creates an optimized static build that:

- Prerenders configured routes for fast initial loads
- Bundles all assets with Vite
- Includes Sentry instrumentation for error tracking
- Typically completes in 30-60 seconds

**Preview the production build**:

```bash
# Static file preview (port 4173)
pnpm preview

# Full production server simulation (port 3000)
pnpm start
```

## Configuration

### Environment Variables

The application supports environment-based configuration:

**GitHub OAuth**: Set your GitHub OAuth app client ID

```bash
VITE_GITHUB_APP_CLIENT_ID=your_client_id
```

**API Mocking**: Control whether GitHub API calls are mocked

```bash
VITE_API_MOCKING=enabled  # or 'disabled'
```

Default values exist in `.env`, local overrides go in `.env.local` (not version controlled).

When mocking is enabled, MSW (Mock Service Worker) intercepts requests and serves fixture data. Handlers can be found by searching for MSW-related files, and fixtures are typically organized by API source.

### Theme Customization

The project uses Chakra UI v3 with a custom theme. Theme types are auto-generated to provide TypeScript autocomplete for theme tokens.

```bash
# Regenerate theme typings (runs automatically after install)
pnpm chakra:typegen

# Generate Chakra UI snippets for common patterns
pnpm chakra:snippet
```

The custom theme definition and generated types work together to provide type-safe access to colors, spacing, and other design tokens. Chakra v3 uses semantic tokens that automatically adapt to light/dark mode.

### Path Aliases

Import paths support aliases for cleaner code:

- `@/*` maps to source files
- `@/public/*` maps to public assets

Look for `tsconfig.json` to see current alias configuration.

## Common Issues

### pnpm not found

Enable corepack to get automatic pnpm version management:

```bash
corepack enable
```

Corepack reads the `packageManager` field from `package.json` to install the correct version.

### Type errors after theme changes

Regenerate theme typings:

```bash
pnpm chakra:typegen
```

Router types are auto-generated during development when route files change.

### Dev server port conflict

Default port is 3000. If it's in use:

- Stop other processes using that port
- Or modify the port configuration

### Stale build cache

Clear Vite's cache if you encounter unexplained build issues:

```bash
rm -rf node_modules/.vite
```
