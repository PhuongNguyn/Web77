import express from "express"
import productRouter from "./product.js"
import userRouter from "./user.js"
import categoryRouter from "./category.js"

const router = express.Router()

router.use("/product", productRouter)
router.use("/user", userRouter)
router.use("/category", categoryRouter)

export default router