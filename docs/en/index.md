# `index.cjs`

The package entry point. This file collects and exports every preset so other projects can import from the package root.

## Purpose

```js
const { base, next, node, react, typescript } = require("@ngvihoa/eslint-config-best-practices")
```

Instead of making users import paths like `@ngvihoa/eslint-config-best-practices/configs/base.cjs`, this file provides a short and stable API.

## Exports

- `base`: base JavaScript preset from `configs/base.cjs`.
- `next`: Next.js preset from `configs/next.cjs`.
- `node`: Node preset from `configs/node.cjs`.
- `typescript`: TypeScript preset from `configs/typescript.cjs`.
- `react`: React + TypeScript preset from `configs/react.cjs`.

## Why CommonJS

The package uses `type: "commonjs"` and `.cjs` files for broad compatibility, including projects that have not moved to ESM. ESLint flat config supports this export style well.
