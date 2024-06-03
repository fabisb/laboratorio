import express from "express";
import { adminBioToken, administradorToken, verifyToken } from "../controllers/login.controller.js";
import {
  getUsers,getPacientes,getPacientesReportes,getExamenesReportes,
  getOrdenesReportes,
  getBioanalistasReportes,
  getExternosReportes,
  getPaciente
} from "../controllers/estadisticas.controller.js";

var router = express.Router();


router.get("/get-paciente", verifyToken, getPaciente);//TODOS
router.get("/get-users", verifyToken, getUsers);//TODOS
router.get("/get-pacientes", verifyToken, getPacientes);//TODOS
router.post("/get-pacientes-reportes", verifyToken, getPacientesReportes);//TODOS
router.post("/get-examenes-reportes", verifyToken, getExamenesReportes);//TODOS
router.post("/get-orden-reportes", verifyToken, getOrdenesReportes);//TODOS
router.post("/get-bioanalistas-reportes", verifyToken, getBioanalistasReportes);//TODOS
router.post("/get-externos-reportes", verifyToken, getExternosReportes);//TODOS







export default router;
