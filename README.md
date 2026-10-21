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

Chạm bó hoa hoặc nút nhận quà để mở khu vườn với các bông mẫu đơn riêng lẻ bay ra rồi trôi nhẹ trên màn hình. Nút thêm hoa tạo thêm 4 bông bay từ vị trí bấm kèm cánh hoa và ánh sao bung nhẹ; không nhân bản bó hoa. Hoa bay ra trong khoảng 0,85–1,2 giây và trôi theo chu kỳ 9–14 giây. Hiệu ứng bung được tự dọn sau khi kết thúc. Giới hạn 10 bông trên điện thoại và 16 bông trên máy tính, dừng chuyển động khi tab ẩn và tôn trọng chế độ giảm chuyển động. Có nút thêm hoa, quay lại bó hoa và bật/tắt nhạc nền. Nhạc thử tự phát khi mở trang ở âm lượng 10%; nếu trình duyệt chặn tự phát có tiếng, nhạc bắt đầu sau lần chạm hoặc bấm đầu tiên. Nhạc tạm dừng khi tab ẩn, phát tiếp khi quay lại và tôn trọng việc người dùng đã tắt nhạc.

```sh
npm run build
npm run preview
```

Bản build nằm trong `dist/`, bao gồm video và ảnh.

## Phiên bản gia đình

- `https://20th10.io.vn/`: nội dung dành cho bạn thân.
- `https://giadinh.20th10.io.vn/`: nội dung riêng gửi gia đình.
- Xem trước bản gia đình trên máy: `http://localhost:5173/giadinh.html`.

Hai bản dùng chung ảnh, video, nhạc và hiệu ứng. `vite.config.js` build cả `index.html` và `giadinh.html`; `vercel.json` dùng route theo hostname trước bước kiểm tra file tĩnh để chuyển `/` và `/index.html` trên đúng hostname `giadinh.20th10.io.vn` sang HTML gia đình, giữ nguyên địa chỉ trên trình duyệt. Trang gia đình có tiêu đề và mô tả riêng ngay trong HTML.

Để kích hoạt subdomain, thêm `giadinh.20th10.io.vn` vào mục Domains của cùng project Vercel, chọn Production và không chuyển hướng sang domain chính. Tại TenTen, thêm bản ghi DNS với tên `giadinh`, loại và giá trị đúng như Vercel hiển thị cho subdomain. Sau khi DNS cập nhật, Vercel cấp chứng chỉ HTTPS tự động.


## Xem trước khi chia sẻ Zalo

Mỗi bản có `title`, `description`, Open Graph (`og:title`, `og:description`, `og:url`, `og:image`), Twitter Card và canonical riêng trong HTML gốc. Bot chia sẻ không cần chạy JavaScript để nhận được thông tin gia đình. Bản gia đình phải được chọn trước bước `filesystem` trên Vercel, vì `/` có sẵn `index.html` của bản bạn thân.

Kiểm tra bằng cách đọc HTML từ `https://giadinh.20th10.io.vn/`, không chỉ nhìn tiêu đề sau khi trang chạy JavaScript. Sau khi sửa, các thẻ xem trước trong tin nhắn cũ có thể vẫn lưu bản cũ; có thể thử gửi một URL mới như `https://giadinh.20th10.io.vn/?v=giadinh-2`.

## Trang Nhà giáo Việt Nam — `/2011`

Trang riêng tại `https://20th10.io.vn/2011` (xem local ở `/2011/`). Nội dung HTML, CSS và JavaScript riêng trong `2011/index.html`, `src/teachers.css`, `src/teachers.js`. Vite build thêm entry này; Vercel route `/2011` và `/2011/` sang `/2011/index.html` trước bước filesystem, trên cả domain chính và subdomain. Các trang 20/10 giữ nguyên.

Phong cách bảng xanh, kem và vàng nắng. Bấm bó hoa hoặc nút gửi hoa để mở màn 2 với sáu bông cúc riêng lẻ lần lượt rơi từ phía trên xuống hết màn hình, mỗi bông bắt đầu cách nhau 1,8 giây và rơi trong 15 giây trước khi lặp lại. Hoa không hiển thị nhãn chữ bên dưới. Chạm từng bông để mở một bức thư khác nhau: lòng biết ơn, niềm tin, bài học, sức khỏe, nhiệt huyết và bình an. Có nút đọc thư tiếp, đóng thư, cho hoa rơi lại và trở về bó hoa. Hoa dừng khi rê chuột, nhận focus hoặc khi đang mở thư; hộp thư hỗ trợ Escape, giữ focus bên trong và trả focus về hoa khi đóng. Bó hoa màn đầu dịch trái 54px trên desktop, 12px ở màn nhỏ. Hiệu ứng giới hạn 10 cánh trên mobile, 16 trên desktop; tắt chuyển động và video khi chọn giảm chuyển động, tạm dừng khi tab ẩn. Nhạc dùng lại MP3 được cung cấp, âm lượng 10%, thử tự phát và phát sau tương tác nếu trình duyệt chặn.

Tài nguyên mới lưu trong `public/media/teachers/`:

- `teachers-bouquet.webp`: bó hoa cúc trắng, hồng kem và cosmos vàng, nơ xanh; WebP trong suốt 1000×1500.
- `teachers-single-flower.webp`: bông cúc trắng riêng lẻ tạo mới bằng imagegen tích hợp, WebP trong suốt 380×570, dùng cho các bông hoa mang thư ở màn 2.
- `classroom-poster.jpg`: ảnh lớp học 1920×1080 làm nền dự phòng.
- `classroom.mp4`: video nền H.264 Full HD, 24 fps, 12 giây, không âm thanh, lặp.
- `classroom-mobile.mp4`: bản video 1280×720 cho điện thoại.
- `teachers-share.jpg`: ảnh chia sẻ 1200×630 dành riêng cho 20/11.
- `favicon.svg`: biểu tượng quyển sách.

Hai ảnh được tạo mới bằng **imagegen tích hợp (built-in)**. Video là **cinemagraph render offline từ ảnh lớp học mới**, có camera pan/zoom theo chu kỳ, ánh nắng, bụi sáng và cánh hoa; không phải cảnh quay lớp học hay video AI có nhân vật chuyển động. Canvas chỉ dùng trong bước render offline, không chạy trên website. Mã trang chỉ phát MP4, hiển thị WebP và dùng CSS/Web Animations cho hiệu ứng nhỏ.

Prompt ảnh lớp học:

> Create a premium cinematic background image for a Vietnamese Teachers' Day November 20 tribute website. Wide 16:9 landscape composition. A serene Vietnamese classroom, warm natural morning sunlight through tall windows on the right, muted deep sage green chalkboard across rear wall, softly lit honey oak school desks, a small vase of cream chrysanthemums and pale yellow cosmos, closed books, a fountain pen. Fine golden dust in light shafts, soft autumn atmosphere, elegant photographic realism, editorial film still, beautiful subtle depth. Warm ivory, sage green, honey gold palette, no pink. Keep the left half visually quiet and uncluttered with gentle darker green midtones suitable for a light text overlay, place detailed desk and flowers toward the right. No people, no readable text, no writing, no lettering, no logos, no watermark. Landscape 1536x1024 or wider, highest quality.

Prompt bó hoa (yêu cầu nền trong suốt):

> Create one exquisite complete florist bouquet as a premium isolated product photograph on transparent background, upright full bouquet including stems and wrapping entirely visible with generous transparent margin. Vietnamese Teachers' Day 20 November gift: white chrysanthemums, ivory garden roses, delicate pale yellow cosmos and small white daisies, a few airy sage eucalyptus sprigs, subtle fresh green foliage. Beautiful naturally asymmetrical abundant floral arrangement, wrapped in elegant cream paper with a dark forest green silk ribbon tied in a refined bow, a tiny blank ivory gift card with no writing. Soft warm studio light, highly realistic detailed petals, editorial luxury florist photography, restrained ivory sage honey gold color palette, absolutely no pink flowers. Front three-quarter view, centered, portrait composition, no vase, no floor, no shadow backdrop, no text, no watermark.

Ảnh chia sẻ được dựng từ bố cục thật của trang để đúng nội dung, không cần bot Zalo chạy JavaScript. HTML gốc có canonical, Open Graph và Twitter Card riêng cho 20/11.

Prompt tạo bông hoa mang thư (imagegen tích hợp, nền trong suốt):

> Use case: product-mockup. Asset: one isolated flower cutout for an elegant Vietnamese Teachers’ Day website. A single beautiful large ivory white chrysanthemum bloom seen front three-quarter view, fluffy abundant naturally layered realistic petals with a soft pale yellow center, one short graceful green stem and two small sage leaves, the entire flower and stem fully visible centered with generous clear margin. Delicate warm studio lighting, premium macro florist photography, warm ivory sage honey yellow palette. Truly transparent background, no wrapping, no bouquet, no vase, no card, no text, no border, no watermark, no other flowers. Portrait composition, suitable for floating interactive flowers on screen.
