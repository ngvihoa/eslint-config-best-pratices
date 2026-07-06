# `configs/node.cjs`

The Node.js preset. It extends `base` and adjusts the environment for backend services, CLIs, scripts, tooling, and Node packages.

## Purpose

- Inherits every rule from `configs/base.cjs`.
- Applies to `**/*.{js,mjs,cjs,ts,mts,cts}`.
- Enables Node globals such as `process`, `Buffer`, `__dirname`, and `require`.
- Enables ES2024 globals.
- Disables the `console` warning because logging is normal in servers, CLIs, and scripts.

## Rule Override

- `no-console: "off"`: allows `console` freely in Node. In browser apps, `console` is often leftover debugging; in Node, it may be the primary CLI output or minimal logging mechanism.

## When To Use

Use this preset for:

- REST or GraphQL backends.
- CLI tools.
- Build scripts.
- Node packages.
- Config and tooling repos that do not run in the browser.
