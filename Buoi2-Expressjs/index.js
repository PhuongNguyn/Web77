import express from "express"
import { posts } from "./data.js"

const app = express()

const PORT = 4000

// middleware
app.use(express.json())

// Trả ra tất cả các bài viết
app.get('/', (req, res) => {

})

app.post('/', (req, res) => {
    const body = req.body

    if (body.username == "A") {
        return res.status(200).json({
            message: "Đăng nhập thành công"
        })
    }

    if (!body.username) {
        return res.status(400).json({
            message: "Chưa nhập tên người dùng"
        })
    }

    if (body.username != "A") {
        return res.status(400).json({
            message: "Sai mật khẩu hoặc tên đăng nhập"
        })
    }
})

app.put("/:id", (req, res) => {
    console.log(req.params)
    return res.status(200).json({
        params: req.params
    })
})

app.patch("/", () => {

})

app.delete("/:id", (req, res) => {

})

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})