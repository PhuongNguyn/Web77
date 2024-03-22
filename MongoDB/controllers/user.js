import User from "../models/user.js"
import bcrypt from "bcryptjs"
import joi from "joi"
import jwt from "jsonwebtoken"

const tokenSecret = "jwtweb77"

export const login = async (req, res) => {
    console.log(process.env)
    const { compareSync } = bcrypt
    try {
        const email = req.body.email
        const password = req.body.password

        const loginSchema = joi.object({
            email: joi.string().email().min(3).max(32).required().messages({ "string.email": "Email không đúng định dạng", "string.min": "Tối thiểu là 3 ký tự", "string.max": "Tối đa 32 ký tự" }),
            password: joi.string().min(6).max(32).required()
        })

        const validate = loginSchema.validate({ email, password })

        if (validate.error) {
            return res.status(400).json({
                error: validate.error.details[0].message
            })
        }

        // lean để khi destructuring ở dùng 36 không bị lỗi
        const findUser = await User.findOne({ email }).lean()

        if (!findUser) {
            return res.status(400).json({
                error: "Không tìm người dùng"
            })
        }

        const checkPassword = compareSync(password, findUser.password)
        const accessToken = jwt.sign({ id: findUser._id, }, process.env.SCRET_KEY, { expiresIn: '1d' })

        // Tách findUser thành 2 phần => phần thứ 1 password , phần thứ 2 là phần còn lại của findUser gán vào biến returnUser
        const {
            password: userPassword,
            ...returnUser
        } = findUser

        if (!checkPassword) {
            return res.status(401).json({
                error: "Sai mật khẩu"
            })
        }

        return res.status(200).json({
            message: "Đăng nhập thành công",
            user: returnUser,
            accessToken
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const signUp = async (req, res) => {
    const { hashSync, genSaltSync } = bcrypt
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        if (!name) {
            return res.status(400).json({
                message: "Tên người dùng là bắt buộc"
            })
        }

        if (!email) {
            return res.status(400).json({
                message: "Email người dùng là bắt buộc"
            })
        }

        if (!password) {
            return res.status(400).json({
                message: "Mật khẩu người dùng là bắt buộc"
            })
        }

        const findUser = await User.findOne({ email })

        // const findUser = await User.findOne({ email: email })

        if (findUser) {
            return res.status(400).json({
                message: "Người dùng đã tồn tại"
            })
        }

        const salt = genSaltSync()

        const hashPassword = hashSync(password, salt)

        const user = await User.create({
            email,
            password: hashPassword,
            name
        })

        return res.status(200).json({
            message: "Tạo người dùng thành công",
            user
        })

    } catch (error) {
        return res.status(500).json(error)
    }
}

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

export const editUser = async (req, res) => {
    try {
        const id = req.params.id

        const name = req.body.name
        const email = req.body.email


        // select ("-password") => bỏ password trong object trả về
        const updateUser = await User.findByIdAndUpdate(id, {
            name: name,
            email: email
        }, { new: true }).select("-password")

        return res.status(200).json({
            message: "Update thành công",
            user: updateUser
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const changePassword = async (req, res) => {
    const { compareSync, genSaltSync, hashSync } = bcrypt
    try {
        const id = req.params.id
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                error: "Không tìm thấy người dùng"
            })
        }

        const checkPassword = compareSync(oldPassword, user.password)

        if (!checkPassword) {
            return res.status(400).json({
                error: "Sai mật khẩu cũ"
            })
        }

        const salt = genSaltSync()

        const hashPassword = hashSync(newPassword, salt)

        const updateUser = await User.findByIdAndUpdate(id, {
            password: hashPassword
        })


        return res.status(200).json({
            message: "Cập nhật mật khẩu thành công"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id

        // check xem người dùng có tồn tại hay không trước khi xoá

        await User.deleteOne({ _id: id })

        return res.status(200).json({ message: "Xoá người dùng thành công" })
    } catch (error) {
        return res.status(500).json(error)
    }
}