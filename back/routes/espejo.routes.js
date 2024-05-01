import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import {
  getExamenDia,
  getExamenDetalle,
  getExamenByFecha,
  getPacientesDia,
  getExamenesPacientes
} from "../controllers/espejo.controller.js";
import { getExamenResultados } from "../controllers/examenes.controller.js";
var router = express.Router();

//GET
router.get("/get-examenes-paciente", getExamenesPacientes);
router.get("/get-pacientes-dia", getPacientesDia);
router.get("/get-examen-dia", getExamenDia);
router.get("/get-examen-byFecha", getExamenByFecha);
router.get("/get-examen-detalle", getExamenDetalle);
router.get("/get-examen-resultado", getExamenResultados);

export default router;
