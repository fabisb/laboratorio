import { pool } from "../database/db.js";

export const crearExamen = async (req, res) => {
  const { examen, detalle } = req.body;
  if (!examen || examen == '') {
    return await res
      .status(400)
      .json({ mensaje: "El campo nombre del examen no puede estar vacio" });
    
    }
    if (detalle.length == 0) {
      
      return await res
        .status(400)
        .json({ mensaje: "El examen no puede ser enviado sin caracteristicas" });
      
  }
  console.log("🚀 ~ crearExamen ~ req.body:", req.body);
  try {
    for await (const dato of detalle) {
      const { nombre, unidad, resultados } = dato;
      if (resultados != '' ) {
        let resultadosJson;
        try {
          
           resultadosJson = JSON.parse(resultados);
        } catch (error) {
          return await res
            .status(400)
            .json({ mensaje: "El formato de un resultado de una caracteristica es erroneo" });
          
        }
        if (
          (resultadosJson.length < 2 || resultadosJson.length > 10) &&
          resultadosJson.length != 0
        ) {
          return await res
            .status(400)
            .json({ mensaje: "Minimo deben haber 2 resultados posibles en las caracteristicas" });
        }
        console.log("🚀 ~ crearExamen ~ resultadosJson:", resultadosJson);
      }
      if (!nombre || nombre == "") {
        return await res
          .status(400)
          .json({ mensaje: "El campo nombre de alguna de las caracteristicas es vacio" });
      }
      if (!unidad || unidad == "") {
        return await res
          .status(400)
          .json({ mensaje: "El campo unidad de alguna de las caracteristicas es vacio" });
      }
    }
    const [examenInsert] = await pool.execute(
      "INSERT INTO examenes (nombre) VALUES (?)",
      [examen]
    );

    const valores = detalle
      .map((dato) => {
        return `('${examenInsert.insertId}','${dato.nombre}','${dato.inferior}','${dato.superior}','${dato.posicion}','${dato.unidad}','${dato.impsiempre}','${dato.resultados}')`;
      })
      .join(", ");
    const consulta = `INSERT INTO detalles_examen(id_ex, nombre, inferior, superior, posicion, unidad, impsiempre, resultados) VALUES ${valores}`;

    const resultados = await pool.execute(consulta);
    return await res
      .status(200)
      .json({ mensaje: "Examen ingresado con exito" });
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getBioanalistas = async (req, res) => {
  try {
    const [bioanalistas] = await pool.execute(
      'SELECT `id`, `cedula`, `nombre`, `ingreso`, `telefono`, `direccion`, `colegio`, `pre_cedula`, `status` FROM bioanalistas WHERE status = "activo"'
    );
    if (bioanalistas.length > 0) {
      return await res.status(200).json(bioanalistas);
    } else {
      return await res
        .status(400)
        .json({ mensaje: "No se han encontrado bioanalistas disponibles" });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getPaciente = async (req, res) => {
  const { cedula } = req.query;

  try {
    const [paciente] = await pool.execute(
      "SELECT * FROM pacientes WHERE cedula = ?",
      [cedula]
    );
    if (paciente.length > 0) {
      return await res.status(200).json(paciente[0]);
    } else {
      return await res
        .status(200)
        .json({ mensaje: "No se ha encontrado el paciente", paciente: 404 });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getExamenes = async (req, res) => {
  try {
    const [examenes] = await pool.execute("SELECT * FROM examenes");
    if (examenes.length > 0) {
      return await res.status(200).json(examenes);
    } else {
      return await res
        .status(400)
        .json({ mensaje: "No se han encontrado examenes" });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
