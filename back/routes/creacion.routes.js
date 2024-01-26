import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import { agregarPacienteController,agregarBioanalistaController } from "../controllers/creacion.controller.js";
var router = express.Router();

router.post("/agregar-paciente", verifyToken, agregarPacienteController);
router.post("/agregar-bioanalista", verifyToken, agregarBioanalistaController);


export default router;
