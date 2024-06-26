import categoryModel from "../models/category.js";
import product from "../models/product.js";
import toSlug from "../utils/toSlug.js";

export const getProductByCategory = async (req, res) => {
    try {
        const categorySlug = req.params.slug
        const category = await categoryModel.findOne({
            slug: categorySlug
        })

        const products = await product.find({
            categoryId: category._id
        })

        return res.status(200).json({
            products
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const createProduct = async (req, res) => {
    const user = req.user
    const product_name = req.body.product_name
    const product_price = req.body.product_price
    const categoryId = req.body.categoryId
    const slug = toSlug(product_name)
    try {
        const result = await product.create({
            product_name: product_name,
            product_price: product_price,
            createdBy: user._id,
            categoryId,
            slug
        })

        return res.status(201).json({ product: result })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getPagingProduct = async (req, res) => {
    try {
        const pageSize = req.query.pageSize
        const pageIndex = req.query.pageIndex

        const result = await product.find().skip(pageSize * pageIndex - pageSize).limit(pageSize)
            .populate({ path: "createdBy", select: "name" }).select("-product_price")

        // const result = await product.find().skip(pageSize * pageIndex - pageSize).limit(pageSize)
        // .populate("createdBy").select("-product_price")
        const countDocuments = await product.countDocuments()

        const totalPage = Math.ceil(countDocuments / pageSize)

        return res.status(200).json({
            products: result,
            totalPage
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

