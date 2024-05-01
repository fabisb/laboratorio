import express from "express";
import {
  getExamenDia,
  getExamenDetalle,
  getExamenByFecha,
  getPacientesDia,
  getExamenesPacientes,
} from "../controllers/espejo.controller.js";
import { getExamenResultados } from "../controllers/examenes.controller.js";
import { getAllUsers } from "../controllers/usuariosEspejo.controller.js";
import { verifyCookie } from "../controllers/login.controller.js";
import {
  editarBioanalista,
  editarBioanalistaStatus,
  editarUsuario,
  editarUsuarioStatus,
} from "../controllers/creacion.controller.js";
var router = express.Router();

//GET
router.get("/get-examenes-paciente", getExamenesPacientes);
router.get("/get-pacientes-dia", getPacientesDia);
router.get("/get-examen-dia", getExamenDia);
router.get("/get-examen-byFecha", getExamenByFecha);
router.get("/get-examen-detalle", getExamenDetalle);
router.get("/get-examen-resultado", getExamenResultados);

//GET USUARIOS
router.get("/get-usuarios", verifyCookie, getAllUsers);

//POST

//PUT

//PUT USUARIOS
router.put("/editar-usuario", verifyCookie, editarUsuario);
router.put("/editar-bioanalista", verifyCookie, editarBioanalista);
router.put("/editar-usuario-status", verifyCookie, editarUsuarioStatus);
router.put("/editar-bioanalista-status", verifyCookie, editarBioanalistaStatus);

export default router;
