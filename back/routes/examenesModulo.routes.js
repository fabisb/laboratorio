import express from "express";
import { administradorToken, verifyToken } from "../controllers/login.controller.js";
import {
  crearExamen,
  crearSeccion,
  crearCategoria,
  crearLaboratorio,
  crearTitulo,
  crearEmpresa,
  deleteCaracteristica,
  deleteRango,
  deleteTitulo,
  deleteResultado,
  deleteSubCaracteristica,
  getCaracteristicasById,
  deleteEmpresa,
  deleteExamen,
  deleteSede,
  deleteLaboratorio,
  deleteCategoria,
  getExamenById,
  getExamenByNombre,
  getExamenBySeccion,
  getExamenByCategoria,
  getExamenes,
  getLaboratorios,
  getSecciones,
  getSedes,
  getEmpresas,
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
  updateEmpresa,
  updateSubCaracteristica,
  updateLaboratorio,
  updateSede,
  updateTitulo,
  crearSede,
  deleteSeccion
} from "../controllers/examenesModulo.controller.js";
var router = express.Router();
//ADMINISTRADOR SOLAMENTE
//GET
router.get("/laboratorios", verifyToken, getLaboratorios);
router.get("/secciones", verifyToken, getSecciones);
router.get("/categorias", verifyToken, getCategorias);
router.get("/empresas", verifyToken, getEmpresas);
router.get("/sedes", verifyToken, getSedes);
router.get("/examenes", verifyToken, getExamenes);
router.get("/examen-id", verifyToken, getExamenById);
router.get("/examen-nombre", verifyToken, getExamenByNombre);
router.get("/examen-seccion", verifyToken, getExamenBySeccion);
router.get("/examen-categoria", verifyToken, getExamenByCategoria);
router.get("/caracteristicas-id_ex", verifyToken, getCaracteristicasById);


//POST
router.post("/crear-empresa", administradorToken, crearEmpresa);
router.post("/crear-seccion", administradorToken, crearSeccion);
router.post("/crear-sede", administradorToken, crearSede);
router.post("/crear-categoria", administradorToken, crearCategoria);
router.post("/crear-examen", administradorToken, crearExamen);
router.post("/crear-laboratorio", administradorToken, crearLaboratorio);
router.post("/crear-titulo", administradorToken, crearTitulo);


//PUT
router.put("/update-laboratorio", administradorToken, updateLaboratorio);
router.put("/update-empresa", administradorToken, updateEmpresa);
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
router.put("/delete-empresa",administradorToken, deleteEmpresa);
router.put("/delete-examen",administradorToken, deleteExamen);
router.put("/delete-Seccion",administradorToken, deleteSeccion);

router.put("/delete-sede",administradorToken, deleteSede);
router.put("/delete-laboratorio",administradorToken, deleteLaboratorio);
router.put("/delete-categoria",administradorToken, deleteCategoria);



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
