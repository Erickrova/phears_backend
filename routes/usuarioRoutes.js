import express from "express"
import { favoritos, login, obtenerFavoritos, perfil, register, removerFavoritos } from "../controller/usuarioController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",login)

router.get("/favoritos/:id/:idu",auth,favoritos)
router.get("/remover-favoritos/:id/:idu",auth,removerFavoritos)
router.get("/obtener-favoritos",auth,obtenerFavoritos)

router.get("/perfil",auth,perfil)

export default router