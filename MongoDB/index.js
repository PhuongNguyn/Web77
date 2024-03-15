import express from "express"
import connectToDb from "./db/index.js"
import router from "./routes/index.js"

const app = express()
app.use(express.json())
app.use(router)

const PORT = 4000

connectToDb()

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})