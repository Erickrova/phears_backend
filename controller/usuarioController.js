import generarJWT from "../helpers/generateJWT.js"
import Clothes from "../models/Clothes.js"
import Usuario from "../models/Usuario.js"


const register = async (req,res) =>{
    const { email } = req.body
    const usuario = await Usuario.findOne({email})
    if(usuario){
        const error = new Error("Este usuario ya existe")
        return res.status(400).json({msg:error.message})
    }
    try {
        const nuevoUsuario = await Usuario.create(req.body)
        nuevoUsuario.nombre = nuevoUsuario.nombre.toLowerCase()
        await nuevoUsuario.save()
        res.json({msg:"Usuario Registrado Correctamente, ya puedes iniciar sesion"})
    } catch (error) {
        console.log(error)
    }
}
const login = async (req,res)=>{
    const {email,password} = req.body
    try {
        const usuario = await Usuario.findOne({email})
    
        if(!usuario){
            const error = new Error("Este usuario no existe")
            return res.status(404).json({msg:error.message})
        }
        if(await usuario.comprobarPassword(password)){
            return res.json({
                _id:usuario._id,
                nombre:usuario.nombre,
                email:usuario.email,
                rank: usuario.rank,
                token: generarJWT(usuario._id)
            })
        }else{
            const error = new Error("Contraseña incorrecta")
            return res.status(401).json({msg:error.message})
        }
    } catch (error) {
           console.log(error) 
    }
}
const favoritos = async (req,res)=>{
    const {id,idu} = req.params
    const clothe = await Clothes.findById(id).select("nombre")
    const usuario = await Usuario.findById(idu).select("-__v -password -createdAt -updatedAt")

    if(!clothe){
        const error = new Error("Esta prenda no existe")
        return res.status(404).json({msg:error.message})
    }
    if(!usuario){
        const error = new Error("Este usuario no existe")
        return res.status(404).json({msg:error.message})
    }
    try {
        if(!usuario.favoritos.includes(id)){
            usuario.favoritos.push(id)
            await usuario.save()
            return res.json({msg:"Agregado a favoritos"})
        }
    } catch (error) {
        console.log(error)
    }
}
const removerFavoritos = async (req,res)=>{
    const {id,idu} = req.params
    const clothe = await Clothes.findById(id).select("nombre")
    const usuario = await Usuario.findById(idu).select("-__v -password -createdAt -updatedAt")

    if(!clothe){
        const error = new Error("Esta prenda no existe")
        return res.status(404).json({msg:error.message})
    }
    if(!usuario){
        const error = new Error("Este usuario no existe")
        return res.status(404).json({msg:error.message})
    }
    try {
            usuario.favoritos.pull(id)
            await usuario.save()
            return res.json({msg:"Removido de favoritos"})
    } catch (error) {
        console.log(error)
    }
}

const obtenerFavoritos = async (req,res)=>{
    const usuario = await Usuario.findById(req.usuario._id).select("nombre").populate("favoritos")
    return res.json(usuario.favoritos)
}

const perfil = (req,res) =>{
    const {usuario} = req
    return res.json(usuario)
}

export{
    perfil,
    register,
    login,
    favoritos,
    removerFavoritos,
    obtenerFavoritos,
}