import express from "express";
import { verifyToken } from "../controllers/login.controller.js";
import { getBioanalistas, getPaciente } from "../controllers/examenes.controller.js";
var router = express.Router();

//GET
router.get("/get-bioanalistas", verifyToken, getBioanalistas);
router.get("/get-paciente", verifyToken, getPaciente);


export default router;
