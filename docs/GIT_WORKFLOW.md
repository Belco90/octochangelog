# Git Workflow Guide

This guide describes the Git workflow, branch protection, and automated checks.

## Branch Protection

Direct commits to the main branch are blocked by a pre-commit hook. This enforces a pull request workflow for all changes.

**Recommended workflow**:

1. Create a feature branch
2. Make changes and commit
3. Push to remote
4. Create a pull request
5. After CI passes and review, merge to main

Feature branches have no restrictions - commit and push freely.

## Pre-commit Automation

A pre-commit hook runs automatically before each commit:

1. **Blocks commits to main** - Forces use of feature branches
2. **Runs lint-staged** - Lints and formats only changed files

### lint-staged Behavior

Different file types get different treatment:

- **JS/TS files**: ESLint auto-fix
- **All files**: Prettier auto-format

Only staged files are processed, keeping commits fast.

### Bypassing the Hook

You can bypass with `-n` or `--no-verify`, but this is not recommended except in exceptional circumstances (like fixing critical production bugs).

```bash
git commit -n -m "message"
```

## Commit Conventions

While not enforced, consider these patterns for clarity:

### Suggested Format

```
type: brief description

Optional longer details about:
- What changed
- Why it changed
- Breaking changes or migration notes
```

### Common Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style/formatting
- `refactor:` - Code restructuring
- `test:` - Test changes
- `chore:` - Maintenance (deps, config)
- `perf:` - Performance improvements
- `ci:` - CI/CD changes

## Handling Hook Failures

### Linting Issues

If the pre-commit hook fails due to linting:

```bash
# Run lint fix manually
pnpm lint:fix

# Stage the auto-fixed files
git add .

# Try committing again
git commit -m "your message"
```

### Formatting Issues

If formatting fails:

```bash
# Run formatter manually
pnpm format

# Stage the formatted files
git add .

# Try committing again
git commit -m "your message"
```

### Understanding Hook Output

The hook shows:

- Files being checked (only staged files)
- Commands being run
- Results for each file
- Auto-fixed files

If auto-fixes are made, stage them and commit again.

## Pull Request Workflow

### Creating a Pull Request

1. Push your feature branch to GitHub
2. Open a pull request against main
3. Fill out the PR description (template may be provided)
4. Wait for CI checks to pass
5. Request review from team members

### CI Checks on PRs

All PRs run the full CI pipeline (see CI.md):

- Linting
- Type checking
- Formatting check
- Unit tests with coverage
- E2E tests
- Visual regression tests

PRs cannot be merged until all checks pass.

## Common Issues

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

### Pre-commit hook is slow

lint-staged only processes staged files, but many files can take time.

**Tips**:

- Commit smaller chunks
- Run linting/formatting before staging: `pnpm lint:fix && pnpm format`
- This pre-validates files before the hook runs

### Hook not running

Ensure Husky is properly installed:

```bash
pnpm install  # Runs prepare script which installs Husky
```

## Setup on New Clone

When cloning the repository:

```bash
git clone <repository-url>
cd octochangelog

# Install dependencies (runs prepare script to setup Husky)
pnpm install
```

The prepare script automatically sets up Git hooks.
