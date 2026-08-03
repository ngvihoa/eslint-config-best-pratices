# `configs/base.cjs`

Preset nền cho JavaScript browser-oriented. File này nên là điểm bắt đầu cho hầu hết project JS vì nó gom các rule an toàn, ít tranh cãi, giúp code dễ đọc và tránh lỗi phổ biến.

## Công dụng

- Bỏ qua thư mục build/cache phổ biến như `.next`, `.nuxt`, `coverage`, `dist`, `build`, `node_modules`, `public`.
- Dùng `@eslint/js` recommended để bắt lỗi JavaScript cơ bản.
- Bật global browser và ES2024.
- Quản lý import bằng `eslint-plugin-import-x`.
- Tự phát hiện import và biến không dùng bằng `eslint-plugin-unused-imports`.
- Tự chuyển file `.cjs` và `.cts` sang CommonJS + Node globals.

## Rule từ `@eslint/js`

`js.configs.recommended` bật nhóm rule lỗi căn bản của ESLint, ví dụ biến chưa khai báo, code không thể chạy tới, duplicate case, unsafe optional chaining, regex sai, getter không return, constructor sai, và nhiều lỗi runtime rõ ràng khác. Đây là lớp bảo vệ nền trước khi áp thêm style hoặc best practice riêng.

## Import Rules

- `import-x/consistent-type-specifier-style`: yêu cầu type import ở top-level, giúp import type rõ ràng và dễ tree-shake hơn.
- `import-x/first`: import phải nằm trước các statement khác để file dễ scan.
- `import-x/newline-after-import`: yêu cầu một dòng trống sau nhóm import để tách dependency khỏi logic.
- `import-x/no-duplicates`: không cho import trùng từ cùng một module.
- `import-x/order`: tự sắp xếp các dòng import theo nhóm built-in, package bên ngoài, alias nội bộ (`@/`, `~/`), type, parent, sibling/index và side-effect; thêm dòng trống giữa nhóm và xếp alphabet trong từng nhóm. Side-effect import đặt sai vị trí sẽ bị báo lỗi nhưng không tự di chuyển để tránh thay đổi thứ tự thực thi.
- `sort-imports`: tự sắp xếp các named import trong `{}` theo alphabet, còn thứ tự các dòng import do `import-x/order` quản lý.

## Unused Rules

- `no-unused-vars`: tắt rule core để tránh conflict với `unused-imports`.
- `unused-imports/no-unused-imports`: báo lỗi import không dùng và có thể auto-fix.
- `unused-imports/no-unused-vars`: cảnh báo biến không dùng; cho phép biến/arg/catch error bắt đầu bằng `_` để thể hiện chủ ý bỏ qua.

## Code Quality Rules

- `array-callback-return`: callback trong `map`, `filter`, `reduce` phải return đúng kỳ vọng.
- `curly`: bắt buộc dùng `{}` cho block nhiều dòng, giảm lỗi khi thêm dòng mới.
- `eqeqeq`: dùng `===` và `!==`, nhưng cho phép `== null` để check cả `null` và `undefined`.
- `no-console`: cảnh báo `console`, ngoại trừ `console.warn` và `console.error`.
- `no-debugger`: không cho commit `debugger`.
- `no-else-return`: bỏ `else` sau `return` để code phẳng hơn.
- `no-empty`: không cho block rỗng, nhưng cho phép `catch` rỗng khi chủ ý bỏ qua lỗi.
- `no-implicit-coercion`: tránh ép kiểu ngầm như `!!foo`, `+foo`, `foo + ""` khi dễ gây khó đọc.
- `no-lonely-if`: gộp `else { if (...) }` thành `else if`.
- `no-nested-ternary`: cảnh báo ternary lồng nhau vì khó đọc.
- `no-param-reassign`: không gán lại parameter để tránh side effect bất ngờ.
- `no-return-await`: tránh `return await` không cần thiết.
- `no-template-curly-in-string`: bắt lỗi viết `${value}` trong string thường thay vì template literal.
- `no-unneeded-ternary`: tránh ternary thừa như `condition ? true : false`.
- `no-use-before-define`: không dùng class/variable trước khi khai báo; function declaration được phép.
- `no-var`: dùng `let`/`const` thay cho `var`.
- `object-shorthand`: dùng cú pháp object shorthand khi có thể.
- `prefer-const`: dùng `const` nếu biến không bị gán lại, kể cả destructuring.
- `prefer-template`: dùng template literal thay cho nối chuỗi khi phù hợp.
- `semi`: không dùng dấu `;` ở cuối statement; có thể tự sửa bằng `eslint --fix`.
- `yoda`: không dùng điều kiện kiểu `"red" === color`.

## CommonJS Override

Với `**/*.{cjs,cts}`, preset đặt `sourceType: "commonjs"` và bật Node globals như `require`, `module`, `__dirname`. Điều này giúp file config/tooling cũ không bị lint như ESM.
