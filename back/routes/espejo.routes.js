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
  getEmpresas,
  updateEmpresa,
  crearEmpresa,
} from "../controllers/espejo.controller.js";
import {
  getExamenResultados,
  getBioanalistas,
  getExamenes,
  getExamenResultadosExterno,
  getExamenReimpresion,
} from "../controllers/examenes.controller.js";
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

import {
  getBioanalistasReportes,
  getExamenesReportes,
  getExternosReportes,
  getOrdenesReportes,
  getPaciente,
  getPacientes,
  getPacientesReportes,
  getUsers,
} from "../controllers/estadisticas.controller.js";
import {
  getCategorias,
  getSecciones,
} from "../controllers/examenesModulo.controller.js";
var router = express.Router();

//GET
router.get("/get-examenes-paciente", verifyCookie, getExamenesPacientes); //Administrador y impresion
router.get("/get-pacientes-dia", verifyCookie, getPacientesDia); //Administrador y impresion
router.get("/get-examen-dia", verifyCookie, getExamenDia); //Administrador y impresion
router.get("/get-examen-byFecha", verifyCookie, getExamenByFecha); //Administrador y impresion
router.get("/sedes", verifyCookie, getSedes); //Administrador y impresion
router.get("/empresas", verifyCookie, getEmpresas); //Administrador y impresion
router.get("/laboratorios", verifyCookie, getLaboratorios); //Administrador y impresion
router.get("/get-examen-detalle", verifyCookie, getExamenDetalle); //Administrador y impresion
router.get("/get-examen-resultado", verifyCookie, getExamenResultados); //Administrador y impresion
router.get("/get-pacientes", verifyCookie, getPacientes); //Administrador y impresion
router.get("/get-bioanalistas", verifyCookie, getBioanalistas); //Administrador y impresion
router.get("/secciones", verifyCookie, getSecciones); //Administrador y impresion
router.get("/get-examenes", verifyCookie, getExamenes); //Administrador y impresion
router.get("/get-users", verifyCookie, getUsers); //Administrador y impresion
router.get("/laboratorios", verifyCookie, getLaboratorios); //Administrador y impresion
router.get("/categorias", verifyCookie, getCategorias); //Administrador y impresion
router.get("/sedes", verifyCookie, getSedes); //Administrador y impresion
router.get("/get-paciente", verifyCookie, getPaciente); //TODOS
router.get("/resultados-examen", verifyCookie, getExamenResultados); //TODOS

//REIMPRESION
router.post("/reimpresion-examen", verifyCookie, getExamenReimpresion); //Administrador y impresion
router.post("/reimpresion-orden", verifyCookie, getExamenReimpresion); //Administrador y impresion
router.get("/get-externos-pdf", verifyCookie, getExamenResultadosExterno); ////Administrador y impresion

//GET USUARIOS
router.get("/get-usuarios", adminCookie, getAllUsers); //Administrador
router.get("/get-asegurados", adminCookie, getEmpresas); //Administrador


//POST
router.post("/guardar-usuario", adminCookie, crearUsuario); //Administrador
router.post("/guardar-bioanalista", adminCookie, crearBioanalsita); //Administrador
router.post("/crear-laboratorio", adminCookie, crearLaboratorio); //Administrador
router.post("/crear-sede", adminCookie, crearSede); //Administrador
router.post("/crear-empresa", adminCookie, crearEmpresa); //Administrador
router.post("/get-orden-reportes", adminCookie, getOrdenesReportes); //Administrador
router.post("/get-bioanalistas-reportes", adminCookie, getBioanalistasReportes); //Administrador
router.post("/get-pacientes-reportes", adminCookie, getPacientesReportes); //Administrador
router.post("/get-examenes-reportes", adminCookie, getExamenesReportes); //Administrador
router.post("/get-externos-reportes", adminCookie, getExternosReportes); //Administrador

//PUT

//PUT USUARIOS
router.put("/editar-usuario", adminCookie, editarUsuario); //Administrador
router.put("/editar-bioanalista", adminCookie, editarBioanalista); //Administrador
router.put("/editar-status", adminCookie, cambiarStatus); //Administrador
router.put("/update-laboratorio", adminCookie, updateLaboratorio); //Administrador
router.put("/update-sede", adminCookie, updateSede); //Administrador
router.put("/update-empresa", adminCookie, updateEmpresa); //Administrador

export default router;
