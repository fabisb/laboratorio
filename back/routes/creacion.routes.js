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
  editarUsuarioStatus,
  editarBioanalistaStatus,
} from "../controllers/creacion.controller.js";
var router = express.Router();

//GET
router.get("/buscar-usuario", verifyToken, buscarUsuario);
router.get("/buscar-bioanalista", verifyToken, buscarBioanalista);

//POST
router.post("/agregar-paciente", verifyToken, agregarPacienteController);
router.post("/agregar-usuario", verifyToken, agregarUsuarioController);
router.post("/agregar-bioanalista", verifyToken, agregarBioanalistaController);

//PUT
router.put("/editar-usuario", verifyToken, editarUsuario);
router.put("/editar-bioanalista", verifyToken, editarBioanalista);
router.put("/editar-usuario-status", verifyToken, editarUsuarioStatus);
router.put("/editar-bioanalista-status", verifyToken, editarBioanalistaStatus);

export default router;
