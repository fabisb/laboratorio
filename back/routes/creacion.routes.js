import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
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
  crearBioanalsita,crearUsuario
} from "../controllers/creacion.controller.js";
var router = express.Router();

//GET
router.get("/buscar-usuarios", verifyToken, buscarUsuarios);
router.get("/buscar-usuario", verifyToken, buscarUsuario);
router.get("/buscar-bioanalista", verifyToken, buscarBioanalista);

//POST
router.post("/agregar-paciente", verifyToken, agregarPacienteController);
router.post("/agregar-usuario", verifyToken, agregarUsuarioController);
router.post("/agregar-bioanalista", verifyToken, agregarBioanalistaController);
router.post("/guardar-usuario", crearUsuario);
router.post("/guardar-bioanalista", crearBioanalsita);

//PUT
router.put("/editar-usuario", verifyToken, editarUsuario);
router.put("/editar-bioanalista", verifyToken, editarBioanalista);
router.put("/editar-status", verifyToken, cambiarStatus);

export default router;
