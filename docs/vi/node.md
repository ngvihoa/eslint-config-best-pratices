# `configs/node.cjs`

Preset cho project chạy trong Node.js. File này mở rộng `base` và điều chỉnh môi trường để phù hợp backend, CLI, script, tooling, hoặc package Node.

## Công dụng

- Kế thừa toàn bộ rule từ `configs/base.cjs`.
- Áp dụng cho `**/*.{js,mjs,cjs,ts,mts,cts}`.
- Bật Node globals như `process`, `Buffer`, `__dirname`, `require`.
- Bật ES2024 globals.
- Tắt cảnh báo `console` vì log là nhu cầu bình thường trong server, CLI, và script.

## Rule Override

- `no-console: "off"`: cho phép dùng `console` tự do trong Node. Trong browser app, `console` thường là dấu vết debug; trong Node, nó có thể là output chính của CLI hoặc logging tối thiểu.

## Khi Nào Dùng

Dùng preset này cho:

- REST/GraphQL backend.
- CLI tool.
- Build script.
- Node package.
- Repo config/tooling không chạy trong browser.
