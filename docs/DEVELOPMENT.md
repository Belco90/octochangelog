# Development Guide

This guide covers development workflows, build processes, and environment setup.

## Prerequisites

- **Node.js**: v22.22.0 (specified in `.nvmrc`)
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

The `postinstall` script automatically runs `pnpm gen:theme-typings` to generate Chakra UI theme types.

## Development Commands

### Start Development Server

```bash
# Start development server (localhost:3000)
pnpm dev

# Start development server with API mocking enabled
pnpm dev:mock
```

The dev server uses TanStack Start with Vite and includes Sentry integration.

### Build

```bash
# Production build
pnpm build
```

**Build timing**: ~30-60 seconds on CI, may vary locally.

The build process:

1. Runs Vite build with TanStack Start
2. Executes `postbuild` script to copy Sentry instrumentation file

### Preview Production Build

```bash
# Preview production build using Vite preview server (port 4173)
pnpm preview

# Start production server using TanStack Start server (port 3000)
pnpm start
```

## Environment Variables

### Development Variables

Create a `.env.local` file for local overrides (not checked into Git):

```bash
VITE_GITHUB_APP_CLIENT_ID=your_github_client_id
VITE_API_MOCKING=disabled  # Set to 'enabled' to use MSW mocking
```

Default values are in `.env` (checked into Git):

```bash
VITE_GITHUB_APP_CLIENT_ID=notset
VITE_API_MOCKING=disabled
```

### API Mocking with MSW

When `VITE_API_MOCKING=enabled`:

- GitHub API calls are intercepted by MSW (Mock Service Worker)
- Mock data is served from `src/fixtures/github/`
- Handlers are defined in `src/mocks/handlers/`
- **Limited search results**: Only "testing library" and "renovate" repositories are available

Use `pnpm dev:mock` to automatically enable API mocking in development.

## Theme Customization

Chakra UI theme types are auto-generated:

```bash
# Manually regenerate theme typings (runs automatically on postinstall)
pnpm gen:theme-typings
```

This generates TypeScript types for your custom theme defined in `src/custom-theme.ts`.

## Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:

- `@/*` → `./src/*`
- `@/public/*` → `./public/*`

Example usage:

```typescript
import { someUtil } from '@/utils'
import logo from '@/public/logo.png'
```

## Troubleshooting

### pnpm command not found

Enable corepack:

```bash
corepack enable
```

Corepack will automatically install the correct pnpm version based on the `packageManager` field in `package.json`.

### Type errors after changes

Regenerate theme typings:

```bash
pnpm gen:theme-typings
```

TanStack Router types are auto-generated on file changes during development (watch mode).

### Dev server won't start

- Ensure port 3000 is not already in use
- Check that `pnpm install` has been run
- Clear Vite cache: `rm -rf node_modules/.vite`
