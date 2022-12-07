import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js"


const auth = async (req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = await jwt.verify(token,process.env.JWT_SECRET)
            const {id} = decoded
            const usuario = await Usuario.findById(id).select("nombre email rank favoritos")
            if(usuario){
                req.usuario = usuario
                return next()
            }
        } catch (error) {
            return res.status(400).json({msg:"No Tienes Permisos"})
        }
    }
    if(!token){
        return res.status(400).json({msg:"No Tienes Permisos"})
    }

}
export default auth