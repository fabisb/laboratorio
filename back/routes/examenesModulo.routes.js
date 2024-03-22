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
router.put("/update-examen", verifyToken);

export default router;
