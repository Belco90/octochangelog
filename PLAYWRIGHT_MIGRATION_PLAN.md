# Cypress to Playwright Migration Plan

## Overview

This document outlines the migration plan from Cypress to Playwright for the Octochangelog project, including integration with Happo for visual testing and Currents for test reporting/dashboard functionality.

## Current Setup Analysis

### Existing Cypress Configuration

- **Cypress Version**: 15.2.0
- **Test Files**: 3 E2E test files
  - `cypress/e2e/home.cy.ts`
  - `cypress/e2e/comparator.cy.ts`
  - `cypress/e2e/not-found.cy.ts`
- **Dependencies**:
  - `@testing-library/cypress`: 10.1.0
  - `happo-cypress`: 4.3.1
  - `happo-e2e`: 5.0.0
  - `happo.io`: 13.0.1
  - `eslint-plugin-cypress`: 5.1.1
  - `@types/happo-cypress`: 4.1.4
- **Custom Commands**: `metaDescriptionShouldEqual`
- **CI/CD**: GitHub Actions with parallelization (2 containers) and Cypress Dashboard integration
- **Visual Testing**: Happo.io integration via `happo-cypress`
- **Project ID**: u8grd8 (Cypress Dashboard)

### Key Features Used

1. **Testing Library Integration**: Using `@testing-library/cypress` for accessible queries
2. **Visual Screenshots**: `happoScreenshot()` for visual regression testing
3. **Custom Commands**: Extended Cypress with custom commands
4. **API Mocking**: MSW integration (mentioned in tests)
5. **Parallelization**: Running tests in 2 parallel containers
6. **Test Recording**: Cypress Dashboard recording with `record: true`

## Migration Strategy

### Phase 1: Setup and Configuration

#### 1.1 Install Playwright Dependencies

```bash
pnpm add -D @playwright/test
pnpm add -D @playwright/test-ct  # For component testing (optional)
```

**Recommended versions**:
- `@playwright/test`: latest stable (1.40.x or higher)

#### 1.2 Install Happo for Playwright

Research needed to identify the correct Happo package for Playwright:
- Option 1: `happo-playwright` (if exists)
- Option 2: Direct Happo.io integration with Playwright
- Option 3: Custom implementation using Happo's core library

**Action Required**: Verify the best approach for Happo + Playwright integration.

#### 1.3 Install Currents for Test Reporting

```bash
pnpm add -D @currents/playwright
```

Currents provides:
- Test results dashboard (replacement for Cypress Dashboard)
- Test parallelization and orchestration
- Flaky test detection
- Test history and analytics
- GitHub integration

#### 1.4 Install Testing Library for Playwright

```bash
pnpm add -D @playwright/test playwright-testing-library
# OR
pnpm add -D @testing-library/playwright
```

**Action Required**: Verify which is the current recommended Testing Library adapter for Playwright.

### Phase 2: Configuration Files

#### 2.1 Create Playwright Configuration

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html'],
    ['@currents/playwright'],
  ],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewports for Happo compatibility
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'pnpm build && pnpm start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

#### 2.2 Update Happo Configuration

Update `.happo.js` to work with Playwright (implementation depends on chosen integration method).

#### 2.3 Create Currents Configuration

Add to `playwright.config.ts` or create `currents.config.js`:

```javascript
module.exports = {
  recordKey: process.env.CURRENTS_RECORD_KEY,
  projectId: process.env.CURRENTS_PROJECT_ID,
};
```

#### 2.4 TypeScript Configuration

Create `e2e/tsconfig.json`:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "types": ["@playwright/test", "node"]
  },
  "include": ["**/*.ts"]
}
```

### Phase 3: Test Migration

#### 3.1 Directory Structure

Create new directory structure:
```
e2e/
  ├── fixtures/           # Test fixtures
  ├── pages/             # Page Object Models (optional)
  ├── utils/             # Shared utilities
  └── tests/
      ├── home.spec.ts
      ├── comparator.spec.ts
      └── not-found.spec.ts
```

#### 3.2 Custom Test Utilities

Create `e2e/utils/custom-test.ts` for custom matchers and fixtures:

```typescript
import { test as base } from '@playwright/test';
// Import testing library helpers
// Import Happo helpers

export const test = base.extend({
  // Custom fixtures here
});

export { expect } from '@playwright/test';
```

#### 3.3 Custom Assertions

Create equivalent of `metaDescriptionShouldEqual`:

```typescript
export async function expectMetaDescription(page, expectedContent: string) {
  const content = await page.locator('meta[name="description"]').getAttribute('content');
  expect(content).toBe(expectedContent);
}
```

#### 3.4 Test Migration Patterns

| Cypress | Playwright |
|---------|-----------|
| `cy.visit('/')` | `await page.goto('/')` |
| `cy.title().should('equal', 'X')` | `await expect(page).toHaveTitle('X')` |
| `cy.findByRole('heading', {name: 'X'})` | `await page.getByRole('heading', {name: 'X'})` |
| `cy.get('body').happoScreenshot({...})` | `await happo.screenshot(page, {...})` (TBD) |
| `cy.url().should('equal', 'X')` | `await expect(page).toHaveURL('X')` |
| `cy.findByRole('link').click()` | `await page.getByRole('link').click()` |
| `cy.within(() => {...})` | Use locator chaining: `container.locator(...)` |
| `Cypress.config().baseUrl` | `use.baseURL` from config |

### Phase 4: CI/CD Migration

#### 4.1 Update GitHub Actions Workflow

Replace `e2e.yml` with new Playwright workflow:

```yaml
name: E2E tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  merge_group:

permissions:
  contents: read
  actions: write

env:
  NEXT_PUBLIC_API_MOCKING: 'enabled'
  HAPPO_API_KEY: ${{ secrets.HAPPO_API_KEY }}
  HAPPO_API_SECRET: ${{ secrets.HAPPO_API_SECRET }}
  CURRENTS_PROJECT_ID: ${{ secrets.CURRENTS_PROJECT_ID }}
  CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}

concurrency:
  group: '${{ github.workflow }} @ ${{ github.event.pull_request.head.label || github.head_ref || github.ref }}'
  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}

jobs:
  playwright:
    name: Playwright
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2]
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Install Playwright Browsers
        run: pnpm exec playwright install --with-deps
      
      - name: Run Playwright tests
        run: pnpm exec pwc --shard=${{ matrix.shard }}/${{ strategy.job-total }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Upload Playwright Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report-${{ matrix.shard }}
          path: playwright-report/
          retention-days: 30

  finalize-happo:
    name: Finalize Happo
    runs-on: ubuntu-latest
    if: ${{ !cancelled() && github.event_name != 'merge_group' }}
    needs: [playwright]
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Finalize Happo
        run: # TBD - depends on integration method
```

#### 4.2 Update CI Validation Workflow

Update `ci.yml`:
- Remove `CYPRESS_INSTALL_BINARY: 0` environment variable
- Replace `type-check:cypress` with `type-check:e2e` (or similar)
- Update eslint configuration

### Phase 5: Package.json Scripts

Update `package.json` scripts:

```json
{
  "scripts": {
    "type-check:e2e": "tsc --project e2e/tsconfig.json",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "e2e:headed": "playwright test --headed",
    "e2e:debug": "playwright test --debug",
    "e2e:codegen": "playwright codegen http://localhost:3000",
    "e2e:report": "playwright show-report",
    "e2e:currents": "pwc"
  }
}
```

Remove:
- `cy:open`
- `cy:headless`
- Old `e2e` and `e2e:dev` scripts

### Phase 6: ESLint Configuration

#### 6.1 Update eslint.config.mjs

Replace Cypress configuration:

```javascript
// Remove
import cypress from 'eslint-plugin-cypress'

// Remove Cypress config block
{
  name: 'Cypress',
  files: ['cypress/**/*.[jt]s'],
  ...cypress.configs.recommended,
}

// Add Playwright config
{
  name: 'Playwright',
  files: ['e2e/**/*.[jt]s'],
  // Add Playwright specific rules if needed
}
```

### Phase 7: Cleanup

#### 7.1 Remove Cypress Files and Dependencies

```bash
# Remove Cypress directory
rm -rf cypress/

# Remove Cypress config
rm cypress.config.ts

# Uninstall dependencies
pnpm remove cypress @testing-library/cypress eslint-plugin-cypress
pnpm remove happo-cypress happo-e2e @types/happo-cypress
```

#### 7.2 Update .gitignore

```
# Remove
/cypress/videos
/cypress/screenshots

# Add
/e2e/test-results/
/e2e/.auth/
/playwright-report/
/playwright/.cache/
```

#### 7.3 Remove Type Declarations

Remove Happo Cypress declarations from `additional.d.ts`:

```typescript
// Remove this block
declare module 'happo-cypress/task' {
  interface HappoTask {
    register: (on: Cypress.PluginEvents) => void
  }
  const happoTask: HappoTask
  export default happoTask
}
```

## Implementation Checklist

### Prerequisites
- [ ] Research and confirm Happo + Playwright integration method
- [ ] Research and confirm Testing Library + Playwright package
- [ ] Sign up for Currents.dev account
- [ ] Create new project in Currents dashboard
- [ ] Obtain Currents API credentials (CURRENTS_PROJECT_ID, CURRENTS_RECORD_KEY)
- [ ] Add Currents secrets to GitHub repository

### Phase 1: Installation
- [ ] Install Playwright core packages
- [ ] Install Happo for Playwright
- [ ] Install Currents reporter
- [ ] Install Testing Library adapter

### Phase 2: Configuration
- [ ] Create `playwright.config.ts`
- [ ] Create `e2e/tsconfig.json`
- [ ] Update `.happo.js` for Playwright
- [ ] Configure Currents integration
- [ ] Update environment variables

### Phase 3: Test Migration
- [ ] Create directory structure (`e2e/tests/`, `e2e/utils/`)
- [ ] Create custom test utilities
- [ ] Create custom assertions
- [ ] Migrate `home.cy.ts` → `home.spec.ts`
- [ ] Migrate `comparator.cy.ts` → `comparator.spec.ts`
- [ ] Migrate `not-found.cy.ts` → `not-found.spec.ts`
- [ ] Implement Happo screenshot calls
- [ ] Verify all tests pass locally

### Phase 4: CI/CD
- [ ] Update `.github/workflows/e2e.yml`
- [ ] Update `.github/workflows/ci.yml`
- [ ] Test workflow in CI environment
- [ ] Verify Currents dashboard integration
- [ ] Verify Happo finalization works

### Phase 5: Scripts & Tooling
- [ ] Update `package.json` scripts
- [ ] Update ESLint configuration
- [ ] Test all new scripts locally

### Phase 6: Cleanup
- [ ] Remove Cypress files
- [ ] Remove Cypress dependencies
- [ ] Update `.gitignore`
- [ ] Update type declarations
- [ ] Remove Cypress-specific CI environment variables

### Phase 7: Documentation
- [ ] Update README.md with Playwright instructions
- [ ] Update CONTRIBUTING.md with new E2E test guidelines
- [ ] Document Happo + Playwright workflow
- [ ] Document Currents dashboard usage

## Key Considerations

### Advantages of Playwright

1. **Better Performance**: Faster test execution
2. **Multiple Browsers**: Native support for Chromium, Firefox, and WebKit
3. **Auto-waiting**: Built-in smart waiting for elements
4. **Better Debugging**: Powerful debugging tools (trace viewer, codegen)
5. **Modern API**: More intuitive and consistent API
6. **Network Control**: Better network interception and mocking
7. **No Flakiness**: More reliable auto-waiting mechanism

### Potential Challenges

1. **Happo Integration**: May require custom implementation if no official plugin exists
2. **Testing Library**: API might differ slightly from Cypress version
3. **Custom Commands**: Need to be reimplemented as fixtures or utilities
4. **Learning Curve**: Team needs to learn new API and patterns
5. **CI Configuration**: Requires different setup for browser installation

### Migration Risks

- **Medium Risk**: Happo integration - may need custom work
- **Low Risk**: Test migration - APIs are similar
- **Low Risk**: CI/CD - well-documented patterns exist
- **Low Risk**: Currents integration - official support available

## Timeline Estimate

- **Phase 1 (Installation)**: 1-2 hours
- **Phase 2 (Configuration)**: 2-4 hours
- **Phase 3 (Test Migration)**: 4-8 hours
- **Phase 4 (CI/CD)**: 2-4 hours
- **Phase 5 (Scripts)**: 1 hour
- **Phase 6 (Cleanup)**: 1 hour
- **Phase 7 (Documentation)**: 2-3 hours

**Total Estimated Time**: 13-23 hours

## Resources

### Official Documentation
- [Playwright Documentation](https://playwright.dev/)
- [Playwright Testing Library](https://github.com/testing-library/playwright-testing-library)
- [Currents.dev Documentation](https://currents.dev/readme/integration-with-playwright/currents-playwright)
- [Happo.io Documentation](https://docs.happo.io/)

### Migration Guides
- [Cypress to Playwright Migration Guide](https://playwright.dev/docs/test-runners#cypress)
- [Currents Playwright Integration](https://currents.dev/readme/integration-with-playwright)

### Community Resources
- [Playwright Discord](https://aka.ms/playwright/discord)
- [Playwright GitHub Discussions](https://github.com/microsoft/playwright/discussions)

## Notes

- Consider running Playwright and Cypress in parallel during migration to ensure continuity
- Create feature flag to toggle between old and new E2E tests
- Plan for rollback strategy if issues arise
- Ensure all team members are trained on new tools before full cutover
