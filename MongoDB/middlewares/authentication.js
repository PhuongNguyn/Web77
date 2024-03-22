import jwt from "jsonwebtoken"

const authentication = (req, res, next) => {
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

        next()
    } catch (error) {
        return res.status(401).json({ message: "Ban chua dang nhap" })
    }
}

export default authentication