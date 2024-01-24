import express from "express";
import { imagen, loginController } from "../controllers/login.controller.js";
var router = express.Router();

/* POST users listing. */
router.post("/login", loginController);
router.post("/imagen", imagen);

export default router;
