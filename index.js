import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import clothesRoutes from "./routes/clothesRoutes.js"
import connectDB from "./config/db.js"

const app = express()
dotenv.config()
connectDB()
const whiteList = [process.env.FRONTEND_URL]
app.use(cors({origin:whiteList}))
app.use(express.json())


const port = process.env.PORT || 4000

app.use("/api/usuarios",usuarioRoutes)
app.use("/api/clothes",clothesRoutes)

app.listen(port,()=>{
    console.log("app on port 4000")
})