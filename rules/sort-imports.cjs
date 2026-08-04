const { builtinModules } = require("node:module")

const builtinModuleNames = new Set(
  builtinModules.map((name) => name.replace(/^node:/, "")),
)

function getOrderGroup(node) {
  if (node.importKind === "type") return 0

  const source = node.source.value
  if (source.startsWith("node:") || builtinModuleNames.has(source)) return 1
  if (source.startsWith("@/") || source.startsWith("~/")) return 3
  if (source.startsWith("../")) return 4
  if (source.startsWith("./")) return source === "." || source === "./" ? 6 : 5
  return 2
}

function getImportKind(node, text) {
  if (node.importKind === "type") return 0

  const hasNamedImports = node.specifiers.some(
    (specifier) => specifier.type === "ImportSpecifier",
  )
  if (!hasNamedImports) return 3

  return text.includes("\n") ? 2 : 1
}

function getSpecifierLength(node, sourceCode) {
  return node.specifiers.reduce(
    (length, specifier) => length + sourceCode.getText(specifier).length,
    0,
  )
}

function sortMultilineSpecifiers(text) {
  const lines = text.split("\n")
  if (
    lines.length < 3 ||
    lines.slice(1, -1).some((line) => line.includes("//"))
  ) {
    return text
  }

  return [
    lines[0],
    ...lines
      .slice(1, -1)
      .sort((left, right) => right.trim().length - left.trim().length),
    lines.at(-1),
  ].join("\n")
}

module.exports = {
  meta: {
    type: "layout",
    docs: {
      description: "Sort imports using the best-practices convention",
    },
    fixable: "code",
    schema: [],
    messages: {
      sortImports: "Imports should be sorted differently",
    },
  },

  create(context) {
    const sourceCode = context.sourceCode

    return {
      "Program:exit"(program) {
        const imports = program.body.filter(
          (node) => node.type === "ImportDeclaration",
        )
        if (imports.length < 2) return

        const first = imports[0]
        const last = imports.at(-1)
        const firstIndex = program.body.indexOf(first)
        const lastIndex = program.body.indexOf(last)
        if (
          program.body
            .slice(firstIndex, lastIndex + 1)
            .some((node) => node.type !== "ImportDeclaration")
        ) {
          return
        }
        const comments = sourceCode
          .getAllComments()
          .filter(
            (comment) =>
              comment.range[0] > first.range[0] &&
              comment.range[1] < last.range[1],
          )
        if (comments.length > 0) return

        const entries = imports.map((node, index) => {
          const text = sourceCode.getText(node)
          return {
            index,
            kind: getImportKind(node, text),
            node,
            orderGroup: getOrderGroup(node),
            specifierLength: getSpecifierLength(node, sourceCode),
            text:
              getImportKind(node, text) === 2
                ? sortMultilineSpecifiers(text)
                : text,
          }
        })

        entries.sort((left, right) => {
          if (left.orderGroup !== right.orderGroup) {
            return left.orderGroup - right.orderGroup
          }
          if (left.kind !== right.kind) {
            return left.kind - right.kind
          }
          return (
            right.specifierLength - left.specifierLength ||
            left.index - right.index
          )
        })

        const sorted = entries
          .flatMap((entry, index) => {
            const next = entries[index + 1]
            if (!next) return entry.text
            if (entry.orderGroup !== next.orderGroup) {
              return [entry.text, ""]
            }
            return entry.text
          })
          .join("\n")
        const current = sourceCode.text.slice(first.range[0], last.range[1])

        if (sorted === current) return

        context.report({
          node: first,
          messageId: "sortImports",
          fix(fixer) {
            return fixer.replaceTextRange(
              [first.range[0], last.range[1]],
              sorted,
            )
          },
        })
      },
    }
  },
}
