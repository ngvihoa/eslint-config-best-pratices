# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2] - 2026-08-05

### Added

- Add the auto-fixable `best-practices/sort-imports` rule for JavaScript, TypeScript, React, and Next.js files.
- Add import sorting for type, Node built-in, external, internal alias, parent, sibling, index, and side-effect imports.
- Add descending-length sorting for multiline named import specifiers.
- Export the internal ESLint plugin through `@ngvihoa/eslint-config-best-practices/plugin`.
- Add RuleTester coverage for import groups, stylesheet side effects, TypeScript type imports, and multiline named imports.
- Add VS Code fix-on-save documentation.

### Changed

- Apply the base import rules to `.ts`, `.mts`, `.cts`, and `.tsx` files in addition to JavaScript files.
- Place type imports before value imports and separate import groups with blank lines.
- Let the custom rule own within-group ordering to avoid conflicts with `import-x/order` alphabetization.

## [0.1.1]

### Added

- Add reusable flat config presets for JavaScript, TypeScript, React, Next.js, and Node.js.
- Add import hygiene, unused import cleanup, React Hooks, JSX accessibility, and type-aware TypeScript rules.
