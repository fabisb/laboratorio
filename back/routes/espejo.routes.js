import express from "express";
import {
  getExamenDia,
  getExamenDetalle,
  getExamenByFecha,
  getPacientesDia,
  getExamenesPacientes,
  getSedes,
  getLaboratorios,
  crearLaboratorio,
  crearSede,
  updateLaboratorio,
  updateSede
} from "../controllers/espejo.controller.js";
import { getExamenResultados } from "../controllers/examenes.controller.js";
import { crearBioanalsita, crearUsuario, getAllUsers } from "../controllers/usuariosEspejo.controller.js";
import { verifyCookie } from "../controllers/login.controller.js";
import {
  cambiarStatus,
  editarBioanalista,
  editarUsuario,
} from "../controllers/creacion.controller.js";
var router = express.Router();

//GET
router.get("/get-examenes-paciente", getExamenesPacientes);//Administrador y impresion
router.get("/get-pacientes-dia", getPacientesDia);//Administrador y impresion
router.get("/get-examen-dia", getExamenDia);//Administrador y impresion
router.get("/get-examen-byFecha", getExamenByFecha);//Administrador y impresion
router.get("/sedes", getSedes);//Administrador y impresion
router.get("/laboratorios", getLaboratorios);//Administrador y impresion
router.get("/get-examen-detalle", getExamenDetalle);//Administrador y impresion
router.get("/get-examen-resultado", getExamenResultados);//Administrador y impresion


//GET USUARIOS
router.get("/get-usuarios", verifyCookie, getAllUsers);//Administrador

//POST
router.post("/guardar-usuario", verifyCookie, crearUsuario);//Administrador
router.post("/guardar-bioanalista", verifyCookie, crearBioanalsita);//Administrador
router.post("/crear-laboratorio", crearLaboratorio);//Administrador
router.post("/crear-sede", crearSede);//Administrador



//PUT

//PUT USUARIOS
router.put("/editar-usuario", verifyCookie, editarUsuario);//Administrador
router.put("/editar-bioanalista", verifyCookie, editarBioanalista);//Administrador
router.put("/editar-status", verifyCookie, cambiarStatus);//Administrador
router.put("/update-laboratorio", updateLaboratorio);//Administrador
router.put("/update-sede", updateSede);//Administrador



export default router;
