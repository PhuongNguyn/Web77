import express from "express"
import { createProduct, getPagingProduct, getProductByCategory } from "../controllers/product.js"
import authentication from "../middlewares/authentication.js"

const router = express.Router()

router.post("/create-product", authentication, createProduct)
router.get("/get-paging-product", getPagingProduct)
router.get('/get-by-category/:slug', getProductByCategory)


export default router