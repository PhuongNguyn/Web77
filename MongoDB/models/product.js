import mongoose from "mongoose"

const Product = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
})

// products là khai báo tên collections
export default mongoose.model("products", Product)