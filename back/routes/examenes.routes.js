import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import { modificarResultadoExamen,modificarExamenExterno,modificarLaboratorio,deletePendientesPaciente,getPendientesPaciente,getPendienteExamen,getExamenReimpresion,getExamenesExternos, getBioanalistas,crearExamenPendiente, crearExamenExterno,getPaciente,getExamenes,getExamenesPaciente,crearExamen,modificarExamen,getExamen, getCaracteristicasExamenPaciente, getPacienteHijo,crearOrden,getExamenResultados,updateSubCaracteristicaCar } from "../controllers/examenes.controller.js";
var router = express.Router();

//GET
router.get("/get-bioanalistas", verifyToken, getBioanalistas);//TODOS
router.get("/get-paciente", verifyToken, getPaciente);//TODOS
router.get("/get-pendientes-paciente", verifyToken, getPendientesPaciente);//TODOS
router.get("/get-pendiente-examen", verifyToken, getPendienteExamen);//TODOS
router.get("/get-paciente-hijo", verifyToken, getPacienteHijo);//TODOS
router.get("/get-examenes", verifyToken,getExamenes);//TODOS
router.get("/get-paciente-externo", verifyToken,getExamenesExternos);//TODOS
router.get("/get-examenesPaciente", verifyToken,getExamenesPaciente);//TODOS
router.get("/get-caracteristicasExamenPaciente", verifyToken,getCaracteristicasExamenPaciente);//TODOS
router.get("/resultados-examen", verifyToken, getExamenResultados);//TODOS







//POST
router.post("/get-examen",getExamen);//TODOS
router.post("/crear-examen", verifyToken,crearExamen);//TODOS EXCEPTO AUXILIAR
router.post("/crear-examenExterno", verifyToken,crearExamenExterno);//ADMIN SOLO
router.post("/crear-orden", verifyToken,crearOrden);//TODOS EXCEPTO AUXILIAR
router.post("/crear-examen-pendiente", verifyToken,crearExamenPendiente);//TODOS
router.post("/reimpresion-examen", verifyToken, getExamenReimpresion);//TODOS




//PUT
router.put("/modificar-examenExterno", verifyToken,modificarExamenExterno);//ADMIN
router.put("/modificar-examen", verifyToken,modificarExamen);//ADMIN Y BIO SOLO ANTES DE 48HRS
router.put("/modificar-laboratorio", verifyToken,modificarLaboratorio);//ADMIN
router.put("/modificar-resultado-examen", verifyToken,modificarResultadoExamen);//ADMIN Y BIO SOLO ANTES DE 48HRS
router.put("/update-subCaracteristicasCar", verifyToken, updateSubCaracteristicaCar);//ADMIN Y BIO SOLO ANTES DE 48HRS

//DELETE

router.get("/delete-pendientes-paciente", verifyToken, deletePendientesPaciente); //TODOS



export default router;
