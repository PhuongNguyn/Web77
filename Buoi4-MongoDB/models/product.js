import mongoose from "mongoose"

const Product = new mongoose.Schema({

})

// products là khai báo tên collections
export default mongoose.model("products", Product)