import mongoose from "mongoose"

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "customer"
    },
    workExperience: [
        {
            workName: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            }
        }
    ],
    hobby: {
        type: String,
    }
}, {
    timestamps: true,
})

// users là khai báo tên collections
export default mongoose.model("users", User)