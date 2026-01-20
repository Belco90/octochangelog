# Git Workflow Guide

This guide covers Git hooks, branch protection, and commit conventions.

## Pre-commit Hook

**File**: `.husky/pre-commit`

Automatically runs before every commit via Husky.

### What it does

1. **Prevents commits to main branch**
   - Blocks direct commits to `main`
   - Forces use of feature branches and PRs
   - Can be bypassed with `-n` flag (not recommended)

2. **Runs lint-staged**
   - Lints and formats only changed files
   - Auto-fixes issues when possible
   - Configured in `lint-staged.config.js`

### lint-staged Configuration

**File**: `lint-staged.config.js`

Runs different commands based on file type:

**JavaScript/TypeScript files** (`.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, `.cjs`):

```bash
eslint --fix
```

Automatically fixes linting issues where possible.

**All files**:

```bash
prettier --write
```

Auto-formats code according to Prettier configuration.

### Bypassing the Pre-commit Hook

**Not recommended**, but can be done with:

```bash
git commit -n -m "message"
# or
git commit --no-verify -m "message"
```

Only use this in exceptional circumstances (e.g., fixing a critical production bug on main).

## Branch Protection

### Main Branch

Direct commits to `main` are blocked by the pre-commit hook.

**Recommended workflow**:

1. Create a feature branch:

   ```bash
   git checkout -b feature/my-feature
   ```

2. Make changes and commit:

   ```bash
   git add .
   git commit -m "Add feature"
   ```

3. Push to remote:

   ```bash
   git push -u origin feature/my-feature
   ```

4. Create a pull request on GitHub

5. After CI passes and review approval, merge to `main`

### Feature Branches

No restrictions on feature branches. Commit freely and push as needed.

## Commit Conventions

While there are no enforced commit message conventions, consider following these patterns for clarity:

### Suggested Format

```
type: brief description

Optional longer description with details about:
- What changed
- Why it changed
- Any breaking changes or migration notes
```

### Common Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks (dependencies, config, etc.)
- `perf:` - Performance improvements
- `ci:` - CI/CD changes

### Examples

```bash
feat: add changelog comparison feature

fix: resolve issue with release sorting

docs: update README with installation instructions

test: add unit tests for release parser

refactor: extract markdown processing to custom hook

chore: update dependencies to latest versions
```

## Working with Pre-commit Hook Failures

### Linting Failures

If the pre-commit hook fails due to linting errors:

```bash
# Run lint fix manually
pnpm lint:fix

# Stage the auto-fixed files
git add .

# Try committing again
git commit -m "your message"
```

### Formatting Failures

If the pre-commit hook fails due to formatting:

```bash
# Run formatter manually
pnpm format

# Stage the formatted files
git add .

# Try committing again
git commit -m "your message"
```

### Understanding Hook Output

The pre-commit hook shows:

1. **Files being checked**: Only staged files are processed
2. **Commands being run**: ESLint and Prettier commands
3. **Results**: Success or failure for each file
4. **Auto-fixed files**: Files that were automatically corrected

If auto-fixes are made, you'll need to stage them and commit again.

## Pull Request Workflow

### Creating a Pull Request

1. Push your feature branch to GitHub
2. Open a pull request against `main`
3. Fill out the PR template (`.github/pull_request_template.md`)
4. Wait for CI checks to pass
5. Request review from team members

### PR Template

The repository includes a PR template with sections for:

- Description of changes
- Type of change (bug fix, feature, etc.)
- Testing done
- Checklist of requirements

### CI Checks on PRs

All PRs run the full CI pipeline (see [CI.md](CI.md)):

- Linting
- Type checking
- Formatting check
- Unit tests with coverage
- E2E tests
- Visual regression tests

PRs cannot be merged until all CI checks pass.

## Troubleshooting

### Pre-commit hook blocks commit on main

**Error**: "You cannot commit directly to the main branch"

**Solution**: Switch to a feature branch:

```bash
# Stash your changes
git stash

# Switch to a feature branch
git checkout -b feature/my-changes

# Apply your changes
git stash pop

# Commit on the feature branch
git commit -m "your message"
```

### Pre-commit hook is too slow

lint-staged only processes **staged files**, but if you have many staged files, it can take time.

**Tips**:

- Commit smaller chunks of changes
- Run linting and formatting before staging: `pnpm lint:fix && pnpm format`
- This pre-validates files before the hook runs

### Hook installed but not running

Ensure Husky is properly installed:

```bash
pnpm install  # Runs prepare script which installs Husky
```

Check that `.husky/pre-commit` exists and is executable:

```bash
ls -la .husky/pre-commit
```

## Setup on New Clone

When cloning the repository for the first time:

```bash
git clone <repository-url>
cd octochangelog

# Install dependencies (this runs the prepare script to setup Husky)
pnpm install
```

The `prepare` script in `package.json` automatically runs `husky`, which sets up Git hooks.
