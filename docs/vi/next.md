# `configs/next.cjs`

Preset cho Next.js. File này mở rộng `react` và thêm rule chính thức từ `@next/eslint-plugin-next`, gồm cả nhóm Core Web Vitals.

## Công dụng

- Kế thừa toàn bộ rule từ `configs/react.cjs`.
- Áp dụng cho `**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}`.
- Bật plugin `@next/next`.
- Bật `@next/next` recommended rules.
- Bật `@next/next` Core Web Vitals rules.

## Khi Nào Dùng

Dùng preset này cho project Next.js, đặc biệt là:

- Next.js App Router.
- Next.js Pages Router.
- Next.js + TypeScript.
- Next.js full-stack app có route handlers, server components, client components.

## Next Recommended Rules

`nextPlugin.configs.recommended.rules` bật nhóm rule chính thức của Next.js để bắt các pattern dễ sai trong Next app, ví dụ dùng API Next sai cách, dùng link/image/script chưa tối ưu, hoặc cấu trúc page không đúng kỳ vọng framework.

## Core Web Vitals Rules

`nextPlugin.configs["core-web-vitals"].rules` thêm các rule nghiêm hơn liên quan đến performance và user experience. Nhóm này phù hợp cho app production vì nó ưu tiên các vấn đề ảnh hưởng trực tiếp tới chất lượng trang.

## Cách Dùng

```js
const { next } = require("@ngvihoa/eslint-config-best-practices")

module.exports = next
```

## Quan Hệ Với Preset Khác

```txt
base
└─ typescript
   └─ react
      └─ next
```

Nếu project là Next.js, thường chỉ cần dùng `next`. Không cần tự thêm `base`, `typescript`, hoặc `react` nữa vì `next` đã kế thừa các preset đó.
