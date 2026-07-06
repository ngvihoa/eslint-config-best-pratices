# `index.cjs`

Entry point chính của package. File này gom và export tất cả preset để project khác có thể import từ package root.

## Công dụng

```js
const { base, next, node, react, typescript } = require("@ngvihoa/eslint-config-best-practices")
```

Thay vì bắt người dùng import từng đường dẫn như `@ngvihoa/eslint-config-best-practices/configs/base.cjs`, file này cung cấp API ngắn gọn và ổn định.

## Export

- `base`: preset JavaScript nền từ `configs/base.cjs`.
- `next`: preset Next.js từ `configs/next.cjs`.
- `node`: preset Node từ `configs/node.cjs`.
- `typescript`: preset TypeScript từ `configs/typescript.cjs`.
- `react`: preset React + TypeScript từ `configs/react.cjs`.

## Vì Sao Dùng CommonJS

Package dùng `type: "commonjs"` và file `.cjs` để config tương thích tốt với nhiều project hơn, kể cả project chưa chuyển sang ESM. ESLint flat config hỗ trợ tốt kiểu export này.
