import express from "express"
import User from "../models/user.js"

const router = express.Router()

router.post('/create-user', async (req, res) => {
    try {
        const result = await User.create({
            name: "Phuong",
            age: 10
        })

        return res.status(201).json({
            result
        })
    } catch (error) {
        return res.status(500).json(error)
    }
})

export default router