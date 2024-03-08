import express from "express"
import morgan from "morgan"
import route from "./routes/index.js"

const app = express()

const PORT = 4000

// Global Middleware
app.use(express.json())
app.use(morgan("combined"))
app.use(route)

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})