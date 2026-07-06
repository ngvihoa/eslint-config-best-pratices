# `eslint.config.cjs`

Config dùng để lint chính repo này. Đây không phải preset public riêng, mà là ví dụ dogfooding: repo tự dùng package config của nó.

## Công dụng

```js
const { node } = require("./index.cjs")

module.exports = node
```

Repo này là package Node/CommonJS, nên dùng preset `node` là phù hợp nhất.

## Vì Sao Dùng `node`

- Cho phép Node globals trong file config/package.
- Cho phép `console` nếu sau này có script CLI hoặc tooling.
- Kế thừa toàn bộ rule nền từ `base`.

## Khi Copy Sang Project Khác

Nếu dùng package này trong repo khác, thường bạn sẽ viết:

```js
const { node } = require("@ngvihoa/eslint-config-best-practices")

module.exports = node
```

Hoặc đổi `node` thành `base`, `typescript`, hoặc `react` tùy loại project.
