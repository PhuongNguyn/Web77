import jwt from "jsonwebtoken"
import user from "../models/user.js"

const authentication = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization

        if (!bearerToken) {
            return res.status(401).json({ message: "Ban chua dang nhap" })
        }

        const token = bearerToken.split(" ")[1]
        const verify = jwt.verify(token, process.env.SCRET_KEY)

        if (!verify) {
            return res.status(401).json({ message: "Ban chua dang nhap" })
        }

        const userId = verify.id

        const findUser = await user.findById(userId)

        if (!findUser) {
            return res.status(404).json({ message: "User không tồn tại" })
        }

        req.user = findUser

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Ban chua dang nhap" })
    }
}

export default authentication