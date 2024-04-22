import express from "express"
import { changePassword, createUser, deleteUser, editUser, getPagingUser, getUserById, login, signUp, uploadUserAvatar } from "../controllers/user.js"
import authentication from "../middlewares/authentication.js"
import upload from "../middlewares/upload.js"

const router = express.Router()

router.put("/upload-avatar", authentication, upload.single("avatar"), uploadUserAvatar)
router.post("/create-user", authentication, createUser)
router.get("/get-paging-user", authentication, getPagingUser)
router.get("/:id", authentication, getUserById)
router.post("/sign-up", signUp)
router.post("/login", login)
router.put("/:id", authentication, editUser)
router.put("/change-password/:id", authentication, changePassword)
router.delete("/:id", authentication, deleteUser)

export default router