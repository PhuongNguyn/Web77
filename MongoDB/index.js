import express from "express"
import connectToDb from "./db/index.js"
import router from "./routes/index.js"
import dotenv from "dotenv"
import cors from "cors"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors({
    origin: ["https://web77-1.onrender.com", "http://localhost:5173"],
    // origin: "*"
}))
app.use(router)

const PORT = 4000

connectToDb()

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})