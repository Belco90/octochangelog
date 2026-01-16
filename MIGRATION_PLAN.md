# Next.js to TanStack Start Migration Plan

> **Issue**: [#3068](https://github.com/Belco90/octochangelog/issues/3068)
> **Current Framework**: Next.js v16
> **Target Framework**: TanStack Start
> **Reference Migration**: [personal-website](https://github.com/Belco90/personal-website)

## Overview

This document tracks the migration from Next.js v16 to TanStack Start framework for the OctoChangelog web application.

---

## Phase 1: Initial Setup & Configuration

### 1.1 Install Dependencies

- [x] Install TanStack Start core packages:
  - `@tanstack/react-router@^1.143.4`
  - `@tanstack/react-start@^1.143.4`
- [x] Install Netlify Vite plugin:
  - `@netlify/vite-plugin-tanstack-start` (dev dependency)
- [x] Keep React 19 (already at v19.2.3, compatible)
- [x] Keep `@vitejs/plugin-react` or install `@vitejs/plugin-react-swc` for better performance
- [x] Remove Next.js specific dependencies:
  - `next`
  - `@sentry/nextjs` (will be replaced with `@sentry/react` and `@sentry/vite-plugin`)
- [x] Update `package.json` scripts:
  - `"dev": "vite dev"`
  - `"build": "vite build"`
  - `"preview": "vite preview"`
  - `"start": "vite preview"` (or remove if not needed)
  - Remove `"type-gen": "next typegen"`

### 1.2 Project Configuration Files

- [x] Create `vite.config.ts` with TanStack Start plugin:

  ```ts
  import netlify from '@netlify/vite-plugin-tanstack-start'
  import { tanstackStart } from '@tanstack/react-start/plugin/vite'
  import viteReact from '@vitejs/plugin-react'
  import { defineConfig } from 'vite'
  import tsconfigPaths from 'vite-tsconfig-paths'

  export default defineConfig({
  	server: { port: 3000 },
  	plugins: [
  		tsconfigPaths(),
  		tanstackStart({
  			prerender: { enabled: process.env.NODE_ENV === 'production' },
  			sitemap: { host: 'https://your-domain.com' },
  		}),
  		viteReact(),
  		...(process.env.NETLIFY || process.env.NODE_ENV === 'production'
  			? [netlify()]
  			: []),
  	],
  })
  ```

- [x] Remove `next.config.ts`
- [x] Remove `next-env.d.ts`
- [x] Update `tsconfig.json`:
  - Add `"moduleResolution": "Bundler"` (recommended for Vite)
  - Add TanStack Router types if needed
- [x] Update `.gitignore`:
  - Remove `.next/`
  - Add `dist/` (Vite output)

### 1.3 Routing Setup

**Important**: TanStack Router uses a different file structure than Next.js App Router

- [x] Move routing from `src/app/` to `src/routes/`:
  - Next.js: `src/app/page.tsx` → TanStack: `src/routes/index.tsx`
  - Next.js: `src/app/compare/page.tsx` → TanStack: `src/routes/compare.tsx`
  - Next.js: `src/app/layout.tsx` → TanStack: `src/routes/__root.tsx`
  - Next.js: `src/app/auth/callback/page.tsx` → TanStack: `src/routes/auth/callback.tsx`

- [x] Create `src/routes/__root.tsx` (replaces `src/app/layout.tsx`):
  - Import and setup `<Outlet />` from `@tanstack/react-router`
  - Move layout/provider logic here

- [x] Setup error boundaries with `errorComponent`
- [x] Create `src/routes/index.tsx` (home page)
- [x] Create `src/routes/compare.tsx` (compare page)
- [x] Create `src/routes/auth.callback.tsx` or `src/routes/auth/callback.tsx` (auth callback)
- [x] Handle 404s with `notFoundComponent` in `__root.tsx`

**Note**: TanStack Router uses flat file routing. Routes can be:

- Flat: `src/routes/compare.tsx` → `/compare`
- Nested folders: `src/routes/auth/callback.tsx` → `/auth/callback`
- Dot notation: `src/routes/auth.callback.tsx` → `/auth/callback`

---

## Phase 2: Core App Migration

### 2.1 Layout & Root Components

- [x] Migrate `src/app/layout.tsx` to TanStack Start root route
- [x] Migrate `src/app/UILayout.tsx`
- [x] Migrate `src/app/Providers.tsx` (React Query, Chakra UI, etc.)
- [x] Migrate fonts setup (`src/fonts.ts`)
- [x] Migrate theme setup (`src/custom-theme.ts`)
- [x] Ensure Chakra UI Provider works correctly

### 2.2 Page Components

- [x] Migrate `src/app/page.tsx` (home page)
- [x] Migrate `src/app/HomePage.tsx`
- [x] Migrate `src/app/compare/page.tsx`
- [x] Migrate `src/app/compare/ComparatorClientView.tsx`
- [x] Migrate `src/app/auth/callback/` OAuth callback route
- [x] Migrate `src/app/error.tsx` error page
- [x] Migrate `src/app/global-error.tsx` error page
- [x] Migrate `src/app/compare/error.tsx` error page
- [x] Migrate `src/app/not-found.tsx` and `src/app/NotFound.tsx`

### 2.3 Data Fetching & Server Functions

**Important**: TanStack Start uses different patterns than Next.js Server Components

- [x] Audit current data fetching patterns in Next.js pages
- [x] Replace Next.js patterns with TanStack Router loaders:
  - Use `loader` function in route files for SSR data fetching
  - Use `createServerFn()` from `@tanstack/start` for server functions
  - Server functions use `'use server'` directive (similar to Next.js)
- [x] Setup React Query (already in dependencies):
  - TanStack Router loaders work seamlessly with React Query
  - Use `dehydrate` and `hydrate` for SSR hydration if needed
  - Keep existing `src/queries/` React Query hooks
- [x] Migrate GitHub API calls:
  - Move server-side GitHub API calls to server functions
  - Update `src/github-client.ts` to work with TanStack Start
  - Update `src/github-auth.ts` OAuth flow (may need adjustments for routing)
- [x] Test data fetching works on both client and server

### 2.4 Metadata & SEO

- [x] Migrate `src/app/shared-metadata.ts`:
  - Use `meta()` function in route definitions
  - Return array of meta tags: `[{ title: 'Page Title' }, { name: 'description', content: '...' }]`
- [x] Migrate `src/app/manifest.ts`:
  - Convert to static `public/manifest.json` file
  - Or use dynamic route if needed
- [x] Create `public/robots.txt` (static file)
- [x] Setup sitemap generation:
  - Already configured in `vite.config.ts` with `sitemap: { host: '...' }`
  - TanStack Start auto-generates sitemap from routes
- [x] Migrate favicon handling:
  - Move `src/app/favicon.ico` to `public/favicon.ico`
  - Keep favicon in public folder

---

## Phase 3: Component & Features Migration

### 3.1 Compare Page Components

- [x] Migrate `src/app/compare/comparator-context.tsx`
- [x] Migrate `src/app/compare/RepositoryReleasesComparator.tsx`
- [x] Migrate `src/app/compare/RepositoriesComparatorFilters.tsx`
- [x] Migrate `src/app/compare/RepositorySearchCombobox.tsx`
- [x] Migrate `src/app/compare/ReleaseVersionFormControl.tsx`
- [x] Migrate `src/app/compare/ReleaseVersionsRangeFormControl.tsx`
- [x] Migrate `src/app/compare/ComparatorChangelogResults.tsx`
- [x] Migrate `src/app/compare/RepositoryReleasesChangelog.tsx`
- [x] Migrate `src/app/compare/RepositoryReleasesChangelogHeading.tsx`
- [x] Migrate `src/app/compare/ProcessedReleaseChangeDescription.tsx`
- [x] Migrate `src/app/compare/AuthMessageSection.tsx`

### 3.2 Shared Components

- [x] Audit components in `src/components/` and verify compatibility
- [x] Update all Next.js specific imports:
  - **Images**: `next/image` → `@unpic/react` (already in dependencies)
    - `<Image>` from `next/image` → `<Image>` from `@unpic/react`
    - Remove `width` and `height` props (unpic handles this)
    - Update `src` to use direct paths instead of Next.js optimization
  - **Links**: `next/link` → `@tanstack/react-router`
    - `<Link href="/path">` → `<Link to="/path">`
  - **Navigation hooks**: `next/navigation` → `@tanstack/react-router`
    - `useRouter()` → `useNavigate()` or `useRouter()` from TanStack Router
    - `usePathname()` → `useLocation()` then access `location.pathname`
    - `useSearchParams()` → `useSearch()` from TanStack Router
    - `redirect()` → `router.navigate()` or `throw redirect()`

### 3.3 Theme & UI

- [x] Migrate theme mode selector/toggle
- [x] Verify Chakra UI theme switching works with TanStack Start
- [x] Test all UI components render correctly

---

## Phase 4: Integrations & Tooling

### 4.1 Sentry Integration

**Major Change**: Complete Sentry reconfiguration required

- [x] Remove `@sentry/nextjs` dependency
- [x] Install Sentry for Vite/React:
  - [`@sentry/tanstackstart-react`](https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/)
  - [TanStack Start - Observability](https://tanstack.com/start/latest/docs/framework/react/guide/observability)
- [x] Remove Next.js specific Sentry files:
  - `sentry.edge.config.ts`
  - `sentry.server.config.ts`
  - `sentry.properties` (if not needed)
- [x] Create new Sentry initialization:
  - Initialize in `src/routes/__root.tsx` or app entry point
  - Setup `Sentry.init()` with DSN and environment
- [x] Update/remove `src/instrumentation.ts` and `src/instrumentation-client.ts`
- [x] Test error tracking in development
- [ ] Test source maps upload in production build
- [x] Update Sentry environment variables in Netlify

### 4.2 MSW (Mock Service Worker)

- [x] Move MSW initialization to `src/router.ts` (client) and `instrument.server.mjs` (server)
- [x] Update MSW initialization if needed (check `src/mocks/`)
- [x] Ensure `public/mockServiceWorker.js` is still valid
- [x] Test mocks in development mode

### 4.3 Analytics

- [x] Migrate `src/app/PirschAnalytics.tsx` to TanStack Start
- [x] Verify analytics tracking works on route changes

---

## Phase 5: Build, Testing & CI/CD

### 5.1 Environment Variables

**Critical**: Vite has different environment variable conventions than Next.js

- [x] Audit `.env` and `.env.local` files
- [x] Rename environment variables:
  - `NEXT_PUBLIC_*` → `VITE_*` (for client-side variables)
  - Server-only variables can keep their names (no `VITE_` prefix)
- [x] Update all code references:
  - `process.env.NEXT_PUBLIC_*` → `import.meta.env.VITE_*`
  - Server code: `process.env.*` stays the same
- [x] Update Netlify environment variables in dashboard (if applicable)
- [x] Document required environment variable changes in README

### 5.2 Build Configuration

- [x] Update `netlify.toml`:

  ```toml
  [build]
    command = "pnpm build"
    publish = "dist/client"
  ```

- [x] Verify Vite build outputs to `dist/client` (for static assets) and `dist/server` (for SSR)
- [x] Test production build locally: `pnpm build && pnpm preview`
- [ ] Verify bundle size is acceptable

### 5.3 Testing

- [x] Update `vitest.config.ts` if needed
- [x] Run unit tests and fix any broken tests in `src/__tests__/`
- [x] Update test utilities in `src/test-utils.tsx`
- [x] Update Playwright config (`playwright.config.ts`) for new dev server
- [x] Run e2e tests and fix issues:
  - `e2e/auth.spec.ts`
  - `e2e/compare.spec.ts`
  - `e2e/home.spec.ts`
  - `e2e/not-found.spec.ts`
- [x] Update `e2e/playwright-utils.ts` if needed

### 5.4 Linting & Formatting

- [x] Update ESLint config (`eslint.config.js`) for TanStack Start
- [x] Remove Next.js specific ESLint rules
- [x] Add TanStack Router ESLint plugin if available
- [x] Verify prettier config still works

### 5.5 Visual Testing

- [x] Update Happo config (`happo.config.ts`)
- [x] Test visual regression tests work

### 5.6 CI/CD Pipeline

- [x] Update GitHub Actions workflows in `.github/workflows/`
- [x] Update bundle cache configuration
- [x] Update build commands in CI
- [ ] Test deployment to Netlify
- [ ] Verify preview deployments work
- [ ] Verify production deployment works

---

## Phase 6: Documentation & Cleanup

### 6.1 Update Documentation

- [ ] Update `README.md`:
  - Change framework from Next.js to TanStack Start
  - Update setup instructions
  - Update development commands
  - Update build commands
- [ ] Update `CONTRIBUTING.md` with any relevant changes
- [ ] Update `.github/copilot-instructions.md` if needed

### 6.2 Code Cleanup

- [ ] Remove all Next.js specific files and folders
- [ ] Remove unused dependencies
- [x] Remove `.next/` build artifacts
- [ ] Clean up any temporary migration code or comments
- [x] Run formatter on all files
- [x] Remove "use client"
- [x] Remove error pages

### 6.3 Image Optimization

- [ ] Update image URLs to use direct paths (as mentioned in issue)
- [ ] Verify `@unpic/react` Image component works correctly
- [ ] Test image loading and optimization

---

## Phase 7: Final Testing & Launch

### 7.1 Comprehensive Testing

- [ ] Test all routes and pages manually
- [ ] Test OAuth flow end-to-end (auth token is used on SSR)
- [ ] Test repository comparison functionality
- [ ] Test error states and error boundaries
- [ ] Test 404 page
- [ ] Test theme switching
- [ ] Run full e2e test suite
- [ ] Run full unit test suite
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices

### 7.2 Performance & Optimization

- [ ] Audit bundle size and compare with Next.js
- [ ] Check Core Web Vitals
- [ ] Test loading performance
- [ ] Optimize any performance bottlenecks

### 7.3 Production Deployment

- [ ] Deploy to staging/preview environment
- [ ] QA testing on preview deployment
- [ ] Monitor Sentry for errors on preview
- [ ] Deploy to production
- [ ] Monitor production for issues
- [ ] Monitor analytics for traffic

---

## Reference Resources

- **TanStack Start Docs**: https://tanstack.com/start/latest/docs/framework/react/overview
- **TanStack Router Docs**: https://tanstack.com/router/latest
- **Migration Guide**: Check TanStack Start docs for Next.js migration guide
- **Reference Project**: https://github.com/Belco90/personal-website

---

## Notes & Decisions

### Key Differences from Next.js

| Aspect               | Next.js                         | TanStack Start                      |
| -------------------- | ------------------------------- | ----------------------------------- |
| **Build Tool**       | Webpack (or Turbopack)          | Vite                                |
| **Routing**          | `app/page.tsx` pattern          | `routes/index.tsx` flat/nested      |
| **Layout**           | `app/layout.tsx`                | `routes/__root.tsx`                 |
| **Server Functions** | `'use server'` + Server Actions | `createServerFn()` + `'use server'` |
| **Data Fetching**    | Server Components               | Route `loader` functions            |
| **Navigation**       | `next/navigation`               | `@tanstack/react-router`            |
| **Images**           | `next/image`                    | `@unpic/react`                      |
| **Links**            | `<Link href="/path">`           | `<Link to="/path">`                 |
| **Env Variables**    | `process.env.NEXT_PUBLIC_*`     | `import.meta.env.VITE_*`            |
| **Output**           | `.next/`                        | `dist/client` + `dist/server`       |

### Critical Migration Points

1. **Routing Structure**: Complete reorganization from `src/app/` to `src/routes/` required
2. **Environment Variables**: All `NEXT_PUBLIC_*` must be renamed to `VITE_*` and code updated
3. **OAuth Flow**: GitHub OAuth callback route needs path and navigation updates
4. **Sentry Integration**: Complete re-configuration with `@sentry/react` and Vite plugin
5. **Server Functions**: Convert Server Components to route loaders or `createServerFn()`
6. **Navigation Hooks**: All `next/navigation` hooks must be replaced with TanStack Router equivalents
7. **Redirects**: Implement using TanStack Router's `beforeLoad` or server functions

### TanStack Router Routing Patterns

```
src/routes/
├── __root.tsx           → Root layout (replaces app/layout.tsx)
├── index.tsx            → / (replaces app/page.tsx)
├── compare.tsx          → /compare (replaces app/compare/page.tsx)
└── auth.callback.tsx    → /auth/callback (replaces app/auth/callback/page.tsx)
```

Alternative nested structure:

```
src/routes/
├── __root.tsx
├── index.tsx
├── compare.tsx
└── auth/
    └── callback.tsx     → /auth/callback
```

---

## Progress Tracking

**Status**: Not Started
**Started**: TBD
**Completed**: TBD

Total Tasks: 150+
Completed: 0
In Progress: 0
Remaining: 150+

---

## Quick Reference: Common Migration Patterns

### Route File Example

**Next.js** (`src/app/compare/page.tsx`):

```tsx
export const metadata = { title: 'Compare' }

export default function ComparePage() {
	return <div>Compare</div>
}
```

**TanStack Start** (`src/routes/compare.tsx`):

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/compare')({
	meta: () => [{ title: 'Compare' }],
	component: ComparePage,
})

function ComparePage() {
	return <div>Compare</div>
}
```

### Root Layout Example

**Next.js** (`src/app/layout.tsx`):

```tsx
export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
```

**TanStack Start** (`src/routes/__root.tsx`):

```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
	component: RootLayout,
})

function RootLayout() {
	return (
		<html>
			<body>
				<Providers>
					<Outlet />
				</Providers>
			</body>
		</html>
	)
}
```

### Data Fetching Example

**Next.js** (Server Component):

```tsx
async function getData() {
	const res = await fetch('...')
	return res.json()
}

export default async function Page() {
	const data = await getData()
	return <div>{data}</div>
}
```

**TanStack Start**:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

const getData = createServerFn('GET', async () => {
	const res = await fetch('...')
	return res.json()
})

export const Route = createFileRoute('/page')({
	loader: () => getData(),
	component: Page,
})

function Page() {
	const data = Route.useLoaderData()
	return <div>{data}</div>
}
```

### Navigation Hooks

```tsx
// Next.js
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const router = useRouter()
const pathname = usePathname()
const searchParams = useSearchParams()

router.push('/path')
router.back()

// TanStack Start
import { useNavigate, useLocation, useSearch } from '@tanstack/react-router'

const navigate = useNavigate()
const location = useLocation()
const search = useSearch()

navigate({ to: '/path' })
history.back()
```
