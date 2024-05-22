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
router.get("/get-examenes-paciente", getExamenesPacientes);
router.get("/get-pacientes-dia", getPacientesDia);
router.get("/get-examen-dia", getExamenDia);
router.get("/get-examen-byFecha", getExamenByFecha);
router.get("/sedes", getSedes);
router.get("/laboratorios", getLaboratorios);
router.get("/get-examen-detalle", getExamenDetalle);
router.get("/get-examen-resultado", getExamenResultados);


//GET USUARIOS
router.get("/get-usuarios", verifyCookie, getAllUsers);

//POST
router.post("/guardar-usuario", verifyCookie, crearUsuario);
router.post("/guardar-bioanalista", verifyCookie, crearBioanalsita);
router.post("/crear-laboratorio", crearLaboratorio);
router.post("/crear-sede", crearSede);



//PUT

//PUT USUARIOS
router.put("/editar-usuario", verifyCookie, editarUsuario);
router.put("/editar-bioanalista", verifyCookie, editarBioanalista);
router.put("/editar-status", verifyCookie, cambiarStatus);
router.put("/update-laboratorio", updateLaboratorio);
router.put("/update-sede", updateSede);



export default router;
