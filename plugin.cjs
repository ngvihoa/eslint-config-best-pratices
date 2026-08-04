const sortImports = require("./rules/sort-imports.cjs")

module.exports = {
  meta: {
    name: "@ngvihoa/eslint-config-best-practices",
  },
  rules: {
    "sort-imports": sortImports,
  },
}
