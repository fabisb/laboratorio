import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import { agregarPacienteController,agregarBioanalistaController, agregarUsuarioController } from "../controllers/creacion.controller.js";
var router = express.Router();

router.post("/agregar-paciente", verifyToken, agregarPacienteController);
router.post("/agregar-usuario", verifyToken, agregarUsuarioController);
router.post("/agregar-bioanalista", verifyToken, agregarBioanalistaController);


export default router;
