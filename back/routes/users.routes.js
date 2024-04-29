import express from "express";
import {
  imagen,
  loginController,
  loginEspejo,
  verifyToken,
} from "../controllers/login.controller.js";
import { getHijosController } from "../controllers/creacion.controller.js";
import { syncFiles } from "../controllers/imagenesController.js";
var router = express.Router();

/* POST users listing. */
router.post("/login", loginController);
router.post("/espejo-login", loginEspejo);
router.post("/imagen", imagen);

/* GET users listing. */
//router.get("/hijos",verifyToken, getHijosController);
router.get("/get-hijos", verifyToken, getHijosController);
router.get("/firma", verifyToken, syncFiles);

export default router;
