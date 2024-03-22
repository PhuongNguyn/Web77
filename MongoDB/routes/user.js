import express from "express"
import { changePassword, createUser, deleteUser, editUser, getPagingUser, login, signUp } from "../controllers/user.js"
import authentication from "../middlewares/authentication.js"

const router = express.Router()

router.post("/create-user", createUser)
router.get("/get-paging-user", authentication, getPagingUser)
router.post("/sign-up", signUp)
router.post("/login", login)
router.put("/:id", authentication, editUser)
router.put("/change-password/:id", authentication, changePassword)
router.delete("/:id", authentication, deleteUser)

export default router