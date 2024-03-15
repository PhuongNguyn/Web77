import mongoose from "mongoose";

const url = "mongodb+srv://web77:123123123@cluster0.my3bocn.mongodb.net/web77"

const connectToDb = async () => {
    try {
        await mongoose.connect(url)
        console.log("Database connect successful")
    } catch (error) {
        console.log(error)
    }
}

export default connectToDb