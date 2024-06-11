import express from "express";
import { adminBioToken, administradorToken, verifyToken } from "../controllers/login.controller.js";
import {
  getUsers,getPacientes,getPacientesReportes,getExamenesReportes,
  getOrdenesReportes,
  getBioanalistasReportes,
  getExternosReportes,
  getPaciente
} from "../controllers/estadisticas.controller.js";
import { getExamenReimpresion, getExamenResultadosExterno } from "../controllers/examenes.controller.js";

var router = express.Router();

//GET
router.get("/get-paciente", verifyToken, getPaciente);//TODOS
router.get("/get-users", verifyToken, getUsers);//TODOS
router.get("/get-pacientes", verifyToken, getPacientes);//TODOS

//POST
router.post("/get-pacientes-reportes", verifyToken, getPacientesReportes);//TODOS
router.post("/get-examenes-reportes", verifyToken, getExamenesReportes);//TODOS
router.post("/get-orden-reportes", verifyToken, getOrdenesReportes);//TODOS
router.post("/get-bioanalistas-reportes", verifyToken, getBioanalistasReportes);//TODOS
router.post("/get-externos-reportes", verifyToken, getExternosReportes);//TODOS

//REIMPRESION
router.get("/get-externos-pdf", verifyToken, getExamenResultadosExterno);//TODOS
router.get("/reimpresion-examen", verifyToken, getExamenReimpresion);//TODOS







export default router;
