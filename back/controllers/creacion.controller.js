import { pool } from "../database/db.js";
import moment from "moment";

export const agregarPacienteController = async (req, res) => {
  const { paciente } = req.body;
  console.log("🚀 ~ agregarPacienteController ~ paciente:", paciente);
  const validacion = paciente.some((el) => {
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
    if (el.name == "correo") {
      if (el.value.split("@")[0] == "" || el.value.split("@")[1] == "") {
        console.log("Ingrese un correo valido");
        return true;
      }
      if (!el.value.split("@")[1].split(".")[1].includes("com")) {
        console.log("Ingrese un correo valido");
        return true;
      }
    }
    if (el.name == "fecha_nacimiento") {
      if (moment(el.value).isAfter(moment().format("YYYY-MM-DD"))) {
        console.log("Ingrese una fecha valida");
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
    // Crear la consulta SQL
    const columnas = paciente.map((dato) => dato.name).join(", ");
    const valores = paciente.map((dato) => "?").join(", ");
    const consulta = `INSERT INTO pacientes (${columnas}) VALUES (${valores})`;

    console.log("🚀 ~ agregarPacienteController ~ consulta:", consulta);
    // Ejecutar la consulta
    const resultados = await pool.execute(
      consulta,
      paciente.map((dato) => dato.value)
    );
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const agregarBioanalistaController = async (req, res) => {
  const { paciente, firma } = req.body;
  if (firma !== "") {
    paciente.push({ value: firma, name: "foto_firma" });
  } else {
    paciente.push({ value: null, name: "foto_firma" });
  }
  console.log("🚀 ~ agregarBioanalistaController ~ paciente:", paciente);
  const validacion = paciente.some((el) => {
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

    if (el.name == "ingreso") {
      if (moment(el.value).isAfter(moment().format("YYYY-MM-DD"))) {
        console.log("Ingrese una fecha valida");
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
    // Crear la consulta SQL
    const columnas = paciente.map((dato) => dato.name).join(", ");
    const valores = paciente.map((dato) => "?").join(", ");
    const consulta = `INSERT INTO bioanalistas (${columnas}) VALUES (${valores})`;

    console.log("🚀 ~ agregarBioanalistaController ~ consulta:", consulta);
    // Ejecutar la consulta
    const resultados = await pool.execute(
      consulta,
      paciente.map((dato) => dato.value)
    );
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};
