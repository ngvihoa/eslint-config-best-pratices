# `eslint.config.cjs`

The config used to lint this repository. It is not a separate public preset; it is a dogfooding example where the repo uses its own package config.

## Purpose

```js
const { node } = require("./index.cjs")

module.exports = node
```

This repository is a Node/CommonJS package, so the `node` preset is the best fit.

## Why `node`

- Enables Node globals in config and package files.
- Allows `console` if CLI or tooling scripts are added later.
- Inherits every base rule from `base`.

## Copying To Another Project

When using this package in another repository, you would usually write:

```js
const { node } = require("@ngvihoa/eslint-config-best-practices")

module.exports = node
```

Or replace `node` with `base`, `typescript`, or `react` depending on the project type.
