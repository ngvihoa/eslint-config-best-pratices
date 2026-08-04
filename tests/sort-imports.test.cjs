const parser = require("@typescript-eslint/parser")
const { RuleTester } = require("eslint")

const rule = require("../rules/sort-imports.cjs")

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: "latest",
    parser,
    sourceType: "module",
  },
})

ruleTester.run("sort-imports", rule, {
  valid: [
    `import type { Metadata } from "next"

import { z } from "zod"

import { Button } from "@/components"

import "./globals.css"`,
  ],
  invalid: [
    {
      code: `import "./globals.css"
import { Button } from "@/components"
import { z } from "zod"
import type { Metadata } from "next"`,
      output: `import type { Metadata } from "next"

import { z } from "zod"

import { Button } from "@/components"

import "./globals.css"`,
      errors: [{ messageId: "sortImports" }],
    },
    {
      code: `import {
  A,
  LongComponentName,
  MediumName,
} from "./components"
import type { Props } from "./types"`,
      output: `import type { Props } from "./types"

import {
  LongComponentName,
  MediumName,
  A,
} from "./components"`,
      errors: [{ messageId: "sortImports" }],
    },
  ],
})
