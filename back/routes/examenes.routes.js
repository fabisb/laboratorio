import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import { getBioanalistas, getPaciente,getExamenes,crearExamen } from "../controllers/examenes.controller.js";
var router = express.Router();

//GET
router.get("/get-bioanalistas", verifyToken, getBioanalistas);
router.get("/get-paciente", verifyToken, getPaciente);
router.get("/get-examenes", verifyToken,getExamenes);
//POST
router.post("/crear-examen", verifyToken,crearExamen);

export default router;
