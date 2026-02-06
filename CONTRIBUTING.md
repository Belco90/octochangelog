# Contributing

Thank you for wanting to help us!
Read this document for information on how to get started.

## General overview of project

We use [TanStack Start](https://tanstack.com/start) with [Vite](https://vite.dev/) to build and generate the static website.
All our website styling is done with the [Chakra UI v3](https://www.chakra-ui.com/docs/get-started/overview) framework, which includes built-in dark mode support.

## What you'll need to know to be able to help

You'll need a basic understanding of HTML/CSS to be able to help with the code.
It's even better if you know a bit of React and the basics of TypeScript.

## Software requirements

- Git
- pnpm package manager (version specified in "engines" property within `package.json`)
- Node.js v22 (specified in `.nvmrc`, optional - pnpm can manage Node.js version for you)

This guide assumes you'll run the code on your workstation directly.

### Where to get Git

The [git-scm.com](https://git-scm.com/) site has links to download Git for your operating system.

### Where to get pnpm

In case you didn't get pnpm setup in your environment, [there are different ways of installing/updating it](https://pnpm.io/installation).

### Where to get Node.js (optional)

You can install Node.js through a [Node.js version manager](https://docs.npmjs.com/cli/v7/configuring-npm/install#using-a-node-version-manager-to-install-nodejs-and-npm).
However, [pnpm can manage the Node.js version automatically for you](https://pnpm.io/blog/2021/12/29/yearly-update#managing-nodejs-versions-since-v6120), so you can run it even with no Node.js preinstalled on the system.

## Make a fork

Use the GitHub web interface to create your own fork of the Octochangelog repository.

Do not put your own work on your forks `main` branch.
Create a new feature branch for each bit of work!

## Installing development dependencies

We use pnpm to manage our dependencies.
Run the `pnpm install` command in your own Octochangelog directory to install all dependencies:

```bash
$ pnpm install
```

## Development process

You're ready to start work now.
We recommend you follow this process:

1. Create a feature branch
1. Start the development server with `pnpm dev`
1. Make the necessary changes
1. Put chunks of work in a commit (the Husky program will run some checks for modified files)
1. Write/adjust tests to check the functionality of the new code
1. Create pull request
1. Fix code validation problems reported and failed tests from CI

## Mocked API

We use [MSW](https://mswjs.io/) to mock API calls.
Now you can run Vitest tests, Playwright tests and the local environment against this mocked API, without needing a real connection or reaching GitHub API's limit.

### Toggling the mocked API

This mocked API can be toggled through the `VITE_API_MOCKING` environment variable, which is disabled by default for local development (but enabled in CI). Use `enabled` to start it alongside the project, or leave it empty to stop it.

You can just run `pnpm dev:mock` to start the project with the mocked API enabled.

### Limitations

The endpoint to search repositories (used in the _Enter repository name_ input field in the comparator) only returns a couple of results for "testing library" and "renovate", so it's only possible to search those terms.

## Query string to check comparator output

Use the following query string to check the comparator output:

```
?repo=testing-library%2Fdom-testing-library&from=v6.16.0&to=v8.1.0
```

## Dark mode

Dark mode is now fully enabled and built into the application using Chakra UI v3's native dark mode support with `next-themes`.

Users can toggle between light and dark themes using the color mode button in the header.

### Setting colors for light/dark mode

Chakra UI v3 uses semantic tokens for color values that automatically adapt to the current color mode. Use semantic tokens like `bg`, `fg`, `border`, etc. whenever possible:

```typescript
// Preferred - uses semantic tokens that adapt automatically
<Box bg="bg" color="fg" borderColor="border" />
<Text color="fg.muted" />
```

For custom color mode values, use the `useColorModeValue` hook from the color mode snippet:

```typescript
import { useColorModeValue } from '@/components/snippets/color-mode'

function MyComponent() {
  const bgColor = useColorModeValue('white', 'gray.800')
  return <Box bg={bgColor}>Content</Box>
}
```

### Example in code

Here's an example of how to colorize a component with Chakra v3:

```typescript
import { Box, Container } from '@chakra-ui/react'
import { useColorModeValue } from '@/components/snippets/color-mode'

function Footer() {
  // Option 1: Use semantic tokens (preferred)
  return (
    <Box as="footer" bg="bg.subtle" borderColor="border.muted">
      <Container>Content</Container>
    </Box>
  )

  // Option 2: Use useColorModeValue for custom values
  const customBg = useColorModeValue('blue.50', 'blue.900')
  return (
    <Box as="footer" bg={customBg}>
      <Container>Content</Container>
    </Box>
  )
}
```

## Running E2E

Our E2E tests are implemented with Playwright, and are run against a mocked GitHub API with MSW.

You can run them locally with `pnpm e2e` or `pnpm e2e:ui` if you want to interact with the UI.
