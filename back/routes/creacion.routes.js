import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import { agregarPacienteController } from "../controllers/creacion.controller.js";
var router = express.Router();

router.post("/agregar-paciente", verifyToken, agregarPacienteController);

export default router;
