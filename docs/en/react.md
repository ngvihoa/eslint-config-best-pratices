# `configs/react.cjs`

The React + TypeScript preset. It extends `typescript` and enables JSX, React, React Hooks, and accessibility rules.

## Purpose

- Inherits every rule from `configs/typescript.cjs`.
- Applies to `**/*.{jsx,tsx}`.
- Enables browser globals for browser-rendered components.
- Enables `ecmaFeatures.jsx`.
- Detects the React version through `settings.react.version: "detect"`.
- Uses `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-jsx-a11y`.

## React Recommended Rules

`react.configs.recommended.rules` enables common rules that catch component, props, JSX, old lifecycle, key, children, and other React-specific mistakes. It is the baseline rule set from the React linting ecosystem.

## JSX Runtime Rules

`react.configs["jsx-runtime"].rules` adjusts linting for the newer React JSX transform, where `import React from "react"` is not required just to use JSX.

## React Hooks Rules

`reactHooks.configs.recommended.rules` enables the most important Hooks rules:

- Hooks must be called only at the top level of components or custom hooks.
- Dependency arrays are checked for `useEffect`, `useMemo`, `useCallback`, and similar hooks.

## Accessibility Rules

- `jsx-a11y/alt-text`: image-like elements must have appropriate alternative text.
- `jsx-a11y/anchor-is-valid`: warns about anchors without valid `href` values or with incorrect roles.
- `jsx-a11y/click-events-have-key-events`: clickable elements need keyboard interaction.
- `jsx-a11y/no-autofocus`: warns on `autoFocus` because it can harm keyboard and screen reader experiences.

## React Style Rules

- `react/boolean-prop-naming`: warns when boolean prop names are unclear.
- `react/jsx-boolean-value`: prefers `<Button disabled />` over `<Button disabled={true} />`.
- `react/jsx-fragments`: prefers fragment shorthand `<>...</>` when possible.
- `react/jsx-no-useless-fragment`: warns about unnecessary fragments.
- `react/no-array-index-key`: warns on array index keys because they can cause bugs when lists reorder.
- `react/prop-types`: disabled because TypeScript checks props.
