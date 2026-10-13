# Student Deadline Tracker

**LTWNC — Bài thực hành 01 · RIPT1411-20261-01**

Ứng dụng quản lý deadline cá nhân, sử dụng React + TypeScript + Redux Toolkit.

## Chạy dự án

Cần Node.js 22.12+ hoặc Node.js 24 LTS. Trong thư mục `TH1`:

```bash
npm ci
npm run dev
```

Mở địa chỉ Vite in ra ở terminal, thường là `http://127.0.0.1:5173`.

Trên Windows PowerShell có thể dùng `npm.cmd`:

```powershell
cd D:\TH_Web_Nc\Slide\TH1
npm.cmd ci
npm.cmd run dev
```

Các lệnh khác: `npm run typecheck`, `npm run build`, `npm run preview`.

Giữ `node_modules` khi làm việc trên máy: thư mục này chứa React, các kiểu TypeScript và công cụ chạy/build. Nếu đã xoá, chạy lại `npm ci` (PowerShell: `npm.cmd ci`). Khi nén mã nguồn để nộp, loại `node_modules`, `dist` và các file `*.tsbuildinfo` khỏi ZIP; không cần xoá chúng khỏi dự án đang dùng.

Nếu VS Code vẫn báo không tìm thấy `react` hoặc `vite/client` sau khi cài thư viện, mở Command Palette (`Ctrl+Shift+P`) và chạy `TypeScript: Restart TS Server`.

## Chức năng

- Hiển thị môn học, tên bài tập, hạn nộp, ưu tiên và trạng thái hoàn thành.
- Thêm bài qua form có validation; mặc định ưu tiên trung bình.
- Sửa bài qua cùng form; có lưu/huỷ và giữ nguyên ID, thời điểm tạo, trạng thái hoàn thành.
- Đánh dấu hoàn thành/bỏ đánh dấu và xoá có xác nhận.
- Lọc: Tất cả, Chưa hoàn thành, Quá hạn, Đã hoàn thành.
- Tìm theo tên bài/môn học, hỗ trợ tiếng Việt không dấu, không phân biệt hoa thường.
- Kết hợp tìm kiếm với bộ lọc môn học, độ ưu tiên và trạng thái; có nút xoá toàn bộ bộ lọc.
- Nhãn và thông báo “Sắp đến hạn” cho bài chưa hoàn thành còn từ 0 đến 2 ngày.
- Hiển thị số ngày còn lại/quá hạn và thống kê cập nhật ngay.
- Gọi API giả lập khi khởi động, có loading, lỗi và nút thử lại.
- Lưu thay đổi trên trình duyệt để giữ dữ liệu khi tải lại trang.
- Chuyển giao diện sáng/tối bằng nút trên thanh đầu trang; nhớ lựa chọn trên trình duyệt.

**Quy ước ngày:** hạn nộp lưu dưới dạng `YYYY-MM-DD`. Hôm nay hiển thị “Còn 0 ngày”; chỉ qua ngày nộp mới là quá hạn. Bộ lọc Quá hạn chỉ gồm bài chưa hoàn thành. Chưa hoàn thành bao gồm cả bài quá hạn.

**Tìm kiếm và thống kê:** các từ trong ô tìm kiếm phải cùng xuất hiện trong tên bài hoặc môn học, không phụ thuộc thứ tự. Thống kê và số trên các tab luôn tính trên toàn bộ danh sách; dòng “Hiển thị X / Y bài tập” phản ánh các bộ lọc đang áp dụng. Nhãn sắp đến hạn tự cập nhật khi sang ngày mới, không áp dụng cho bài đã hoàn thành hoặc quá hạn.

**Giao diện:** lần đầu dùng màu sáng/tối theo hệ điều hành. Sau khi bạn đổi bằng nút, app ưu tiên lựa chọn đã lưu. Màu nền, chữ, viền và các trạng thái dùng CSS variables chung để giữ độ tương phản ở cả hai chế độ.

## Đối chiếu yêu cầu môn học

| Nội dung             | Cài đặt                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Generic              | `ApiResponse<T>`, `requestJson<T>`, `createStorage<T>`, `useForm<T>`                                                                        |
| Utility types        | `Omit` cho dữ liệu tạo mới; `Pick` cho form; `Partial<CreateAssignmentInput>` cho cập nhật; `Partial<Record<keyof T, string>>` cho lỗi form |
| Type guard           | Kiểm tra dữ liệu API/storage, ngày nộp, ưu tiên và giá trị bộ lọc                                                                           |
| Custom hook nâng cao | `useForm<T>` quản lý dữ liệu/validation/reset; `setField<K extends keyof T>` giữ kiểu của từng trường                                       |
| Compound Component   | `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Panel` dùng chung Context                                                                   |
| Redux Toolkit        | `configureStore`, `createSlice`, `PayloadAction`, `createAsyncThunk`                                                                        |
| Typed hooks          | `useAppDispatch`, `useAppSelector` theo `AppDispatch` và `RootState`                                                                        |
| Feature-based        | Logic bài tập nằm trong `features/assignments`                                                                                              |

## Cấu trúc mã nguồn

```text
src/
  app/                     # App, store, typed hooks và sidebar
  features/assignments/
    components/            # Board, Stats, Filters, Form, List, Card, DeleteDialog, DeadlineNotice
    hooks/useAssignments.ts
    types.ts               # mô hình dữ liệu và utility types
    assignmentsSlice.ts    # actions, reducers và async thunk
    assignmentsApi.ts      # gọi API mẫu
    assignmentStorage.ts   # lưu dữ liệu cá nhân
    deadline.ts            # tính ngày, lọc, sắp xếp và thống kê
    query.ts               # tìm kiếm tiếng Việt và lọc theo môn/ưu tiên
    guards.ts              # type guards
    validation.ts          # validation form
    constants.ts           # nhãn ưu tiên và cấu hình bộ lọc
  shared/                  # Tabs, Icon, ThemeToggle, generic hooks, HTTP/storage/date/theme helpers
  main.tsx                 # React root và Redux Provider
  styles.css               # CSS variables sáng/tối và giao diện responsive
public/api/assignments.json # API giả lập
```

## API và dữ liệu lưu trên máy

`GET /api/assignments.json` trả `{ data: Assignment[], message: string }`. File trong `public/api` được Vite phục vụ qua HTTP; không cần backend riêng. App kiểm tra HTTP status và cấu trúc JSON bằng type guard, xử lý ba trạng thái thunk trong `extraReducers`.

Lần đầu app dùng sáu bài mẫu. Các lần sau vẫn gọi API nhưng ưu tiên dữ liệu đã lưu để không mất bài mới hoặc khôi phục bài đã xoá. Nếu API lỗi, danh sách đã lưu vẫn hiển thị kèm thông báo lỗi. Các bài mẫu có hạn nộp trong tháng 10/2026; số ngày tính theo ngày hiện tại trên máy.

Để quay về dữ liệu mẫu, chạy trong Console của trình duyệt rồi tải lại:

```js
localStorage.removeItem('student-deadline-tracker.assignments.v1');
location.reload();
```

Reducer chỉ cập nhật draft Immer. Tạo id/thời gian đặt trong `prepare`; fetch nằm trong thunk; ghi localStorage nằm ở store subscriber. Trạng thái quá hạn được tính từ ngày nộp và hoàn thành, không lưu riêng để tránh lỗi thời.
