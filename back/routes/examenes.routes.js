import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import { modificarResultadoExamen,deletePendientesPaciente,getPendientesPaciente, getBioanalistas,crearExamenPendiente, getPaciente,getExamenes,getExamenesPaciente,crearExamen,modificarExamen,getExamen, getCaracteristicasExamenPaciente, getPacienteHijo,crearOrden,getExamenResultados,updateSubCaracteristicaCar } from "../controllers/examenes.controller.js";
var router = express.Router();

//GET
router.get("/get-bioanalistas", verifyToken, getBioanalistas);
router.get("/get-paciente", verifyToken, getPaciente);
router.get("/get-pendientes-paciente", verifyToken, getPendientesPaciente);
router.get("/get-paciente-hijo", verifyToken, getPacienteHijo);
router.get("/get-examenes", verifyToken,getExamenes);
router.get("/get-examenesPaciente", verifyToken,getExamenesPaciente);
router.get("/get-caracteristicasExamenPaciente", verifyToken,getCaracteristicasExamenPaciente);
router.get("/resultados-examen", verifyToken, getExamenResultados);






//POST
router.post("/get-examen",getExamen);
router.post("/crear-examen", verifyToken,crearExamen);
router.post("/crear-orden", verifyToken,crearOrden);
router.post("/crear-examen-pendiente", verifyToken,crearExamenPendiente);



//PUT

router.put("/modificar-examen", verifyToken,modificarExamen);
router.put("/modificar-resultado-examen", verifyToken,modificarResultadoExamen);
router.put("/update-subCaracteristicasCar", verifyToken, updateSubCaracteristicaCar);

//DELETE

router.get("/delete-pendientes-paciente", verifyToken, deletePendientesPaciente);



export default router;
