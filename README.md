# Gửi bạn thân — Một bó hoa cho ngày 20/10

Trang quà tặng 20/10 dành cho bạn thân, xưng hô tớ–cậu, bằng Vite. Nền hiện dùng **video MP4 thật**, không chạy SVG/Three.js theo từng khung hình.

## File video và ảnh

- `public/media/good-morning.mp3`: nhạc nền từ file MP3 người dùng cung cấp; phát lặp ở âm lượng 10%.
- `public/media/floral-dream.mp4`: video nền Full HD 1920×1080, 24 fps, 12 giây, H.264, không âm thanh, lặp liền mạch.
- `public/media/floral-dream-mobile.mp4`: bản 1280×720 nhẹ hơn cho điện thoại.
- `public/media/floral-dream-poster.jpg`: ảnh nền dự phòng khi video chưa tải hoặc không phát được.
- `public/media/floating-peony.webp`: ảnh bông mẫu đơn riêng lẻ do người dùng cung cấp, tối ưu thành WebP trong suốt cho màn 2.
- `public/media/pastel-bouquet.webp`: bó hoa từ ảnh “Pastel Peony and Rose Bouquet.png” do người dùng cung cấp; chuyển sang WebP để giảm dung lượng, giữ nền trong suốt.

Thẻ `<video>` được khai báo trực tiếp trong `index.html`, có `autoplay muted loop playsinline`. CSS dùng `object-fit: cover`. JavaScript dừng video khi tab ẩn hoặc thiết bị bật chế độ giảm chuyển động. Trình duyệt tự chọn bản mobile qua thuộc tính `media` của `<source>`.

Để tái sử dụng video ở web khác:

```html
<video autoplay muted loop playsinline poster="/media/floral-dream-poster.jpg"
  style="position:fixed;inset:0;width:100%;height:100%;object-fit:cover">
  <source src="/media/floral-dream.mp4" type="video/mp4">
</video>
```

Nền là một video cinemagraph: ảnh vườn hoa được tạo bằng công cụ imagegen tích hợp, sau đó render offline thành MP4 với camera pan/zoom theo chu kỳ, ánh sáng và cánh hoa trôi. Các bông hoa trong ảnh không mô phỏng vật lý. Website chỉ phát file video và hiển thị ảnh WebP, không còn phụ thuộc Three.js.

Prompt tạo ảnh nền: “Cinematic wide 16:9 pastel blush pink peony and garden rose landscape, delicate cream cosmos, sage foliage, flowers framing bottom foreground and side edges, open pale pink misty sky in the upper and middle left for website text, warm ivory sunlight from upper right, shallow depth of field, luxurious soft 3D cinematic render, organic silky petals, no people, animals, text, logos or watermarks.”

## Chạy

Node.js 20.19+ hoặc 22.12+.

```sh
npm install
npm run dev
```

Chạm bó hoa hoặc nút nhận quà để mở khu vườn với các bông mẫu đơn riêng lẻ bay ra rồi trôi nhẹ trên màn hình. Nút thêm hoa tạo thêm 4 bông bay từ vị trí bấm; không nhân bản bó hoa. Giới hạn 10 bông trên điện thoại và 16 bông trên máy tính, dừng chuyển động khi tab ẩn và tôn trọng chế độ giảm chuyển động. Có nút thêm hoa, quay lại bó hoa và bật/tắt nhạc nền. Nhạc thử tự phát khi mở trang ở âm lượng 10%; nếu trình duyệt chặn tự phát có tiếng, nhạc bắt đầu sau lần chạm hoặc bấm đầu tiên. Nhạc tạm dừng khi tab ẩn, phát tiếp khi quay lại và tôn trọng việc người dùng đã tắt nhạc.

```sh
npm run build
npm run preview
```

Bản build nằm trong `dist/`, bao gồm video và ảnh.

## Phiên bản gia đình

- `https://20th10.io.vn/`: nội dung dành cho bạn thân.
- `https://giadinh.20th10.io.vn/`: nội dung riêng gửi gia đình.
- Xem trước bản gia đình trên máy: `http://localhost:5173/giadinh.html`.

Hai bản dùng chung ảnh, video, nhạc và hiệu ứng. `vite.config.js` build cả `index.html` và `giadinh.html`; `vercel.json` chuyển yêu cầu `/` trên đúng hostname `giadinh.20th10.io.vn` sang HTML gia đình, giữ nguyên địa chỉ trên trình duyệt. Trang gia đình có tiêu đề và mô tả riêng ngay trong HTML.

Để kích hoạt subdomain, thêm `giadinh.20th10.io.vn` vào mục Domains của cùng project Vercel, chọn Production và không chuyển hướng sang domain chính. Tại TenTen, thêm bản ghi DNS với tên `giadinh`, loại và giá trị đúng như Vercel hiển thị cho subdomain. Sau khi DNS cập nhật, Vercel cấp chứng chỉ HTTPS tự động.
