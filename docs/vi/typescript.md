# `configs/typescript.cjs`

Preset cho TypeScript. File này mở rộng `base`, dùng `typescript-eslint` với type-aware linting, và thêm các rule giúp code TS rõ kiểu, an toàn với Promise, và ít nợ kỹ thuật hơn.

## Công dụng

- Kế thừa toàn bộ rule từ `configs/base.cjs`.
- Bật `typescript-eslint.configs.recommendedTypeChecked`.
- Áp dụng type-aware parser cho `**/*.{ts,mts,cts,tsx}`.
- Dùng `projectService: true`, nên project sử dụng preset này cần có `tsconfig.json`.
- Tắt type-aware rules cho file JS thường để tránh lint JS cần TypeScript project context.

## TypeScript Recommended Type-Checked

`recommendedTypeChecked` bật các rule TypeScript dựa trên type information, ví dụ tránh Promise bị bỏ quên, tránh unsafe assignment/call/member access, kiểm tra enum/template expression, và nhiều lỗi mà parser JS thường không đủ dữ liệu để bắt. Đây là phần khác biệt quan trọng giữa lint TS đơn giản và lint TS có hiểu type.

## Parser Options

- `projectService: true`: để `typescript-eslint` tự tìm TypeScript project tương ứng, tiện hơn việc hardcode `parserOptions.project`.
- `tsconfigRootDir: process.cwd()`: lấy thư mục chạy ESLint làm gốc tìm `tsconfig`.

## Type Style Rules

- `@typescript-eslint/consistent-type-definitions`: dùng `type` thay vì `interface` để thống nhất kiểu object shape. Nếu team thích declaration merging hoặc public API interface, có thể đổi rule này.
- `@typescript-eslint/consistent-type-imports`: yêu cầu import type bằng `type`, giúp tách runtime import khỏi type import và tránh bundle nhầm.

## Promise And Async Rules

- `@typescript-eslint/no-floating-promises`: bắt Promise không được `await`, `return`, hoặc xử lý lỗi.
- `@typescript-eslint/no-misused-promises`: tránh truyền Promise vào vị trí kỳ vọng boolean/callback sync.
- `@typescript-eslint/require-await`: async function phải có `await`, tránh API async giả.
- `@typescript-eslint/return-await`: yêu cầu `return await` trong `try/catch` để catch bắt được lỗi async đúng chỗ.

## Safety Rules

- `@typescript-eslint/no-explicit-any`: cảnh báo khi dùng `any`; vẫn để mức `warn` để không chặn migration hoặc interop khó.
- `no-use-before-define`: tắt core rule vì không hiểu TypeScript syntax đầy đủ.
- `@typescript-eslint/no-use-before-define`: dùng bản TypeScript-aware; không cho class, variable, type dùng trước khai báo, nhưng cho phép function declaration.
- `semi`: không dùng dấu `;` ở cuối statement trong file TypeScript/TSX; có thể tự sửa bằng `eslint --fix` hoặc fix-on-save.

## Unused Variables

- `@typescript-eslint/no-unused-vars`: tắt để tránh conflict với `unused-imports/no-unused-vars` từ `base`.

## JavaScript Override

Với `**/*.{js,mjs,cjs,jsx}`, preset dùng `tseslint.configs.disableTypeChecked` để file JS không bị các rule cần type information làm phiền.
