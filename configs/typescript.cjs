const tseslint = require("typescript-eslint")

const base = require("./base.cjs")

module.exports = [
  ...base,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,mts,cts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": [
        "error",
        { functions: false, classes: true, variables: true, typedefs: true },
      ],
      semi: ["error", "never"],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ...tseslint.configs.disableTypeChecked,
  },
]
