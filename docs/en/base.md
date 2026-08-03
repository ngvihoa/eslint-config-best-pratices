# `configs/base.cjs`

The base JavaScript preset. Use this as the starting point for most JS projects because it combines low-noise safety rules, import hygiene, and unused code cleanup.

## Purpose

- Ignores common generated folders such as `.next`, `.nuxt`, `coverage`, `dist`, `build`, `node_modules`, and `public`.
- Uses `@eslint/js` recommended rules for core JavaScript correctness.
- Enables browser and ES2024 globals.
- Manages imports with `eslint-plugin-import-x`.
- Detects unused imports and variables with `eslint-plugin-unused-imports`.
- Treats `.cjs` and `.cts` files as CommonJS with Node globals.

## Rules From `@eslint/js`

`js.configs.recommended` enables ESLint's core bug-catching rules, such as undeclared variables, unreachable code, duplicate cases, unsafe optional chaining, invalid regular expressions, getters without returns, invalid constructors, and other clear runtime problems. It is the foundation before project-specific best-practice rules are added.

## Import Rules

- `import-x/consistent-type-specifier-style`: keeps type imports at the top level so type-only imports are explicit and easier to process.
- `import-x/first`: keeps imports before other statements for easier scanning.
- `import-x/newline-after-import`: requires a blank line after imports to separate dependencies from implementation.
- `import-x/no-duplicates`: prevents duplicate imports from the same module.
- `import-x/order`: auto-sorts import declarations by built-in, external package, internal alias (`@/`, `~/`), type, parent, sibling/index, and side-effect groups; it separates groups with blank lines and alphabetizes each group. Misplaced side-effect imports are reported but not moved automatically to avoid changing execution order.
- `sort-imports`: auto-sorts named imports inside `{}` alphabetically, while `import-x/order` owns declaration ordering.

## Unused Rules

- `no-unused-vars`: disabled to avoid conflicts with `unused-imports`.
- `unused-imports/no-unused-imports`: reports unused imports and can auto-fix them.
- `unused-imports/no-unused-vars`: warns about unused variables; names starting with `_` are allowed to show intentional ignoring.

## Code Quality Rules

- `array-callback-return`: requires callbacks in `map`, `filter`, `reduce`, and similar methods to return expected values.
- `curly`: requires braces for multiline blocks to reduce mistakes when adding lines later.
- `eqeqeq`: requires `===` and `!==`, while still allowing `== null` to check both `null` and `undefined`.
- `no-console`: warns on `console`, except `console.warn` and `console.error`.
- `no-debugger`: prevents committed `debugger` statements.
- `no-else-return`: removes unnecessary `else` blocks after `return`.
- `no-empty`: prevents empty blocks, while allowing intentionally empty `catch` blocks.
- `no-implicit-coercion`: avoids terse implicit casts such as `!!foo`, `+foo`, and `foo + ""`.
- `no-lonely-if`: prefers `else if` over `else { if (...) }`.
- `no-nested-ternary`: warns on nested ternaries because they are hard to read.
- `no-param-reassign`: prevents reassignment of function parameters and surprising side effects.
- `no-return-await`: avoids unnecessary `return await`.
- `no-template-curly-in-string`: catches `${value}` written in a normal string instead of a template literal.
- `no-unneeded-ternary`: avoids redundant ternaries like `condition ? true : false`.
- `no-use-before-define`: disallows using classes and variables before declaration; function declarations are allowed.
- `no-var`: requires `let` and `const` instead of `var`.
- `object-shorthand`: prefers object shorthand syntax when available.
- `prefer-const`: requires `const` when a binding is never reassigned, including destructuring.
- `prefer-template`: prefers template literals over string concatenation where appropriate.
- `semi`: disallows semicolons at the end of statements; auto-fixable with `eslint --fix`.
- `yoda`: disallows Yoda conditions like `"red" === color`.

## CommonJS Override

For `**/*.{cjs,cts}`, the preset sets `sourceType: "commonjs"` and enables Node globals such as `require`, `module`, and `__dirname`. This keeps legacy config and tooling files from being linted as ESM.
