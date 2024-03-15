import User from "../models/user.js"

export const createUser = async (req, res) => {
    try {
        const data = req.body
        const result = await User.create(data)

        return res.status(201).json({
            result
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getPagingUser = async (req, res) => {
    try {
        const query = req.query
        const users = await User.find().skip(query.pageSize * query.pageIndex - query.pageSize).limit(query.pageSize)
        const countUsers = await User.countDocuments()
        const totalPage = Math.ceil(countUsers / query.pageSize) // Lấy giá trị trần   
        return res.status(200).json({ users, totalPage })
    } catch (error) {
        return res.status(500).json(error)
    }
}