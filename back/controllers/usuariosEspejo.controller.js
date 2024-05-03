import { pool } from "../database/db.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const [usuarios] = await pool.execute("SELECT * FROM users");
    const [bioanalistas] = await pool.execute("SELECT * FROM bioanalistas");
    return await res.status(200).json({ usuarios, bioanalistas });
  } catch (error) {
    console.log("🚀 ~ getAllUsers ~ error:", error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const crearBioanalsita = async (req, res) => {
  const bioanalista = [];
  for (const clave in req.body) {
    bioanalista.push({ value: req.body[clave], name: `${clave}` });
  }

  let cedulaValidacion;

  const validacion = bioanalista.some((el) => {
    if (el.value == "") {
      console.log(`Campo ${el.name} vacio`);
      return true;
    }
    if (el.name == "telefono") {
      let validarletra = false;

      for (let i = 0; i < el.value.length; i++) {
        const c = el.value[i];
        if (c == "+") {
          if (i != 0) {
            validarletra = true;
          }
        } else {
          if (isNaN(parseInt(c))) {
            validarletra == true;
          }
        }
      }

      if (validarletra) {
        console.log(`Campo ${el.name} invalido`);
        return true;
      }
    }

    if (el.name == "cedula") {
      cedulaValidacion = el.value;
      if (el.value < 0) {
        console.log("Ingrese una cedula valida");
        return true;
      }
    }
    if (el.name == "nombre") {
      if (!isNaN(el.value)) {
        console.log("Ingrese un nombre valido");
        return true;
      }
    }
  });
  if (validacion) {
    console.log("SE HA ENCONTRADO ALGUN ERROR");
    return await res
      .status(400)
      .json({ mensaje: "Se ha encontrado algun error en los datos" });
  }
  try {
    const [cedulaExistente] = await pool.execute(
      "SELECT cedula FROM bioanalistas WHERE cedula = ?",
      [cedulaValidacion]
    );
    if (cedulaExistente.length > 0) {
      return await res.status(401).json({
        mensaje:
          "La cedula que esta intentando ingresar ya pertenece a otro bioanalista, modifique los datos del bioanalista",
      });
    }
    // Crear la consulta SQL
    const columnas = bioanalista.map((dato) => dato.name).join(", ");
    const valores = bioanalista.map((dato) => "?").join(", ");
    const consulta = `INSERT INTO bioanalistas (${columnas}) VALUES (${valores})`;

    console.log("🚀 ~ agregarBioanalistaController ~ consulta:", consulta);
    // Ejecutar la consulta
    const resultados = await pool.execute(
      consulta,
      bioanalista.map((dato) => dato.value)
    );
    return await res
      .status(200)
      .json({ mensaje: "Bioanalista registrado con exito" });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const crearUsuario = async (req, res) => {
  const {
    pre_cedula,
    cedula,
    telefono,
    nombre,
    correo,
    password,
    direccion,
    nivel,
  } = req.body;

  if (pre_cedula == "") {
    return await res.status(401).json({
      mensaje: "Ingrese una pre cedula valida",
    });
  }

  if (cedula < 0 || cedula == "") {
    return await res.status(401).json({
      mensaje: "Ingrese una cedula valida",
    });
  }

  if (isNaN(telefono) || telefono == "") {
    return await res.status(401).json({
      mensaje: "Ingrese un telefono valido",
    });
  }

  if (!isNaN(nombre) || nombre == "") {
    return await res.status(401).json({
      mensaje: "Ingrese un nombre valido",
    });
  }

  if (correo.split("@")[0] == "" || correo.split("@")[1] == "") {
    return await res.status(401).json({
      mensaje: "Ingrese un correo valido",
    });
  }
  if (!correo.split("@")[1].split(".")[1].includes("com")) {
    return await res.status(401).json({
      mensaje: "Ingrese un correo valido",
    });
  }
  if (password == "") {
    return await res.status(401).json({
      mensaje: "Ingrese una clave valida",
    });
  }

  if (direccion == "") {
    return await res.status(401).json({
      mensaje: "Ingrese una direccion valida",
    });
  }
  if (nivel != "1" && nivel != "2" && nivel != "3") {
    return await res.status(401).json({
      mensaje: "Nivel de usuario no valido",
    });
  }
  const usuario = [];
  for (const clave in req.body) {
    if (clave != 'password') {
      usuario.push({ value: req.body[clave], name: `${clave}` });
    }
  }
  try {
    const [cedulaExistente] = await pool.execute(
      "SELECT cedula FROM users WHERE cedula = ?",
      [cedula]
    );
    if (cedulaExistente.length > 0) {
      return await res.status(401).json({
        mensaje:
          "La cedula que esta intentando ingresar ya pertenece a otro usuario, modifique los datos del usuario",
      });
    }
    let claveEncriptada = "";
    try {
      claveEncriptada = await bcrypt.hash(password, 2);
    } catch (error) {
      console.log(error);
    }
    if (claveEncriptada == "") {
      return await res
        .status(500)
        .json({ mensaje: "ERROR DE SERVIDOR AL ENCRIPTAR CONTRASEÑA" });
    } else {
      usuario.push({ value: claveEncriptada, name: "password" });
      // Crear la consulta SQL
      const columnas = usuario.map((dato) => dato.name).join(", ");
      const valores = usuario.map((dato) => "?").join(", ");
      const consulta = `INSERT INTO users (${columnas}) VALUES (${valores})`;

      console.log("🚀 ~ crearUsuario ~ consulta:", consulta);
      // Ejecutar la consulta
      const [resultados] = await pool.execute(
        consulta,
        usuario.map((dato) => dato.value)
      );
      return await res
        .status(200)
        .json({ mensaje: "Usuario registrado con exito" });
    }
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};
