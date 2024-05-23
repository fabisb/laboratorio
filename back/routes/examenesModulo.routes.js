import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import {
  crearExamen,
  crearSeccion,
  crearCategoria,
  crearLaboratorio,
  deleteCaracteristica,
  deleteRango,
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
  crearSede
} from "../controllers/examenesModulo.controller.js";
var router = express.Router();

//TODO PERMISOS PARA BIOANALISTA Y ADMINISTRADOR

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
router.post("/crear-seccion", verifyToken, crearSeccion);
router.post("/crear-sede", verifyToken, crearSede);
router.post("/crear-categoria", verifyToken, crearCategoria);
router.post("/crear-examen", verifyToken, crearExamen);
router.post("/crear-laboratorio", verifyToken, crearLaboratorio);

//PUT
router.put("/update-laboratorio", verifyToken, updateLaboratorio);
router.put("/update-categoria", verifyToken, updateCategoria);
router.put("/update-seccion", verifyToken, updateSeccion);
router.put("/update-sede", verifyToken, updateSede);
router.put("/update-examen", verifyToken, updateExamen);
router.put("/update-examen-tabla", verifyToken, updateExamenTabla);
router.put("/update-caracteristica", verifyToken, updateCaracteristica);
router.put("/update-subcaracteristica", verifyToken, updateSubCaracteristica);
router.put("/update-rango", verifyToken, updateRango);
router.put("/update-resultado", verifyToken, updateResultados);

//INSERT
router.post("/insert-caracteristica", verifyToken, insertCaracteristica);
router.post("/insert-subcaracteristica", verifyToken, insertSubCaracteristica);
router.post("/insert-rango", verifyToken, insertRango);
router.post("/insert-resultado", verifyToken, insertResultado);

//DELETE
router.delete("/delete-caracteristica", verifyToken, deleteCaracteristica);
router.delete(
  "/delete-subcaracteristica",
  verifyToken,
  deleteSubCaracteristica
);
router.delete("/delete-rango", verifyToken, deleteRango);
router.delete("/delete-resultado", verifyToken, deleteResultado);

export default router;
