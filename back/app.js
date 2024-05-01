import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import indexRouter from "./routes/index.js";
import creacionRouter from "./routes/creacion.routes.js";
import examenesRouter from "./routes/examenes.routes.js";
import moduloExamenesRouter from "./routes/examenesModulo.routes.js";
import usersRouter from "./routes/users.routes.js";
import productosRouter from "./routes/producto.routes.js";
import espejoRouter from "./routes/espejo.routes.js";
import { clearCookie, verifyCookie } from "./controllers/login.controller.js";

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(
  "/inicio",
  verifyCookie,
  express.static(path.join(__dirname, "public/inicio"))
);
app.use(
  "/login",
  clearCookie,
  express.static(path.join(__dirname, "public/login"))
);
app.use(
  "/pacientes",
  clearCookie,
  express.static(path.join(__dirname, "public/pacientes"))
);
app.use("/api/", indexRouter);
app.use("/api/creacion", creacionRouter);
app.use("/api/examenes", examenesRouter);
app.use("/api/modulo-examenes", moduloExamenesRouter);
app.use("/api/users", usersRouter);
app.use("/api/espejo", espejoRouter);
app.use("/api/productos", productosRouter);
// middleware para manejar rutas que no se encuentran
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public/404.html"));
});

export default app;
