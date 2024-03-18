import express from "express"
import { changePassword, createUser, editUser, getPagingUser, login, signUp } from "../controllers/user.js"

const router = express.Router()

router.post("/create-user", createUser)
router.get("/get-paging-user", getPagingUser)
router.post("/sign-up", signUp)
router.post("/login", login)
router.put("/:id", editUser)
router.put("/change-password/:id", changePassword)

export default router