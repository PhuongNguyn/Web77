import express from "express"
import productRouter from "./product.js"
import userRouter from "./user.js"

const router = express.Router()

router.use("/product", productRouter)
router.use("/user", userRouter)

export default router