# `configs/typescript.cjs`

The TypeScript preset. It extends `base`, enables type-aware linting through `typescript-eslint`, and adds rules that make TS code more explicit, safer around Promises, and easier to maintain.

## Purpose

- Inherits every rule from `configs/base.cjs`.
- Enables `typescript-eslint.configs.recommendedTypeChecked`.
- Applies type-aware parser options to `**/*.{ts,mts,cts,tsx}`.
- Uses `projectService: true`, so consuming projects should have a `tsconfig.json`.
- Disables type-aware rules for plain JS files so JavaScript does not need TypeScript project context.

## TypeScript Recommended Type-Checked

`recommendedTypeChecked` enables TypeScript rules backed by type information, such as detecting forgotten Promises, unsafe assignments/calls/member access, enum issues, template expression issues, and other bugs that plain JavaScript parsing cannot reliably catch. This is the main difference between simple TS linting and TS linting that understands types.

## Parser Options

- `projectService: true`: lets `typescript-eslint` find the matching TypeScript project instead of hardcoding `parserOptions.project`.
- `tsconfigRootDir: process.cwd()`: uses the ESLint working directory as the root for `tsconfig` lookup.

## Type Style Rules

- `@typescript-eslint/consistent-type-definitions`: prefers `type` over `interface` for consistent object shape declarations. Teams that rely on declaration merging or public API interfaces can change this rule.
- `@typescript-eslint/consistent-type-imports`: requires `type` imports, keeping runtime imports separate from type-only imports and avoiding accidental bundling.

## Promise And Async Rules

- `@typescript-eslint/no-floating-promises`: catches Promises that are not awaited, returned, or otherwise handled.
- `@typescript-eslint/no-misused-promises`: prevents passing Promises where booleans or synchronous callbacks are expected.
- `@typescript-eslint/require-await`: requires async functions to actually use `await`.
- `@typescript-eslint/return-await`: requires `return await` inside `try/catch` so async errors are caught in the intended scope.

## Safety Rules

- `@typescript-eslint/no-explicit-any`: warns on `any`; it stays at `warn` so migrations and difficult interop are not blocked.
- `no-use-before-define`: disabled because the core rule does not fully understand TypeScript syntax.
- `@typescript-eslint/no-use-before-define`: TypeScript-aware replacement; disallows classes, variables, and types before declaration while allowing function declarations.
- `semi`: disallows semicolons at the end of statements in TypeScript/TSX files; auto-fixable with `eslint --fix` or fix-on-save.

## Unused Variables

- `@typescript-eslint/no-unused-vars`: disabled to avoid conflicts with `unused-imports/no-unused-vars` from `base`.

## JavaScript Override

For `**/*.{js,mjs,cjs,jsx}`, this preset uses `tseslint.configs.disableTypeChecked` so JS files are not affected by rules that require type information.
