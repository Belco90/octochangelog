# Chakra UI v3 Migration Plan

## Migration Status Overview

The repository is currently in the process of migrating from Chakra UI v2 to v3. This document outlines what has been completed and what remains to be done.

> **Note**: For detailed Chakra UI v3 documentation optimized for LLMs, see https://chakra-ui.com/llms.txt

## ✅ Completed

1. **Core Theme System**
   - ✅ Created new `src/theme.ts` with Chakra v3 system using `createSystem()` and `defineConfig()`
   - ✅ Migrated color tokens (primary/fuchsia, secondary/sky, gray/coolGray)
   - ✅ Migrated font tokens
   - ✅ Created semantic tokens for colors and shadows
   - ✅ Defined custom recipes for Button (CTA variant) and Container

2. **Provider Setup**
   - ✅ Created `src/components/ThemeProvider.tsx` using new `ChakraProvider` with system
   - ✅ Set up `ColorModeProvider` using `next-themes` integration
   - ✅ Updated `src/app/Providers.tsx` to use new ThemeProvider

3. **Snippets**
   - ✅ Added `src/components/snippets/color-mode.tsx` with v3-compatible color mode utilities
   - ✅ Added `src/components/snippets/toaster.tsx` with v3 Toast API
   - ✅ Added `src/components/snippets/tooltip.tsx` with v3 Tooltip API

4. **Component Updates**
   - ✅ Created `src/components/SimpleBlockquote.tsx` wrapper for v3 Blockquote API
   - ✅ Updated `src/components/Link.tsx` to use colorPalette and new color syntax
   - ✅ Updated `src/app/layout.tsx` - removed ColorModeScript (no longer needed in v3)
   - ✅ Updated most components to use new import patterns

## 🔧 Pending Changes

### 1. **Replace ToggleColorModeButton with ColorModeButton snippet**
   - **File**: `src/components/ToggleColorModeButton.tsx`
   - **Issue**: Has TODO comment "replace this one by the snippet"
   - **Action**: Replace with the `ColorModeButton` from `src/components/snippets/color-mode.tsx`
   - **Impact**: `src/components/Header.tsx` uses this component

### 2. **Fix ChakraNextLink component**
   - **File**: `src/components/ChakraNextLink.tsx`
   - **Issue**: Has TODO comment "fix this"
   - **Action**: Verify the `asChild` pattern works correctly with Next.js Link in v3
   - **Impact**: Used in `src/components/Header.tsx` and `src/app/not-found.tsx`

### 3. **Update deprecated prop names**
   
   The following deprecated props need to be updated across multiple files:

   #### a. `noOfLines` → `lineClamp`
   - **File**: `src/app/compare/ReleaseVersionFormControl.tsx`
   - **Line**: FormLabel uses `noOfLines={1}`

   #### b. `boxSize` → Individual `width` and `height` props (or keep `boxSize` as it's still supported)
   - **Note**: While `boxSize` is deprecated, it may still work. Best practice is to use explicit `width` and `height` props.
   - **Files**:
     - `src/components/ToggleColorModeButton.tsx` (Icon)
     - `src/components/GitHubLoginButton.tsx` (Icon)
     - `src/components/snippets/color-mode.tsx` (Skeleton)
     - `src/components/Header.tsx` (Box, Icon - multiple instances)
     - `src/app/HomePage.tsx` (Flex, Icon)

   #### c. `rounded` → `borderRadius`
   - **Note**: `rounded` is a shorthand that's deprecated in v3. Use full `borderRadius` prop.
   - **Files**:
     - `src/components/Header.tsx` (Link)
     - `src/app/compare/ProcessedReleaseChangeDescription.tsx` (Tag)

   #### d. `isRound` → `borderRadius="full"` (for IconButton)
   - **File**: `src/components/ToggleColorModeButton.tsx`

   #### e. `styleType` → `listStyleType` and `stylePosition` → `listStylePosition`
   - **File**: `src/app/compare/ProcessedReleaseChangeDescription.tsx`
   - **Components**: RemarkUl and RemarkOl

### 4. **Review and update semantic tokens**
   - **File**: `src/theme.ts`
   - **Issue**: Has TODO comment "review these semantic tokens to move them somewhere else, or delete them if not used"
   - **Action**: Audit usage of semantic tokens:
     - `primaryText`, `secondaryText`, `tertiaryText`
     - `monochrome1-5`, `monochromeInverted1-5`
     - `background1-3`
   - **Decision needed**: Keep, refactor, or remove unused tokens

### 5. **Enable strict tokens**
   - **File**: `src/theme.ts`
   - **Issue**: Has TODO comment "enable strict tokens once the theme is stable"
   - **Action**: 
     1. Ensure all components use defined tokens
     2. Uncomment `strictTokens: true` in config
     3. Run type check to find violations
     4. Fix any violations

### 6. **Update color mode value usage**
   - **File**: `src/app/HomePage.tsx`
   - **Issue**: Uses `useColorModeValue` from snippets (which is fine), but should verify it works as expected
   - **Action**: Test that color mode switching works correctly for icon colors

### 7. **Update layout viewport colors**
   - **File**: `src/app/layout.tsx`
   - **Issue**: Theme colors are commented out in viewport config
   - **Action**: Uncomment and update to use new theme color references
   ```typescript
   // Current (commented):
   // color: customTheme.colors.primary['300'],
   
   // Should be something like:
   color: system.tokens.colors.primary[300]
   ```

### 8. **Verify VStack usage**
   - **File**: `src/app/not-found.tsx`
   - **Issue**: Uses `VStack` component
   - **Action**: `VStack` is still available in v3 as a convenience wrapper. No action needed unless there are issues.
   - **Note**: `VStack` is just `<Stack direction="column">` under the hood and remains supported.

### 9. **Verify Container centerContent prop**
   - **File**: `src/components/Footer.tsx`
   - **Issue**: Uses `centerContent` prop on Container
   - **Action**: Verify this prop exists in v3 or replace with appropriate flex/align props

### 10. **Check InputGroup and InputRightElement**
   - **File**: `src/app/compare/RepositorySearchCombobox.tsx`
   - **Issue**: Uses `InputGroup` and `InputRightElement`
   - **Action**: Verify these components still exist in v3 with the same API

### 11. **Documentation updates**
   - **File**: `CONTRIBUTING.md`
   - **Action**: Update documentation to reflect Chakra UI v3 patterns:
     - Update `useColorModeValue` examples (now from snippets, not from `@chakra-ui/react`)
     - Update any deprecated prop examples
     - Mention the new theme system with `createSystem()` and recipes

## 🧪 Testing Requirements

After making changes:

1. **Visual Testing**
   - Run dev server and check all pages render correctly
   - Test color mode toggle functionality
   - Verify all interactive components work

2. **Build Testing**
   - Run `pnpm build` to ensure no compilation errors
   - Check for any type errors with `pnpm type-check`

3. **Linting**
   - Run `pnpm lint` to catch any issues
   - Run `pnpm format:check` for formatting

4. **E2E Testing** (if Cypress works)
   - Run existing E2E tests to verify nothing broke
   - Focus on interaction and navigation tests

## 📚 Resources

- [Chakra UI v3 LLM Documentation](https://chakra-ui.com/llms.txt) - Official LLM-optimized documentation
- [Chakra UI v3 Migration Guide](https://www.chakra-ui.com/docs/get-started/migration)
- [Chakra UI v3 Documentation](https://www.chakra-ui.com/)
- [Chakra UI v3 Recipes](https://www.chakra-ui.com/docs/styling/recipes)

## Priority Order

1. **High Priority** (Breaking changes that prevent builds):
   - Fix deprecated props that cause TypeScript errors
   - Update component APIs that have changed

2. **Medium Priority** (Functional but using deprecated patterns):
   - Replace ToggleColorModeButton with snippet version
   - Fix ChakraNextLink component
   - Update all deprecated prop names

3. **Low Priority** (Nice to have):
   - Enable strict tokens mode
   - Clean up unused semantic tokens
   - Update documentation

## Notes

- The migration is already well underway with the core theme system in place
- Most components are already using v3-compatible imports
- Main work remaining is updating deprecated prop names and finishing component replacements
- The app uses Next.js App Router, so ensure SSR compatibility with all changes
