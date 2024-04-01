import express from "express"
import { createCategory, getPagingCategory } from "../controllers/category.js"
const router = express.Router()

router.get('/get-paging', getPagingCategory)
router.post('/', createCategory)

export default router