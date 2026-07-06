# `configs/react.cjs`

Preset cho React + TypeScript. File này mở rộng `typescript`, bật JSX, React, React Hooks, và accessibility rules.

## Công dụng

- Kế thừa toàn bộ rule từ `configs/typescript.cjs`.
- Áp dụng cho `**/*.{jsx,tsx}`.
- Bật browser globals cho component chạy trong trình duyệt.
- Bật `ecmaFeatures.jsx`.
- Tự detect version React bằng `settings.react.version: "detect"`.
- Dùng `eslint-plugin-react`, `eslint-plugin-react-hooks`, và `eslint-plugin-jsx-a11y`.

## React Recommended Rules

`react.configs.recommended.rules` bật các rule phổ biến để tránh lỗi component, props, JSX, lifecycle cũ, key, children, và các pattern React dễ sai. Đây là lớp rule nền từ hệ sinh thái React.

## JSX Runtime Rules

`react.configs["jsx-runtime"].rules` điều chỉnh lint cho React JSX transform mới, nơi bạn không cần `import React from "react"` chỉ để dùng JSX.

## React Hooks Rules

`reactHooks.configs.recommended.rules` bật các rule quan trọng nhất cho Hooks:

- Đảm bảo Hook chỉ được gọi ở top-level của component hoặc custom hook.
- Kiểm tra dependency array của `useEffect`, `useMemo`, `useCallback`, và các hook tương tự.

## Accessibility Rules

- `jsx-a11y/alt-text`: image-like element phải có text thay thế phù hợp.
- `jsx-a11y/anchor-is-valid`: cảnh báo anchor thiếu `href` hợp lệ hoặc dùng sai vai trò.
- `jsx-a11y/click-events-have-key-events`: element clickable cần có keyboard interaction.
- `jsx-a11y/no-autofocus`: cảnh báo `autoFocus` vì có thể gây trải nghiệm kém cho keyboard/screen reader users.

## React Style Rules

- `react/boolean-prop-naming`: cảnh báo tên boolean prop không rõ nghĩa.
- `react/jsx-boolean-value`: viết `<Button disabled />` thay vì `<Button disabled={true} />`.
- `react/jsx-fragments`: dùng fragment shorthand `<>...</>` khi có thể.
- `react/jsx-no-useless-fragment`: cảnh báo fragment không cần thiết.
- `react/no-array-index-key`: cảnh báo dùng array index làm key vì dễ gây bug khi reorder.
- `react/prop-types`: tắt vì TypeScript đã kiểm tra props.
