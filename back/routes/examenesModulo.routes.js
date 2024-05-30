import express from "express";
import { administradorToken, verifyToken } from "../controllers/login.controller.js";
import {
  crearExamen,
  crearSeccion,
  crearCategoria,
  crearLaboratorio,
  crearTitulo,
  deleteCaracteristica,
  deleteRango,
  deleteTitulo,
  deleteResultado,
  deleteSubCaracteristica,
  getCaracteristicasById,
  getExamenById,
  getExamenByNombre,
  getExamenBySeccion,
  getExamenByCategoria,
  getExamenes,
  getLaboratorios,
  getSecciones,
  getSedes,
  getCategorias,
  insertCaracteristica,
  insertRango,
  insertResultado,
  insertSubCaracteristica,
  updateCaracteristica,
  updateExamen,
  updateExamenTabla,
  updateRango,
  updateResultados,
  updateSeccion,
  updateCategoria,
  updateSubCaracteristica,
  updateLaboratorio,
  updateSede,
  updateTitulo,
  crearSede
} from "../controllers/examenesModulo.controller.js";
var router = express.Router();
//ADMINISTRADOR SOLAMENTE
//GET
router.get("/laboratorios", verifyToken, getLaboratorios);
router.get("/secciones", verifyToken, getSecciones);
router.get("/categorias", verifyToken, getCategorias);
router.get("/sedes", verifyToken, getSedes);
router.get("/examenes", verifyToken, getExamenes);
router.get("/examen-id", verifyToken, getExamenById);
router.get("/examen-nombre", verifyToken, getExamenByNombre);
router.get("/examen-seccion", verifyToken, getExamenBySeccion);
router.get("/examen-categoria", verifyToken, getExamenByCategoria);
router.get("/caracteristicas-id_ex", verifyToken, getCaracteristicasById);


//POST
router.post("/crear-seccion", administradorToken, crearSeccion);
router.post("/crear-sede", administradorToken, crearSede);
router.post("/crear-categoria", administradorToken, crearCategoria);
router.post("/crear-examen", administradorToken, crearExamen);
router.post("/crear-laboratorio", administradorToken, crearLaboratorio);
router.post("/crear-titulo", administradorToken, crearTitulo);


//PUT
router.put("/update-laboratorio", administradorToken, updateLaboratorio);
router.put("/update-categoria", administradorToken, updateCategoria);
router.put("/update-seccion", administradorToken, updateSeccion);
router.put("/update-sede", administradorToken, updateSede);
router.put("/update-titulo", administradorToken, updateTitulo);
router.put("/update-examen", administradorToken, updateExamen);
router.put("/update-examen-tabla", administradorToken, updateExamenTabla);
router.put("/update-caracteristica", administradorToken, updateCaracteristica);
router.put("/update-subcaracteristica", administradorToken, updateSubCaracteristica);
router.put("/update-rango", administradorToken, updateRango);
router.put("/update-resultado", administradorToken, updateResultados);

//INSERT
router.post("/insert-caracteristica", administradorToken, insertCaracteristica);
router.post("/insert-subcaracteristica", administradorToken, insertSubCaracteristica);
router.post("/insert-rango", administradorToken, insertRango);
router.post("/insert-resultado", administradorToken, insertResultado);

//DELETE
router.delete("/delete-caracteristica", administradorToken, deleteCaracteristica);
router.delete(
  "/delete-subcaracteristica",
  administradorToken,
  deleteSubCaracteristica
);
router.delete("/delete-rango", administradorToken, deleteRango);
router.delete("/delete-resultado", administradorToken, deleteResultado);
router.delete("/delete-titulo",administradorToken, deleteTitulo);


export default router;
