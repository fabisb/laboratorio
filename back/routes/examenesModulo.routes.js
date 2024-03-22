import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import {
  crearExamen,
  crearSeccion,
  getCaracteristicasById,
  getExamenById,
  getExamenByNombre,
  getExamenBySeccion,
  getExamenes,
  getSecciones,
  updateCaracteristica,
  updateExamen,
  updateRango,
  updateResultados,
  updateSeccion,
  updateSubCaracteristica,
} from "../controllers/examenesModulo.controller.js";
var router = express.Router();

//GET
router.get("/secciones", verifyToken, getSecciones);
router.get("/examenes", verifyToken, getExamenes);
router.get("/examen-id", verifyToken, getExamenById);
router.get("/examen-nombre", verifyToken, getExamenByNombre);
router.get("/examen-seccion", verifyToken, getExamenBySeccion);
router.get("/caracteristicas-id_ex", verifyToken, getCaracteristicasById);

//POST
router.post("/crear-seccion", verifyToken, crearSeccion);
router.post("/crear-examen", verifyToken, crearExamen);

//PUT
router.put("/update-seccion", verifyToken, updateSeccion);
router.put("/update-examen", verifyToken, updateExamen);
router.put("/update-caracteristica", verifyToken, updateCaracteristica);
router.put("/update-subcaracteristica", verifyToken, updateSubCaracteristica);
router.put("/update-rango", verifyToken, updateRango);
router.put("/update-resultado", verifyToken, updateResultados);

export default router;
