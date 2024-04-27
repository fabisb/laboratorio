import { pool } from "../database/db.js";
import moment from "moment";
import bcrypt from "bcrypt";

export const buscarUsuario = async (req,res)=>{
  const { id } = req.query;
  if(id<0 || id=="" || !id){
    return await res.status(400).json({mensaje:"El id ingresado no es correcto"})
      
    }
}
export const editarUsuario = async  (req, res) => {
  const {  id } = req.body;

}

export const agregarPacienteController = async (req, res) => {
  const { paciente, idPaciente } = req.body;
  console.log("🚀 ~ agregarPacienteController ~ idPaciente:", idPaciente)
  console.log("🚀 ~ agregarPacienteController ~ paciente:", paciente);
  let cedulaValidacion;
  let preCedulaVal = '', nombreVal = ''

  const validacion = paciente.some((el) => {
    if (el.value == "") {
      if (el.name != "genero") {
        console.log(`Campo ${el.name} vacio`);
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
      nombreVal = el.value
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
    if (el.name == "pre_cedula") {
      if (el.value  != 'E' && el.value  != 'V' && el.value  != 'N') {
        console.log('Ingrese pre Cedula Valida')
        return true;
        
      }else{

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
    console.log("CEDULA VALIDAICION:", cedulaValidacion);
    // Crear la consulta SQL
    if (req.body.new) {
      const [cedulaExistente] = await pool.execute(
        "SELECT cedula FROM pacientes WHERE cedula = ? AND pre_cedula = ? AND nombre = ?",
        [cedulaValidacion,preCedulaVal,nombreVal]
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

      console.log("🚀 ~ agregarPacienteController ~ consulta:", consulta);
      // Ejecutar la consulta
      const resultados = await pool.execute(
        consulta,
        paciente.map((dato) => dato.value)
      );
      return await res
        .status(200)
        .json({ mensaje: "Paciente registrado con exito" });
    } else {
      console.log('EDITANDO')
      const [cedulaExistente] = await pool.execute(
        "SELECT cedula FROM pacientes WHERE cedula = ? AND pre_cedula = ? AND id = ?",
        [cedulaValidacion,preCedulaVal, idPaciente]
      );
      console.log("🚀 ~ agregarPacienteController ~ cedulaExistente:", cedulaExistente)
      if ((cedulaExistente.length == 0)) {
        return await res.status(401).json({
          mensaje:
            "La cedula que esta intentando modificar no coincide con el id",
        });
      }
      const valores = paciente
        .map((dato) => `${dato.name} = '${dato.value}'`)
        .join(", ");
      console.log("modificando");
      console.log("🚀 ~ agregarPacienteController ~ valores:", valores);

      const consulta = `UPDATE pacientes SET ${valores} WHERE cedula = ? AND pre_cedula = ? AND id = ?`;

      console.log("🚀 ~ agregarPacienteController ~ consulta:", consulta);
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
  console.log("🚀 ~ agregarBioanalistaController ~ paciente:", paciente);
  let cedulaValidacion;

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

    console.log("🚀 ~ agregarBioanalistaController ~ consulta:", consulta);
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
  console.log("getHijosControllerExamnes");
  const { cedula } = req.query;
  console.log("🚀 ~ getHijosController ~ cedula:", cedula);
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
