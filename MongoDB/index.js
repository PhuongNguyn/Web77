import express from "express"
import connectToDb from "./db/index.js"
import router from "./routes/index.js"
import dotenv from "dotenv"
import cors from "cors"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors({
    // origin: ["http://localhost:5173", "http://localhost:3002"],
    origin: "*"
}))
app.use(router)

const PORT = 4000

connectToDb()

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})