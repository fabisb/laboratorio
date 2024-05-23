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
router.get("/get-examenes-paciente",verifyCookie, getExamenesPacientes);
router.get("/get-pacientes-dia",verifyCookie, getPacientesDia);
router.get("/get-examen-dia", verifyCookie,getExamenDia);
router.get("/get-examen-byFecha", verifyCookie,getExamenByFecha);
router.get("/sedes", verifyCookie,getSedes);
router.get("/laboratorios",verifyCookie, getLaboratorios);
router.get("/get-examen-detalle", verifyCookie,getExamenDetalle);
router.get("/get-examen-resultado", verifyCookie,getExamenResultados);


//GET USUARIOS
router.get("/get-usuarios", verifyCookie, getAllUsers);

//POST
router.post("/guardar-usuario", verifyCookie, crearUsuario);
router.post("/guardar-bioanalista", verifyCookie, crearBioanalsita);
router.post("/crear-laboratorio", verifyCookie,crearLaboratorio);
router.post("/crear-sede", verifyCookie,crearSede);



//PUT

//PUT USUARIOS
router.put("/editar-usuario", verifyCookie, editarUsuario);
router.put("/editar-bioanalista", verifyCookie, editarBioanalista);
router.put("/editar-status", verifyCookie, cambiarStatus);
router.put("/update-laboratorio", verifyCookie,updateLaboratorio);
router.put("/update-sede", verifyCookie,updateSede);



export default router;
