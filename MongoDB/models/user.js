import mongoose from "mongoose"

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
})

// users là khai báo tên collections
export default mongoose.model("users", User)