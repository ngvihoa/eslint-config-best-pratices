# ESLint Config Best Practices

Reusable ESLint flat config presets for JavaScript, TypeScript, React, Next.js, and Node projects.

## Install

```sh
npm install --save-dev eslint @ngvihoa/eslint-config-best-practices
```

## Usage

Create `eslint.config.cjs` in your project:

```js
const { base } = require("@ngvihoa/eslint-config-best-practices")

module.exports = base
```

For Node projects:

```js
const { node } = require("@ngvihoa/eslint-config-best-practices")

module.exports = node
```

For TypeScript projects:

```js
const { typescript } = require("@ngvihoa/eslint-config-best-practices")

module.exports = typescript
```

For React + TypeScript projects:

```js
const { react } = require("@ngvihoa/eslint-config-best-practices")

module.exports = react
```

For Next.js projects:

```js
const { next } = require("@ngvihoa/eslint-config-best-practices")

module.exports = next
```

If your Next.js project uses `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config"
import config from "@ngvihoa/eslint-config-best-practices"

const eslintConfig = defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  ...config.next,
])

export default eslintConfig
```

Do not combine this preset with `eslint-config-next/core-web-vitals` or `eslint-config-next/typescript` in the same flat config. The `next` preset already includes React, TypeScript, and official Next.js rules, so combining both configs can redefine plugins such as `jsx-a11y`. Use `globalIgnores` for app-specific ignore patterns instead.

## Fix On Save

Install the VS Code ESLint extension:

```txt
dbaeumer.vscode-eslint
```

Then add this to your project-level `.vscode/settings.json`:

```json
{
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  "[javascript][javascriptreact][typescript][typescriptreact]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "always"
    }
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

This lets ESLint fix auto-fixable rules whenever you save a file, such as sorting imports with `best-practices/sort-imports`, removing semicolons from `semi`, cleaning unused imports from `unused-imports/no-unused-imports`, and applying other safe ESLint fixes.

If you are updating this package, you should run `ESLint: Restart ESLint Server` from the VS Code Command Palette. Use `View > Output > ESLint` to diagnose extension or working-directory errors.

If you also use Prettier on save, make sure Prettier does not add semicolons back after ESLint removes them. Add a project-level `.prettierrc`:

```json
{
  "semi": false
}
```

If you prefer to run fixes manually, use:

```sh
npx eslint . --fix
```

Running ESLint without `--fix` only reports problems:

```sh
npx eslint .
```

## Import Sorting

The `base`, `typescript`, `react`, and `next` presets enable the auto-fixable `best-practices/sort-imports` rule. It works with `import-x/order` to apply this group order:

1. Type imports
2. Node built-ins
3. External packages
4. Internal aliases such as `@/` and `~/`
5. Parent imports
6. Sibling and index imports, including stylesheet side effects

Within a group, imports are arranged by single-line named, multiline named, and default/side-effect form. Named specifiers in multiline imports are sorted by descending length.

Save a file with imports scattered like this:

```tsx
import "./product.css"
import ProductDetails from "./ProductDetails"
import Image from "next/image"
import { formatCurrency } from "../lib/currency"
import {
  Price,
  AddToWishlistButton,
  ProductGallery,
} from "@/features/catalog"
import { readFile } from "node:fs/promises"
import type { ProductPageProps } from "@/features/catalog/types"
import { notFound } from "next/navigation"
```

ESLint rewrites the entire import section into a predictable dependency map:

```tsx
import type { ProductPageProps } from "@/features/catalog/types"

import { readFile } from "node:fs/promises"

import { notFound } from "next/navigation"
import Image from "next/image"

import {
  AddToWishlistButton,
  ProductGallery,
  Price,
} from "@/features/catalog"

import { formatCurrency } from "../lib/currency"

import ProductDetails from "./ProductDetails"
import "./product.css"
```

## Presets

- `base`: JavaScript recommended rules, custom import sorting, unused import cleanup, and general code-quality rules.
- `node`: `base` plus Node globals and console-friendly defaults.
- `typescript`: `base` plus `typescript-eslint` recommended and type-aware rules.
- `react`: `typescript` plus React, React Hooks, JSX runtime, and accessibility rules.
- `next`: `react` plus official Next.js recommended and Core Web Vitals rules.

## Per-File Documentation

Each `.cjs` file has Vietnamese and English documentation explaining its purpose, rules, and tradeoffs.

| File                     | Vietnamese                     | English                        |
| ------------------------ | ------------------------------ | ------------------------------ |
| `index.cjs`              | [VI](docs/vi/index.md)         | [EN](docs/en/index.md)         |
| `eslint.config.cjs`      | [VI](docs/vi/eslint-config.md) | [EN](docs/en/eslint-config.md) |
| `configs/base.cjs`       | [VI](docs/vi/base.md)          | [EN](docs/en/base.md)          |
| `configs/node.cjs`       | [VI](docs/vi/node.md)          | [EN](docs/en/node.md)          |
| `configs/typescript.cjs` | [VI](docs/vi/typescript.md)    | [EN](docs/en/typescript.md)    |
| `configs/react.cjs`      | [VI](docs/vi/react.md)         | [EN](docs/en/react.md)         |
| `configs/next.cjs`       | [VI](docs/vi/next.md)          | [EN](docs/en/next.md)          |

## Type-Aware TypeScript

The TypeScript preset uses `projectService: true`, so it expects a `tsconfig.json` in the consuming project. If you lint generated files or config files outside your TypeScript project, add an override in that project's `eslint.config.cjs`.
