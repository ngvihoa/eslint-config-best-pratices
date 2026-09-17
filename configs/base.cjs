const js = require("@eslint/js")
const importX = require("eslint-plugin-import-x")
const unusedImports = require("eslint-plugin-unused-imports")
const globals = require("globals")

const bestPractices = require("../plugin.cjs")

module.exports = [
  {
    ignores: [
      "**/.cache/**",
      "**/.next/**",
      "**/.nuxt/**",
      "**/coverage/**",
      "**/dist/**",
      "**/build/**",
      "**/node_modules/**",
      "**/public/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
    plugins: {
      "best-practices": bestPractices,
      "import-x": importX,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },
    rules: {
      "array-callback-return": "error",
      curly: ["error", "multi-line"],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "import-x/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import-x/first": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-duplicates": "error",
      "import-x/order": 'off',
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-else-return": ["error", { allowElseIf: false }],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-implicit-coercion": "error",
      "no-lonely-if": "error",
      "no-nested-ternary": "off",
      "no-param-reassign": "error",
      "no-return-await": "error",
      "no-template-curly-in-string": "error",
      "no-unneeded-ternary": "error",
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
      "no-unused-vars": "off",
      "no-use-before-define": ["error", { functions: false, classes: true, variables: true }],
      "no-var": "error",
      "object-shorthand": ["error", "always"],
      "prefer-const": ["error", { destructuring: "all" }],
      "prefer-template": "error",
      semi: ["error", "never"],
      "best-practices/sort-imports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
      yoda: "error",
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
  {
    files: ["**/*.{cjs,cts}"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  },
]
