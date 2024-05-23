import express from "express";
import { adminBioToken, administradorToken, verifyToken } from "../controllers/login.controller.js";
import {
  agregarPacienteController,
  agregarBioanalistaController,
  agregarUsuarioController,
  buscarUsuario,
  editarUsuario,
  buscarBioanalista,
  editarBioanalista,
  cambiarStatus,
  buscarUsuarios,
  crearBioanalista,crearUsuario
} from "../controllers/creacion.controller.js";
var router = express.Router();

//TODOS LOS PERMISOS SOLO ADMIN
//GET
router.get("/buscar-usuarios", verifyToken, buscarUsuarios);
router.get("/buscar-usuario", verifyToken, buscarUsuario);
router.get("/buscar-bioanalista", verifyToken, buscarBioanalista);

//POST
router.post("/agregar-paciente", adminBioToken, agregarPacienteController); //MENOS AGREGAR PACIENTE

router.post("/agregar-usuario", administradorToken, agregarUsuarioController);
router.post("/agregar-bioanalista", administradorToken, agregarBioanalistaController);

router.post("/guardar-usuario", administradorToken,crearUsuario);
router.post("/guardar-bioanalista", administradorToken,crearBioanalista);

//PUT
router.put("/editar-usuario", administradorToken, editarUsuario);
router.put("/editar-bioanalista", administradorToken, editarBioanalista);
router.put("/editar-status", administradorToken, cambiarStatus);

export default router;
