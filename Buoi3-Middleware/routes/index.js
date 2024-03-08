import express from "express"
import { middlewareGet, middlewarePost } from "../middlewares/index.js"
import { users } from "../data/index.js"

const route = express.Router()

route.get("/:id", (req, res) => {
    //get user theo id => Trả ra user cho phía client
})

route.get('/find-user-by-name', (req, res) => {
    //get user theo ten nguoi dung
})

route.get('/sort-user-by-age-asc', (req, res) => {
    //Tra ra 1 mang nguoi dung duoc sap xep tuoi theo thu tu tang dan
})

route.get('/sort-user-by-age-desc', (req, res) => {
    //Tra ra 1 mang nguoi dung duoc sap xep tuoi theo thu tu giam dan
})


route.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email) {
        return res.status(400).json({ message: "Email là bắt buộc" })
    }

    if (!password) {
        return res.status(400).json({ message: "Password là bắt buộc" })
    }

    const findUser = users.find(item => item.email == email)

    if (!findUser) {
        return res.status(400).json({ message: "Không tìm thấy người dùng" })
    }

    if (!(findUser.password == password)) {
        return res.status(400).json({ message: "Không đúng mật khẩu" })
    }

    return res.status(200).json({ message: "Đăng nhập thành công" })

})

route.get("/hello-world", middlewareGet, (req, res) => {
    return res.status(200).json({ message: "Hello World!" })
})

route.post("/hello-world-post", middlewarePost, (req, res) => {
    return res.status(200).json({ message: "Hello World Post!" })
})

export default route