import express from "express"
import { createUser, getPagingUser } from "../controllers/user.js"

const router = express.Router()

router.post("/create-user", createUser)
router.get("/get-paging-user", getPagingUser)

export default router