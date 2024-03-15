

## Mongodb (NoSQL)

- Quản lí theo dạng collections
- Trong collections gồm có nhiều document 
- Trong document là dữ liệu có dạng key - value


## MongoDB Schema 

- Dùng để quy định và định hình các collections trong mongodb => ví dụ collections user sẽ gồm có username (string), age(number),...


## Pagination (Phân Trang)

- Không phân trang ở phía frontend, vì sẽ rất nặng khi get tất cả sản phẩm lên 1 lúc
- Thay vào đó sẽ phân trang ở phía backend (Mỗi khi người dùng chuyển trang sẽ gọi về phía backend để get sản phẩm lên)
- Để phân trang chúng ta cần truyền về => thứ 1 là số lượng phần tử hiển thị (pageSize) trên 1 trang => thứ 2 là số trang hiện tại (pageIndex) của người dùng
- sau khi nhận được số trang (pageIndex) và số phần tử trên 1 trang (pageSize) mà người dùng truyền về, chúng ta dùng hàm find().skip(pageSize * pageIndex - pageSize).limit(pageSize).
- Tính total page bằng cách lấy tất cả số lượng phần tử thông qua hàm countDocuments() => sau đó chia cho pageSize và lấy giá trị trần bằng hàm Math.ceil(countDocument / pageSize)


## Bài tập 

- Tạo model => product gồm có product_name (string), product_price (Number) => Thêm router và hàm tạo mới product

-https://mongoosejs.com/docs/guide.html
-https://mongoosejs.com/docs/queries.html (Quries)

- Tạo hàm phân trang cho phần product