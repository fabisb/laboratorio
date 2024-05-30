import express from "express";
import { adminBioToken, administradorToken, verifyToken } from "../controllers/login.controller.js";
import {
  getUsers
} from "../controllers/estadisticas.controller.js";
var router = express.Router();



router.get("/get-users", verifyToken, getUsers);//TODOS

export default router;
