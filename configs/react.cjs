const jsxA11y = require("eslint-plugin-jsx-a11y")
const react = require("eslint-plugin-react")
const reactHooks = require("eslint-plugin-react-hooks")
const globals = require("globals")

const typescript = require("./typescript.cjs")

module.exports = [
  ...typescript,
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      "jsx-a11y": jsxA11y,
      react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "react/boolean-prop-naming": "warn",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-no-useless-fragment": "warn",
      "react/no-array-index-key": "warn",
      "react/prop-types": "off",
    },
  },
]
