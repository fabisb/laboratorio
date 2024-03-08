import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import { crearExamen, crearSeccion,getSecciones} from "../controllers/examenesModulo.controller.js";
var router = express.Router();

//GET
router.get('/secciones',verifyToken, getSecciones)


//POST
router.post('/crear-seccion',verifyToken, crearSeccion)
router.post('/crear-examen',verifyToken, crearExamen)

//PUT



export default router;
