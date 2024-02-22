import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import { getBioanalistas, getPaciente,getExamenes,crearExamen,modificarExamen,getExamen } from "../controllers/examenes.controller.js";
var router = express.Router();

//GET
router.get("/get-bioanalistas", verifyToken, getBioanalistas);
router.get("/get-paciente", verifyToken, getPaciente);
router.get("/get-examenes", verifyToken,getExamenes);
router.post("/get-examen",getExamen);


//POST
router.post("/crear-examen", verifyToken,crearExamen);

//PUT

router.put("/modificar-examen", verifyToken,modificarExamen);


export default router;
