import Clothes from "../models/Clothes.js"

const create = async (req,res) =>{

    try {
        const clothes = await Clothes.create(req.body)
        await clothes.save()
        return res.json(clothes)
    } catch (error) {
        console.log(error)
        return res.status(400).json("Ocurrió un error Creando la publicación")
    }
}
const obtenerClothes = async (req,res) =>{
    const clothes = await Clothes.find().select("-__v -createdAt -updatedAt")
    return res.json(clothes)
}
const obtenerClothe = async (req,res) =>{
    const {id} = req.params
    try {
        const clothe = await Clothes.findById(id).select("-__v -createdAt -updatedAt")
        if(!clothe?._id){
            const error = new Error("Prenda no Encontrada")
            return res.status(404).json({msg:error.message})
        }
        return res.json(clothe)
    } catch (error) {
        return res.status(404).json({msg:"Prenda no Encontrada"}) 
    }
}
const editarClothe = async (req,res) =>{
    const {id} = req.params
    const clothe = await Clothes.findById(id)
    if(!clothe?._id){
        const error = new Error("Prenda no Encontrada")
        return res.status(404).json({msg:error.message})
    }
    try {
        clothe.nombre = req.body.nombre || clothe.nombre
        clothe.descripcion = req.body.descripcion || clothe.descripcion
        clothe.dir = req.body.dir || clothe.dir
        clothe.categoria = req.body.categoria || clothe.categoria
        clothe.disponibles = req.body.disponibles || clothe.disponibles
        clothe.precio = req.body.precio || clothe.precio
        await clothe.save()
        return res.json({msg:"Actualizado correctamente"})
    } catch (error) {
        return res.status(400).json({msg:"ha ocurrido un error"})
    }   
}
const eliminarClothe = async (req,res) =>{
    const {id} = req.params
    const clothe = await Clothes.findById(id)
    try {
        await clothe.deleteOne()
        return res.json({msg:"eliminado correctamente"})    
    } catch (error) {
        return res.status(404).json({msg:"Prenda no Encontrada"}) 
    }
}

export{
    create,
    obtenerClothes,
    obtenerClothe,
    editarClothe,
    eliminarClothe
}