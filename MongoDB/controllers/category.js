import toSlug from "../utils/toSlug.js"
import categoryModel from "../models/category.js"

export const getPagingCategory = async (req, res) => {
    try {

        // check xem pageSize co duoc nhap khong va co dung la kieu du lieu Number ko
        const pageSize = req.query.pageSize
        // check xem pageIndex co duoc nhap khong va co dung la kieu du lieu Number ko
        const pageIndex = req.query.pageIndex

        // const categories = await categoryModel.find().skip(pageSize * pageIndex - pageSize).limit(pageSize)
        // const totalPages = await categoryModel.countDocuments()

        //Nó sẽ giúp 2 hàm chạy concurrency
        const [categories, totalPages] = await Promise.all([categoryModel.find().skip(pageSize * pageIndex - pageSize).limit(pageSize),
        categoryModel.countDocuments()])

        return res.status(200).json({
            categories,
            totalPages
        })

    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createCategory = async (req, res) => {
    try {

        // Validate name co dung kieu du lieu khong
        // Validate xem name co ton tai chua
        const name = req.body.name
        const slug = toSlug(name)

        const newCategory = await categoryModel.create({
            name,
            slug
        })

        return res.status(201).json({
            category: newCategory
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const editCategory = (req, res) => {

}

export const deleteCategory = (req, res) => {

}