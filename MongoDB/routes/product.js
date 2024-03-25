import express from "express"
import { createProduct, getPagingProduct } from "../controllers/product.js"
import authentication from "../middlewares/authentication.js"

const router = express.Router()

router.post("/create-product", authentication, createProduct)
router.get("/get-paging-product", getPagingProduct)

export default router