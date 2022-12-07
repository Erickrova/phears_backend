import express from "express"
import { create, editarClothe, eliminarClothe, obtenerClothe, obtenerClothes } from "../controller/clothesController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/obtener-clothes",obtenerClothes)
router.get("/obtener-clothe/:id",obtenerClothe)
router.post("/create",auth,create)
router.put("/actualizar/:id",auth,editarClothe)
router.delete("/eliminar/:id",auth,eliminarClothe)

export default router