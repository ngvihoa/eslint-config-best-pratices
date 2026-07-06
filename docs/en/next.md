# `configs/next.cjs`

The Next.js preset. It extends `react` and adds official rules from `@next/eslint-plugin-next`, including Core Web Vitals rules.

## Purpose

- Inherits every rule from `configs/react.cjs`.
- Applies to `**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}`.
- Enables the `@next/next` plugin.
- Enables `@next/next` recommended rules.
- Enables `@next/next` Core Web Vitals rules.

## When To Use

Use this preset for Next.js projects, especially:

- Next.js App Router.
- Next.js Pages Router.
- Next.js + TypeScript.
- Next.js full-stack apps with route handlers, server components, and client components.

## Next Recommended Rules

`nextPlugin.configs.recommended.rules` enables the official Next.js rule set for common framework-specific mistakes, such as incorrect Next API usage, less optimal link/image/script patterns, or page structures that do not match framework expectations.

## Core Web Vitals Rules

`nextPlugin.configs["core-web-vitals"].rules` adds stricter rules related to performance and user experience. This group is a good default for production apps because it focuses on issues that directly affect page quality.

## Usage

```js
const { next } = require("@ngvihoa/eslint-config-best-practices")

module.exports = next
```

If your project uses `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config"
import config from "@ngvihoa/eslint-config-best-practices"

const eslintConfig = defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  ...config.next,
])

export default eslintConfig
```

Do not combine this preset with `eslint-config-next/core-web-vitals` or `eslint-config-next/typescript` in the same flat config. The `next` preset already includes React, TypeScript, and official Next.js rules; combining both configs can make ESLint report duplicate plugins such as `jsx-a11y`. Use `globalIgnores` for app-specific ignore patterns instead.

## Relationship With Other Presets

```txt
base
└─ typescript
   └─ react
      └─ next
```

For a Next.js project, you usually only need `next`. You do not need to add `base`, `typescript`, or `react` separately because `next` already inherits them.
