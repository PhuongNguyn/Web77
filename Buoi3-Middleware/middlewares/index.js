// local middleware
const middlewarePost = (req, res, next) => {
    if (req.query?.username == "admin2") {
        next()
    } else {
        return res.status(403).json({ message: "Khong co quyen truy cap" })
    }
}

const middlewareGet = (req, res, next) => {
    if (req.query?.username == "admin1") {
        next()
    } else {
        return res.status(403).json({ message: "Khong co quyen truy cap" })
    }
}

export {
    middlewarePost,
    middlewareGet
}