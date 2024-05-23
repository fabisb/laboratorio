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
  updateSede,
} from "../controllers/espejo.controller.js";
import { getExamenResultados } from "../controllers/examenes.controller.js";
import {
  crearBioanalsita,
  crearUsuario,
  getAllUsers,
} from "../controllers/usuariosEspejo.controller.js";
import {
  adminCookie,
  impresionCookie,
  verifyCookie,
} from "../controllers/login.controller.js";
import {
  cambiarStatus,
  editarBioanalista,
  editarUsuario,
} from "../controllers/creacion.controller.js";
var router = express.Router();

//GET
router.get("/get-examenes-paciente", verifyCookie, getExamenesPacientes); //Administrador y impresion
router.get("/get-pacientes-dia", verifyCookie, getPacientesDia); //Administrador y impresion
router.get("/get-examen-dia", verifyCookie, getExamenDia); //Administrador y impresion
router.get("/get-examen-byFecha", verifyCookie, getExamenByFecha); //Administrador y impresion
router.get("/sedes", verifyCookie, getSedes); //Administrador y impresion
router.get("/laboratorios", verifyCookie, getLaboratorios); //Administrador y impresion
router.get("/get-examen-detalle", verifyCookie, getExamenDetalle); //Administrador y impresion
router.get("/get-examen-resultado", verifyCookie, getExamenResultados); //Administrador y impresion

//GET USUARIOS
router.get("/get-usuarios", adminCookie, getAllUsers); //Administrador

//POST
router.post("/guardar-usuario", adminCookie, crearUsuario); //Administrador
router.post("/guardar-bioanalista", adminCookie, crearBioanalsita); //Administrador
router.post("/crear-laboratorio", adminCookie, crearLaboratorio); //Administrador
router.post("/crear-sede", adminCookie, crearSede); //Administrador

//PUT

//PUT USUARIOS
router.put("/editar-usuario", adminCookie, editarUsuario); //Administrador
router.put("/editar-bioanalista", adminCookie, editarBioanalista); //Administrador
router.put("/editar-status", adminCookie, cambiarStatus); //Administrador
router.put("/update-laboratorio", adminCookie, updateLaboratorio); //Administrador
router.put("/update-sede", adminCookie, updateSede); //Administrador

export default router;
