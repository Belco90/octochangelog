# Chakra UI v3 Migration Plan

## Overview

This document outlines the migration plan from Chakra UI v2 to v3 for the Octochangelog project. The migration involves updating dependencies, refactoring the theme system, and updating component usage patterns.

---

## Current State Analysis

### Current Dependencies
- `@chakra-ui/react`: 2.8.2
- `@chakra-ui/next-js`: 2.2.0
- `@emotion/react`: 11.14.0
- `@emotion/styled`: 11.14.1
- `framer-motion`: 12.23.12

### Dev Dependencies
- `@chakra-ui/cli`: 2.4.1
- `@chakra-ui/styled-system`: 2.9.2
- `@chakra-ui/theme-tools`: 2.1.2
- `@chakra-ui/utils`: 2.0.14

### Components Used
The project uses the following Chakra UI components:
- Layout: `Box`, `Flex`, `Container`, `Stack`, `VStack`, `Divider`
- Typography: `Heading`, `Text`
- Forms: `FormControl`, `FormLabel`, `Select`
- Feedback: `CircularProgress`, `Skeleton`
- Navigation: `Link`
- Data Display: `Badge`, `Code`
- Other: `Button`, `Icon`, `IconButton`

### Key Files to Update
1. `src/app/Providers.tsx` - Provider setup
2. `src/custom-theme.ts` - Theme configuration
3. `src/app/layout.tsx` - ColorModeScript usage
4. `src/components/ToggleColorModeButton.tsx` - Color mode hook
5. `src/components/ChakraNextLink.tsx` - Next.js Link integration
6. All component files using Chakra UI (30+ files)

---

## Migration Strategy

### Phase 1: Dependency Updates

#### 1.1 Update Core Chakra UI Packages
```json
"@chakra-ui/react": "^3.0.0"
```

**Key Changes:**
- Chakra UI v3 uses a new package structure based on Ark UI
- Emotion is no longer required (Chakra v3 uses native CSS)
- framer-motion is still used for animations

#### 1.2 Remove Deprecated Packages
Remove the following from dependencies:
- `@chakra-ui/next-js` (replaced by `@chakra-ui/react/next-js`)
- `@emotion/react` (no longer needed)
- `@emotion/styled` (no longer needed)

#### 1.3 Remove/Update Dev Dependencies
- Remove `@chakra-ui/cli` (theme typings generation works differently in v3)
- Remove `@chakra-ui/styled-system` (internals changed)
- Remove `@chakra-ui/theme-tools` (use new system package)
- Remove `@chakra-ui/utils` (included in main package)

---

### Phase 2: Provider Setup Changes

#### 2.1 Update `src/app/Providers.tsx`
**Before (v2):**
```tsx
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

<CacheProvider>
  <ChakraProvider theme={customTheme}>
    {children}
  </ChakraProvider>
</CacheProvider>
```

**After (v3):**
```tsx
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

<ChakraProvider value={system}>
  {children}
</ChakraProvider>
```

**Key Changes:**
- Remove `CacheProvider` (not needed in v3)
- Use `value` prop instead of `theme`
- Theme is now called a "system"

#### 2.2 Remove ColorModeScript from `src/app/layout.tsx`
**Before (v2):**
```tsx
import { ColorModeScript } from '@chakra-ui/react'
<ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
```

**After (v3):**
- ColorModeScript is no longer needed
- Color mode is handled automatically by the provider

---

### Phase 3: Theme System Migration

#### 3.1 Convert `src/custom-theme.ts` to System Config

**Major Changes:**
1. Replace `extendTheme` with `createSystem` and `defaultConfig`
2. Update semantic token structure (`_dark` → conditions)
3. Update component theme API
4. Remove `mode()` helper (use conditions instead)
5. Update color scheme references

**Before (v2):**
```typescript
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const customTheme = extendTheme({
  colors: { ... },
  semanticTokens: {
    colors: {
      primaryText: {
        default: primaryTextLightMode,
        _dark: primaryTextDarkMode,
      }
    }
  },
  components: {
    Button: {
      variants: {
        cta: (props) => ({
          bg: mode('primary.900', 'primary.200')(props)
        })
      }
    }
  }
}, withDefaultColorScheme(...))
```

**After (v3):**
```typescript
import { createSystem, defaultConfig } from '@chakra-ui/react'

const customSystem = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: { ... }
    },
    semanticTokens: {
      colors: {
        primaryText: {
          value: {
            base: primaryTextLightMode,
            _dark: primaryTextDarkMode,
          }
        }
      }
    },
    recipes: {
      button: {
        variants: {
          cta: {
            base: { bg: 'primary.900' },
            _dark: { bg: 'primary.200' }
          }
        }
      }
    }
  }
})
```

**Key Changes:**
- `extendTheme` → `createSystem`
- `components` → `recipes` and `slotRecipes`
- `default` → `base` in semantic tokens
- `_dark` becomes a condition at the same level
- No more function-based variants (use conditions)
- `withDefaultColorScheme` is replaced by config options

#### 3.2 Update Semantic Token Structure
All semantic tokens need to be restructured:
```typescript
// v2
primaryText: {
  default: 'gray.900',
  _dark: 'gray.50',
}

// v3
primaryText: {
  value: {
    base: 'gray.900',
    _dark: 'gray.50',
  }
}
```

#### 3.3 Update Component Styles
Component theming moves from `components` to `recipes`:
- Single-part components → `recipes`
- Multi-part components → `slotRecipes`

---

### Phase 4: Component Usage Updates

#### 4.1 Update Color Mode Hook
**File:** `src/components/ToggleColorModeButton.tsx`

**Before (v2):**
```tsx
import { useColorMode } from '@chakra-ui/react'
const { colorMode, toggleColorMode } = useColorMode()
```

**After (v3):**
```tsx
import { useColorMode } from '@chakra-ui/react'
const { colorMode, toggleColorMode } = useColorMode()
```
- The hook API remains the same

#### 4.2 Update Component Props
Some prop names have changed:
- `bgColor` → `bg` (both work, but `bg` is preferred)
- `isRound` → `rounded="full"` (for IconButton)
- Review all color props for semantic token references

#### 4.3 Update Link Components
**File:** `src/components/ChakraNextLink.tsx`

**Before (v2):**
```tsx
export { Link } from '@chakra-ui/next-js'
```

**After (v3):**
```tsx
export { Link } from '@chakra-ui/react/next-js'
```

---

### Phase 5: Testing and Validation

#### 5.1 Remove Theme Typings Generation
- Remove `gen:theme-typings` script from package.json
- Remove `postinstall` hook that runs theme typings

#### 5.2 Update TypeScript Imports
Update all type imports:
```typescript
// v2
import type { ThemeConfig, ColorHues, Theme } from '@chakra-ui/react'
import type { Dict } from '@chakra-ui/utils'

// v3
import type { SystemConfig } from '@chakra-ui/react'
// ColorHues may need to be redefined or use built-in color types
```

#### 5.3 Testing Checklist
- [ ] All components render correctly
- [ ] Color mode toggle works
- [ ] Semantic tokens apply correctly (light/dark modes)
- [ ] Custom button variant (cta) works
- [ ] Links work with Next.js integration
- [ ] Forms render and function properly
- [ ] Responsive styles work
- [ ] Build succeeds without errors
- [ ] Type checking passes
- [ ] Linting passes
- [ ] All existing tests pass

---

## Breaking Changes to Address

### 1. Emotion Removal
- No more `@emotion/react` or `@emotion/styled`
- Custom styled components need migration
- CSS-in-JS patterns need updating

### 2. Theme Structure
- Complete restructure of theme object
- Semantic tokens have different syntax
- Component theming uses recipes instead

### 3. Provider Setup
- No more CacheProvider
- No more ColorModeScript
- Provider prop changes (`theme` → `value`)

### 4. Component Variants
- Function-based variants removed
- Use condition-based styling instead
- `mode()` helper is gone

### 5. Type System
- Type imports have changed
- Theme typings generation works differently
- May need manual type definitions

---

## Rollback Plan

If migration fails or causes critical issues:

1. **Revert Dependencies:**
   ```bash
   pnpm install @chakra-ui/react@2.8.2 @chakra-ui/next-js@2.2.0
   pnpm install @emotion/react@11.14.0 @emotion/styled@11.14.1
   ```

2. **Restore Files:**
   - Revert all changes via git
   - Focus on `Providers.tsx`, `custom-theme.ts`, and `layout.tsx`

3. **Clear Cache:**
   ```bash
   rm -rf .next
   rm -rf node_modules/.cache
   pnpm install
   ```

---

## Implementation Steps

### Step 1: Backup
- [x] Create this migration plan document
- [ ] Create a git branch for migration
- [ ] Document current working state

### Step 2: Update Dependencies
- [ ] Update package.json with new v3 dependencies
- [ ] Remove deprecated packages
- [ ] Run `pnpm install`
- [ ] Fix any peer dependency warnings

### Step 3: Migrate Provider
- [ ] Update `src/app/Providers.tsx`
- [ ] Remove `CacheProvider`
- [ ] Update provider props
- [ ] Remove `ColorModeScript` from layout

### Step 4: Migrate Theme
- [ ] Create new system config in `src/custom-theme.ts`
- [ ] Convert colors to tokens
- [ ] Convert semantic tokens to new structure
- [ ] Convert component themes to recipes
- [ ] Update type definitions

### Step 5: Update Components
- [ ] Update all component imports
- [ ] Update prop names where needed
- [ ] Update ChakraNextLink
- [ ] Review all 30+ component files

### Step 6: Testing
- [ ] Run type checking: `pnpm type-check`
- [ ] Run linting: `pnpm lint`
- [ ] Run tests: `pnpm test`
- [ ] Build project: `pnpm build`
- [ ] Manual testing of key features
- [ ] Test color mode toggle
- [ ] Test responsive behavior

### Step 7: Cleanup
- [ ] Remove unused dependencies
- [ ] Update scripts in package.json
- [ ] Remove old theme typings if any
- [ ] Update documentation

---

## Resources

- [Chakra UI v3 Documentation](https://www.chakra-ui.com/docs/get-started/overview)
- [Chakra UI v3 Migration Guide](https://www.chakra-ui.com/docs/get-started/migration)
- [Chakra UI v3 AI/LLM Guide](https://www.chakra-ui.com/docs/get-started/ai/llms)
- [Ark UI Documentation](https://ark-ui.com/)

---

## Estimated Effort

- **Phase 1 (Dependencies):** 30 minutes
- **Phase 2 (Providers):** 30 minutes
- **Phase 3 (Theme):** 2-3 hours (most complex)
- **Phase 4 (Components):** 2-3 hours (many files to update)
- **Phase 5 (Testing):** 1-2 hours
- **Total:** 6-9 hours

---

## Risk Assessment

**High Risk:**
- Theme system migration (complete restructure)
- Component variant conversion (different API)
- Type system changes (may need workarounds)

**Medium Risk:**
- Provider setup changes
- Component prop updates
- Testing coverage

**Low Risk:**
- Dependency updates
- Import path changes
- Link component updates

---

## Notes

1. **Next.js Compatibility:** Ensure Chakra UI v3 is compatible with Next.js 15.5.4
2. **React 19:** Verify compatibility with React 19.1.1
3. **Custom Components:** Check if custom components (BlockQuote, TextSkeleton, etc.) need updates
4. **Third-party Integration:** Verify Sentry, React Query, and other integrations still work
5. **Performance:** v3 should be faster (no Emotion overhead), but verify in production

---

## Success Criteria

- [ ] All builds pass without errors
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Application runs in dev mode
- [ ] Application builds for production
- [ ] Color mode works correctly
- [ ] All pages render correctly
- [ ] No visual regressions
- [ ] Performance is equal or better

---

*Last Updated: 2025-01-23*
