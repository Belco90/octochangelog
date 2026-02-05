### API Mocking

MSW (Mock Service Worker) provides API mocking for:

- Local development without real API calls
- Consistent test data
- Offline development

Mocking works in both browser and Node environments:

- **Browser**: Used during development
- **Node**: Used during tests

Handlers intercept matching requests and return fixture data. Search for MSW-related files to find handlers and fixtures.

## Configuration Patterns

### TypeScript Configuration

- Strict mode for type safety
- Path aliases for clean imports
- React 19 JSX transform
- ES2022 target for modern features

### Build Configuration

The Vite config coordinates:

- TanStack Start plugin for SSR/SSG
- Netlify adapter for deployment
- Sentry plugin for error tracking
- Path alias resolution

### Test Configuration

- **Vitest**: Inherits from Vite config, adds test-specific setup
- **Playwright**: Configures browser, test directory, and dev server

## Finding Your Way

Since file structure can change, here are hints for locating different capabilities:

- **Routes**: Look for file-based routing in a routes directory, files map to URLs
- **API Queries**: Search for TanStack Query hooks, often in a queries/hooks directory
- **Components**: Shared components typically live together, route-specific components may be co-located
- **Chakra Snippets**: Reusable Chakra UI v3 component patterns in `components/snippets` directory
- **API Mocking**: Search for MSW, handlers, or fixtures
- **Auth**: Look for github-auth or oauth-related files
- **Processing**: Custom hooks often handle data transformation
- **Styles**: Chakra v3 theme customization in theme-related files
- **Tests**: Unit tests often mirror source structure or live in `__tests__`, E2E tests typically in an e2e directory

## UI Architecture

### Chakra UI v3

The application uses Chakra UI v3 as its component library with the following patterns:

**Component Import Sources**:

- Import base components from `@chakra-ui/react` (Box, Button, Input, etc.)
- Import custom snippets from `components/snippets` (ColorModeButton, Tooltip, Dialog, etc.)

**Theme System**:

- Custom theme defined in `src/theme.ts`
- Semantic tokens for automatic light/dark mode adaptation
- Type-safe token access via auto-generated types

**Color Mode**:

- Dark mode support via `next-themes` integration
- Semantic color tokens (`bg`, `fg`, `border`) adapt automatically
- Color mode toggle button in header
- `useColorModeValue` hook for custom color mode values

**Component Patterns**:

- Compound components (e.g., `Dialog.Root`, `Table.Row`, `Menu.Item`)
- Snippet components for common patterns (stored in `components/snippets`)
- Semantic prop naming (`open` instead of `isOpen`, `disabled` instead of `isDisabled`)

For detailed Chakra v3 migration rules and patterns, see [docs/CHAKRA-V3.md](./CHAKRA-V3.md).
