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
const corsOptions = {
    origin: function(origin,callback){
        if(whiteList.includes(origin)){
            // puede consultar la API
            callback(null,true)
        }else{
            // no esta permitido su request
            callback(new Error("Error de cors"))
        }
    }
}
app.use(cors(corsOptions))
app.use(express.json())


const port = process.env.PORT || 4000

app.use("/api/usuarios",usuarioRoutes)
app.use("/api/clothes",clothesRoutes)

app.listen(port,()=>{
    console.log("app on port 4000")
})