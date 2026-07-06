const globals = require("globals")
const base = require("./base.cjs")

module.exports = [
  ...base,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
]
