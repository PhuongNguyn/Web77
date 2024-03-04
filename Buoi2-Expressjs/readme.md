## Dependencies vs Devdependencies

- Devdependencies (npm install nodemon --save-dev) => su dung trong moi truong dev
- Dependencies => su dung ca trong moi truong production 


## Restful API 

- Get: Lấy dữ liệu trả lên cho phía client 
- Post: Tạo mới.
- Put: Chỉnh sửa dữ liệu (Chỉnh sửa toàn bộ)
- Patch: Chỉnh sửa dữ liệu (Chỉnh sửa 1 phần)
- Delete: Xoá record (Xoá dữ liệu)

## HTTP Status Code

- Giúp nhận diện được trạng thái của request (Thành công, thất bại, chuyển hướng,...)
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status


## Body, query, params 

- Body: Chi dung cho 3 phuong thuc put, patch, post
- Query: Truyen o tren url bang cach url?search=abc&username=1234
- Params: Truyen o tren url bang cach url/id nhung o phia server se khai bao theo dang url/:id (vi du url/123 => id = 123)

## Bai tap

- 1: Dùng phương thức get, trả ra các bài viết, và có chức năng truyền title bài viết thông qua request query, trả ra các bài viết có title giống với title được truyền vào query, nếu mà không truyền thì trả ra tất cả bài viết

- 2: Dùng phương thức delete => lấy ra tất cả bài viết trừ bài viết được truyền vào params thông qua phương thức delete