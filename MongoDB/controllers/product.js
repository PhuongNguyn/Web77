import product from "../models/product.js";

export const createProduct = async (req, res) => {
    try {
        const result = await product.create({
            product_name: "Ban hoc",
            product_price: 10000,
        })

        return res.status(201).json({ product: result })
    } catch (error) {
        return res.status(500).json(error)
    }
}

