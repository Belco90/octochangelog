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
- **API Mocking**: Search for MSW, handlers, or fixtures
- **Auth**: Look for github-auth or oauth-related files
- **Processing**: Custom hooks often handle data transformation
- **Styles**: Chakra theme customization in theme-related files
- **Tests**: Unit tests often mirror source structure or live in `__tests__`, E2E tests typically in an e2e directory
