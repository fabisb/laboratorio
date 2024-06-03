import express from "express";
import { adminBioToken, administradorToken, noAuxToken, verifyToken } from "../controllers/login.controller.js";
import {
  modificarResultadoExamen,
  modificarExamenExterno,
  modificarLaboratorio,
  deletePendientesPaciente,
  getPendientesPaciente,
  getPendienteExamen,
  getExamenReimpresion,
  getExamenesExternos,
  getBioanalistas,
  crearExamenPendiente,
  crearExamenExterno,
  getPaciente,
  getExamenes,
  getExamenesPaciente,
  crearExamen,
  modificarExamen,
  getExamen,
  getCaracteristicasExamenPaciente,
  getPacienteHijo,
  crearOrden,
  getExamenResultados,
  updateSubCaracteristicaCar,
  statusExamenes,
  getExamenResultadosExterno,
  getEmpresas
} from "../controllers/examenes.controller.js";
var router = express.Router();

//GET
router.get("/get-bioanalistas", verifyToken, getBioanalistas);//TODOS
router.get("/get-empresas", verifyToken, getEmpresas);//TODOS
router.get("/get-paciente", verifyToken, getPaciente);//TODOS
router.get("/get-pendientes-paciente", verifyToken, getPendientesPaciente);//TODOS
router.get("/get-pendiente-examen", verifyToken, getPendienteExamen);//TODOS
router.get("/get-paciente-hijo", verifyToken, getPacienteHijo);//TODOS
router.get("/get-examenes", verifyToken,getExamenes);//TODOS
router.get("/get-paciente-externo", verifyToken,getExamenesExternos);//TODOS
router.get("/get-examenesPaciente", verifyToken,getExamenesPaciente);//TODOS
router.get("/get-caracteristicasExamenPaciente", verifyToken,getCaracteristicasExamenPaciente);//TODOS
router.get("/resultados-examen", verifyToken, getExamenResultados);//TODOS
router.get("/resultados-examen-externo", verifyToken, getExamenResultadosExterno);//TODOS

//POST
router.post("/get-examen",verifyToken,getExamen);//TODOS
router.post("/crear-examen", noAuxToken,crearExamen);//TODOS EXCEPTO AUXILIAR
router.post("/crear-examenExterno", administradorToken,crearExamenExterno);//ADMIN SOLO
router.post("/crear-orden", noAuxToken,crearOrden);//TODOS EXCEPTO AUXILIAR
router.post("/crear-examen-pendiente", verifyToken,crearExamenPendiente);//TODOS
router.post("/reimpresion-examen", verifyToken, getExamenReimpresion);//TODOS

//PUT
router.put("/modificar-examenExterno", administradorToken,modificarExamenExterno);//ADMIN
router.put("/modificar-examen", adminBioToken,modificarExamen);//ADMIN Y BIO SOLO ANTES DE 48HRS
router.put("/modificar-laboratorio", administradorToken,modificarLaboratorio);//ADMIN
router.put("/modificar-resultado-examen", adminBioToken,modificarResultadoExamen);//ADMIN Y BIO SOLO ANTES DE 48HRS
router.put("/update-subCaracteristicasCar", adminBioToken, updateSubCaracteristicaCar);//ADMIN Y BIO SOLO ANTES DE 48HRS

router.put("/status-examen", verifyToken, statusExamenes);

//DELETE

router.get("/delete-pendientes-paciente", verifyToken, deletePendientesPaciente); //TODOS



export default router;
