import { pool } from "../database/db.js";
import moment from "moment";
import bcrypt from "bcrypt";
export const buscarUsuarios = async (req, res) => {
  try {
    const [usuarios] = await pool.execute("SELECT * FROM users");
    const [bioanalistas] = await pool.execute("SELECT * FROM bioanalistas");
    return await res.status(200).json({ usuarios, bioanalistas });
  } catch (error) {
    console.log("🚀 ~ getAllUsers ~ error:", error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const cambiarStatus = async (req, res) => {
  const { status, tipo, id } = req.body;
  if (id < 0 || id == "" || !id)
    return await res
      .status(400)
      .json({ mensaje: "El id enviado no es correcto" });

  if (status != "activo" && status != "inactivo")
    return await res.status(400).json({ mensaje: "Error en status" });

  if (tipo != "auxiliar" && tipo != "bioanalista" && tipo != 'administrador')
    return await res.status(400).json({ mensaje: "Error en tipo" });

  try {

    const [userStatus] = await pool.execute(
      "UPDATE users SET status = ? WHERE id = ?",
      [status, id]
    );

    return await res
      .status(200)
      .json({ mensaje: "Status modificado con exito" });
  } catch (error) {
    console.log("🚀 ~ cambiarStatus ~ error:", error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const buscarBioanalista = async (req, res) => {
  const { cedula, pre_cedula } = req.query;
  try {
    if (cedula < 0 || cedula == "" || !cedula) {
      return await res
        .status(400)
        .json({ mensaje: "La cedula ingresado no es correcto" });
    }
    if (pre_cedula == "" || !pre_cedula) {
      return await res
        .status(400)
        .json({ mensaje: "La pre_cedula ingresado no es correcto" });
    }
    const [bio] = await pool.execute(
      "SELECT id, cedula, nombre, ingreso, telefono, direccion, colegio, ministerio, pre_cedula, status FROM bioanalistas WHERE cedula = ? AND pre_cedula = ?",
      [cedula, pre_cedula]
    );
    if (bio.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se ha encontrado un bioanalista con esa cedula" });
    } else {
      return await res.status(200).json(bio[0]);
    }
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const buscarUsuario = async (req, res) => {
  const { cedula, pre_cedula } = req.query;
  try {
    if (cedula < 0 || cedula == "" || !cedula) {
      return await res
        .status(400)
        .json({ mensaje: "La cedula ingresado no es correcto" });
    }
    if (pre_cedula == "" || !pre_cedula) {
      return await res
        .status(400)
        .json({ mensaje: "La pre_cedula ingresado no es correcto" });
    }
    const [user] = await pool.execute(
      "SELECT * FROM users WHERE cedula = ? AND pre_cedula = ?",
      [cedula, pre_cedula]
    );
    if (user.length == 0) {
      const [bio] = await pool.execute(
        "SELECT id, cedula, nombre, ingreso, telefono, direccion, colegio, ministerio, pre_cedula, status FROM bioanalistas WHERE cedula = ? AND pre_cedula = ?",
        [cedula, pre_cedula]
      );
      if (bio.length == 0) {
        return await res
          .status(404)
          .json({ mensaje: "No se encontró a usuario con esa cedula" });
      } else {
        return await res.status(200).json(bio[0]);
      }
    } else {
      return await res.status(200).json(user[0]);
    }
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const editarBioanalista = async (req, res) => {
  const {
    id,
    nombre,
    telefono,
    colegio,
    ministerio,
    direccion,
    firma,
  } = req.body;
  if (id < 0 || id == "" || !id) {
    return await res
      .status(400)
      .json({ mensaje: "El id ingresado no es correcto" });
  }
  if (
    nombre == "" ||
    telefono == "" ||
    colegio == "" ||
    ministerio == ""
  ) {
    return await res.status(400).json({ mensaje: "Algun dato no es valido" });
  }
  try {
    const [user] = await pool.execute(
      "SELECT * FROM bioanalistas WHERE id = ?",
      [id]
    );
    if (user.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "El usuario que intenta editar no existe" });
    } else {
      if (firma != '') {

        const [bioUpdate] = await pool.execute(
          "UPDATE bioanalistas SET nombre = ?, telefono = ?, direccion = ?, colegio = ?, ministerio = ?, foto_firma = ? WHERE id = ?",
          [
            nombre,
            telefono,
            direccion,
            colegio,
            ministerio,
            firma !== "" ? firma : null,
            id,
          ]
        );
      } else {
        const [bioUpdate] = await pool.execute(
          "UPDATE bioanalistas SET nombre = ?, telefono = ?, direccion = ?, colegio = ?, ministerio = ? WHERE id = ?",
          [
            nombre,
            telefono,
            direccion,
            colegio,
            ministerio,
            id,
          ]
        );
      }
      return await res
        .status(200)
        .json({ mensaje: "Bioanalista modificado correctamente" });
    }
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const editarUsuario = async (req, res) => {
  const { id, nombre, correo, telefono, direccion, nivel, password } = req.body;
  try {
    if (id < 0 || id == "" || !id) {
      return await res
        .status(400)
        .json({ mensaje: "El id ingresado no es correcto" });
    }
    if (nombre == "" || telefono == "" || nivel == "") {
      return await res.status(400).json({ mensaje: "Algun dato no es valido" });
    }

    const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    if (user.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "El usuario que intenta editar no existe" });
    }
    if (password != '') {
      let claveEncriptada = "";
      claveEncriptada = await bcrypt.hash(password, 2);

      const [userUpdate] = await pool.execute(
        "UPDATE users SET password = ?, nombre = ?, correo = ?, telefono = ?, direccion = ?, nivel = ? WHERE id = ?",
        [claveEncriptada, nombre, correo, telefono, direccion, nivel, id]
      );
      return await res
        .status(200)
        .json({ mensaje: "Usuario modificado correctamente" });
    } else {


      const [userUpdate] = await pool.execute(
        "UPDATE users SET nombre = ?, correo = ?, telefono = ?, direccion = ?, nivel = ? WHERE id = ?",
        [nombre, correo, telefono, direccion, nivel, id]
      );
      return await res
        .status(200)
        .json({ mensaje: "Usuario modificado correctamente" });
    }


  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const agregarPacienteController = async (req, res) => {
  const { paciente, idPaciente } = req.body;
  let cedulaValidacion;
  let preCedulaVal = "",
    nombreVal = "";

  const validacion = paciente.some((el) => {
    if (el.value == "") {
      if (el.name != "genero") {
        return true;
      }
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
        return true;
      }
    }

    if (el.name == "cedula") {
      cedulaValidacion = el.value;
      if (el.value < 0) {
        return true;
      }
    }
    if (el.name == "nombre") {
      nombreVal = el.value;
      if (!isNaN(el.value)) {
        return true;
      }
    }
    if (el.name == "correo") {
      if (el.value.split("@")[0] == "" || el.value.split("@")[1] == "") {
        return true;
      }
      if (!el.value.split("@")[1].split(".")[1].includes("com")) {
        return true;
      }
    }
    if (el.name == "fecha_nacimiento") {
      if (moment(el.value).isAfter(moment().format("YYYY-MM-DD"))) {
        return true;
      }
    }
    if (el.name == "pre_cedula") {
      if (el.value != "E" && el.value != "V" && el.value != "N") {
        return true;
      } else {
        preCedulaVal = el.value;
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
    if (req.body.new) {
      const [cedulaExistente] = await pool.execute(
        "SELECT cedula FROM pacientes WHERE cedula = ? AND pre_cedula = ? AND nombre = ?",
        [cedulaValidacion, preCedulaVal, nombreVal]
      );

      if (cedulaExistente.length > 0) {
        return await res.status(401).json({
          mensaje:
            "La cedula que esta intentando ingresar ya pertenece a otro usuario, modifique los datos de la cedula",
        });
      }
      const columnas = paciente.map((dato) => dato.name).join(", ");
      const valores = paciente.map((dato) => "?").join(", ");
      const consulta = `INSERT INTO pacientes (${columnas}) VALUES (${valores})`;

      // Ejecutar la consulta
      const resultados = await pool.execute(
        consulta,
        paciente.map((dato) => dato.value)
      );
      return await res
        .status(200)
        .json({ mensaje: "Paciente registrado con exito" });
    } else {
      const [cedulaExistente] = await pool.execute(
        "SELECT cedula FROM pacientes WHERE cedula = ? AND pre_cedula = ? AND id = ?",
        [cedulaValidacion, preCedulaVal, idPaciente]
      );

      if (cedulaExistente.length == 0) {
        return await res.status(401).json({
          mensaje:
            "La cedula que esta intentando modificar no coincide con el id",
        });
      }
      const valores = paciente
        .map((dato) => `${dato.name} = '${dato.value}'`)
        .join(", ");

      const consulta = `UPDATE pacientes SET ${valores} WHERE cedula = ? AND pre_cedula = ? AND id = ?`;

      // Ejecutar la consulta
      const resultados = await pool.execute(consulta, [
        cedulaValidacion,
        preCedulaVal,
        idPaciente,
      ]);
      return await res
        .status(200)
        .json({ mensaje: "Paciente modificado con exito" });
    }
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
  let cedulaValidacion;

  const validacion = paciente.some((el) => {
    if (el.value == "") {
      if (el.name == "firma" || el.name == "direccion") {
      } else {
        return true;
      }
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
        return true;
      }
    }

    if (el.name == "cedula") {
      cedulaValidacion = el.value;
      if (el.value < 0) {
        return true;
      }
    }
    if (el.name == "nombre") {
      if (!isNaN(el.value)) {
        return true;
      }
    }

    if (el.name == "ingreso") {
      if (moment(el.value).isAfter(moment().format("YYYY-MM-DD"))) {
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
    const columnas = paciente.map((dato) => dato.name).join(", ");
    const valores = paciente.map((dato) => "?").join(", ");
    const consulta = `INSERT INTO bioanalistas (${columnas}) VALUES (${valores})`;

    // Ejecutar la consulta
    const resultados = await pool.execute(
      consulta,
      paciente.map((dato) => dato.value)
    );
    return await res
      .status(200)
      .json({ mensaje: "Bioanalista registrado con exito" });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const crearBioanalista = async (req, res) => {
  const bioanalista = [];
  for (const clave in req.body) {
    bioanalista.push({ value: req.body[clave], name: `${clave}` });
  }

  let cedulaValidacion;

  const validacion = bioanalista.some((el) => {
    if (el.value == "") {
      if (el.name == "firma" || el.name == "direccion") {
      } else {
        return true;
      }
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
        return true;
      }
    }

    if (el.name == "cedula") {
      cedulaValidacion = el.value;
      if (el.value < 0) {
        return true;
      }
    }
    if (el.name == "nombre") {
      if (!isNaN(el.value)) {
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


  if (password == "") {
    return await res.status(401).json({
      mensaje: "Ingrese una clave valida",
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


export const agregarUsuarioController = async (req, res) => {
  const { usuario, clave, nivel } = req.body;
  if (!clave || !nivel || nivel == "" || clave == "") {
    return await res
      .status(400)
      .json({ mensaje: "Se ha encontrado algun error en los datos" });
  }
  let cedulaValidacion;
  const validacion = usuario.some((el) => {
    if (el.value == "") {
      if (el.name == "firma" || el.name == "direccion") {
      } else {
        return true;
      }
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
        return true;
      }
    }

    if (el.name == "cedula") {
      cedulaValidacion = el.value;
      if (el.value < 0) {
        return true;
      }
    }
    if (el.name == "nombre") {
      if (!isNaN(el.value)) {
        return true;
      }
    }

    if (el.name == "ingreso") {
      if (moment(el.value).isAfter(moment().format("YYYY-MM-DD"))) {
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
      "SELECT cedula FROM users WHERE cedula = ?",
      [cedulaValidacion]
    );
    if (cedulaExistente.length > 0) {
      return await res.status(401).json({
        mensaje:
          "La cedula que esta intentando ingresar ya pertenece a otro usuario, modifique los datos del usuario",
      });
    }
    let claveEncriptada = "";
    try {
      claveEncriptada = await bcrypt.hash(clave, 2);
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

/* export const getHijosController = async (req,res)=>{
  console.log('getHijosController')
  const {cedula, hijo} = req.query;
  console.log("🚀 ~ getHijosController ~ cedula:", cedula)
  console.log("🚀 ~ getHijosController ~ hijo:", hijo)
  try {
  if (!cedula || isNaN(cedula) || cedula == '') {
    return await res
      .status(400)
      .json({ mensaje: "La cedula no es valida" });
  }
  const [rep] = await pool.execute('SELECT * FROM pacientes WHERE cedula = ?',[cedula ]);
  if (rep.length == 0) {
    return await res
    .status(403)
    .json({ mensaje: "El representante no esta registrado" });
  }
  if (!hijo || hijo == '') {
    return await res
      .status(400)
      .json({ mensaje: "El campo hijo no es valido" });
  }
  const hijosMay= hijo.toUpperCase()
    const [hijos] = await pool.execute('SELECT * FROM pacientes WHERE cedula = ? AND pre_cedula = "N"',[cedula ]);
    const hijoFilter = hijos.filter(hijo => {
      if (hijo.hijo) {
        
       return returnhijo.hijo.toUpperCase() == hijosMay
      }
      })
      
    console.log("🚀 ~ getHijosController ~ hijoFilter:", hijoFilter)
    if (hijoFilter.length > 0) {
      return await res
      .status(200)
      .json({hijos:hijoFilter, rep});
      
    }else{

      return await res
      .status(200)
      .json({hijos,rep});
    }
  } catch (error) {
    console.log(error)
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });

  }
} */

export const getHijosController = async (req, res) => {
  const { cedula } = req.query;
  try {
    if (!cedula || isNaN(cedula) || cedula == "") {
      return await res.status(400).json({ mensaje: "La cedula no es valida" });
    }
    const [rep] = await pool.execute(
      "SELECT * FROM pacientes WHERE cedula = ? AND pre_cedula != 'N'",
      [cedula]
    );
    if (rep.length == 0) {
      return await res
        .status(403)
        .json({ mensaje: "El representante no esta registrado" });
    }

    const [hijos] = await pool.execute(
      'SELECT * FROM pacientes WHERE cedula = ? AND pre_cedula = "N"',
      [cedula]
    );

    return await res.status(200).json({ hijos, rep });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};
