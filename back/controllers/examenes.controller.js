import { pool } from "../database/db.js";

export const getExamen = async (req, res) => {
  const { id } = req.body;
  try {
    const resultados = await pool.execute(
      `SELECT * FROM examenes where id = ${id}`
    );
    const resultadosDetalle = await pool.execute(
      `SELECT * FROM detalles_examen where id_ex = ${id} AND status = ?`,['activo']
    );
    return await res
      .status(200)
      .json({ examen: resultados, detalle: resultadosDetalle });
  } catch (error) {
    return await res
      .status(400)
      .json({ mensaje: "ha ocurrido un error el servidor" });
  }
};

export const modificarExamen = async (req, res) => {
  const { examen, detalle, idExamen } = req.body;
  console.log("🚀 ~ modificarExamen ~ idExamen:", idExamen)
  if (!examen || examen == "") {
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
      const { nombre, unidad, resultados, idDetalleBdd } = dato;
      console.log("🚀 ~ forawait ~ resultados:", resultados)

      if (resultados != '') {
        
        
        if ((resultados.split("~").length == 0)) {
        return await res
          .status(400)
          .json({
            mensaje:
              "El formato de un resultado de una caracteristica es erroneo",
          });
      }
      if (
        (resultados.split("~").length < 2 ||
          resultados.split("~").length > 10) &&
        resultados.split("~").length != 0
      ) {
        return await res
        .status(400)
        .json({
          mensaje:
          "Minimo deben haber 2 resultados posibles en las caracteristicas",
        });
      }
      
    }
    
      if (!nombre || nombre == "") {
        return await res
          .status(400)
          .json({
            mensaje:
              "El campo nombre de alguna de las caracteristicas es vacio",
          });
      }
      if (!unidad || unidad == "") {
        return await res
          .status(400)
          .json({
            mensaje:
              "El campo unidad de alguna de las caracteristicas es vacio",
          });
      }
    }

    const [detallesExistentes] = await pool.execute('SELECT * FROM detalles_examen WHERE id_ex = ? AND status = "activo"',[idExamen]);

    const idsDetalle = detalle.map(e=>e.idDetalleBdd)
    const idsDetalleEx = detallesExistentes.map(e=>e.id)
    console.log(idsDetalle)
    const detalleDelete =idsDetalleEx.filter(det => {
      
      return !(idsDetalle.includes(det))
    
    })

    await pool.query('UPDATE detalles_examen SET status = "inactivo" WHERE id IN (?)',[detalleDelete])

    const [examenUpdate] = await pool.execute(
      "UPDATE examenes SET nombre = ? WHERE id = ?",
      [examen, idExamen]
    );

    await Promise.all(
      await detalle.map(async (dato) => {
        await pool.execute(
          "UPDATE detalles_examen SET nombre = ?, inferior = ?, superior = ?, posicion = ?, unidad = ?, impsiempre = ?, resultados = ? WHERE id = ? AND status = 'activo'",
          [
            dato.nombre,
            dato.inferior,
            dato.superior,
            dato.posicion,
            dato.unidad,
            dato.impsiempre,
            dato.resultados ? dato.resultados : null,
            dato.idDetalleBdd
          ]
        );
      })
    );

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
export const crearExamen = async (req, res) => {
  const { examen, detalle } = req.body;
  if (!examen || examen == "") {
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
      if (resultados != '') {
        
        if ((resultados.split("~").length == 0)) {
          return await res
          .status(400)
          .json({
            mensaje:
              "El formato de un resultado de una caracteristica es erroneo",
          });
        }
      if (
        (resultados.split("~").length < 2 ||
          resultados.split("~").length > 10) &&
        resultados.split("~").length != 0
        ) {
          return await res
          .status(400)
          .json({
            mensaje:
            "Minimo deben haber 2 resultados posibles en las caracteristicas",
          });
        }
      }

      if (!nombre || nombre == "") {
        return await res
          .status(400)
          .json({
            mensaje:
              "El campo nombre de alguna de las caracteristicas es vacio",
          });
      }
      if (!unidad || unidad == "") {
        return await res
          .status(400)
          .json({
            mensaje:
              "El campo unidad de alguna de las caracteristicas es vacio",
          });
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
    console.log(consulta);
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
