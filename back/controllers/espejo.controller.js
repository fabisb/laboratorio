import e from "express";
import { pool } from "../database/db.js";

export const getExamenesPacientes = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  let examenes = [];
  try {
    const [examenes2] = await pool.execute(
      `SELECT * FROM examenes_paciente WHERE id_pac = '${id}'`
    );
    const [bioanalista] = await pool.execute(
      `SELECT * FROM bioanalistas WHERE id = '${examenes2[0].id_bio}'`
    );
    for await (const ex of examenes2) {
      const [infoExamen] = await pool.execute(
        `SELECT * FROM examenes where id =?`,
        [ex.id_ex]
      );
      const [seccion] = await pool.execute(
        `SELECT * FROM seccion_examen WHERE id = ?`,
        [infoExamen[0].id_seccion]
      );

      const [detalles] = await pool.execute(
        `SELECT * FROM detalles_examenes_paciente where id_ex_pac= ?`,
        [ex.id]
      );
      let detalles2 = detalles;
      let caracteristicas = [];
      for await (const dt of detalles2) {
        const [detalleInfo] = await pool.execute(
          `SELECT * FROM detalles_examen WHERE id = '${dt.id_dt}'`
        );
        console.log(detalleInfo);
        const [subCar] = await pool.execute(
          `SELECT * FROM detalle_subcaracteristica_paciente where id_det_ex = '${dt.id}'`
        );
        let subCaracteristicas = [];
        for await (const sb of subCar) {
          const [subCaInfo] = await pool.execute(
            `SELECT * FROM subcaracteristicas_detalle WHERE id=${sb.id_detalle_sub}`
          );
          subCaracteristicas.push({
            idSub: subCaInfo[0].id,
            nombreSub: subCaInfo[0].nombre,
            resultado: sb.resultado,
            idCar: dt.id_dt,
            nota: sb.nota,
            tipo: subCaInfo[0].tipo,
          });
        }

        caracteristicas.push({
          nombre: detalleInfo[0].nombre,
          resultado: dt.resultado,
          nota: dt.nota,
          unidad: detalleInfo[0].unidad,
          inferior: dt.inferior,
          superior: dt.superior,
          imprimir: detalleInfo[0].impsiempre,
          subCaracteristicas,
        });
      }

      examenes.push({
        id: ex.id,
        examen: infoExamen[0].nombre,
        nombreSeccion: seccion[0].nombre,
        bioanalista: bioanalista[0].nombre,
        caracteristicas,
        fecha: ex.fecha,
      });
    }

    res.status(200).json({ examenes });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPacientesDia = async (req, res) => {
  try {
    let [fecha1] = await pool.execute(`SELECT CURRENT_DATE`);
    console.log(fecha1[0].CURRENT_DATE);
    let fecha = fecha1[0].CURRENT_DATE;
    fecha = fecha.toJSON();
    fecha = fecha.split("T")[0];

    let examenDia = [];
    const [exPacientes] = await pool.execute(
      `SELECT DISTINCT (id_pac) FROM examenes_paciente WHERE fecha between '${fecha} 00:00:01' AND '${fecha} 23:59:59'`
    );
    let pacientes = [];

    for await (const p of exPacientes) {
      const [paciente] = await pool.execute(
        `SELECT * FROM pacientes where id = '${p.id_pac}'`
      );
      pacientes.push(paciente[0]);
    }

    const [pacientesTabla] = await pool.execute(`select * FROM pacientes`);
    await res.status(200).json({ pacientes, pacientesTabla });
  } catch (error) {
    console.log(error);
  }
};

export const getExamenDia = async (req, res) => {
  try {
    let [fecha1] = await pool.execute(`SELECT CURRENT_DATE`);
    console.log(fecha1[0].CURRENT_DATE);
    let fecha = fecha1[0].CURRENT_DATE;
    fecha = fecha.toJSON();
    fecha = fecha.split("T")[0];

    let examenDia = [];
    const [examenes] = await pool.execute(
      `SELECT * FROM examenes_paciente WHERE fecha between '${fecha} 00:00:01' AND '${fecha} 23:59:59'`
    );
    for await (const ex of examenes) {
      const [examen] = await pool.execute(
        `SELECT * FROM examenes where id = ?`,
        [ex.id_ex]
      );
      const [paciente] = await pool.execute(
        `SELECT * FROM pacientes WHERE id = ?`,
        [ex.id_pac]
      );
      const [bioanalista] = await pool.execute(
        `SELECT * FROM bioanalistas WHERE id = ?`,
        [ex.id_bio]
      );
      const [orden] = await pool.execute(`SELECT * FROM ordenes WHERE id = ?`, [
        ex.id_orden,
      ]);
      console.log(ex);
      let hora = ex.fecha.toJSON().split("T")[1].split(".")[0];
      examenDia.push({
        id: ex.id,
        cedula: paciente[0].cedula,
        paciente: paciente[0].nombre,
        bioanalista: bioanalista[0].nombre,
        examen: examen[0].nombre,
        status_ws: orden[0].status_ws,
        status_imp: orden[0].status_imp,
        status_correo: orden[0].status_correo,
        hora,
      });
    }
    res.status(200).json({ examenes: examenDia });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const updateSede = async (req, res) => {
  const { id_sede, nombre } = req.body;

  if (!id_sede || id_sede < 0 || isNaN(id_sede)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la sede enviado no es valido" });
  }
  if (!nombre || nombre == "") {
    return await res
      .status(400)
      .json({ mensaje: "El nombre a ingresar no es valido" });
  }
  try {
    const [existenteName] = await pool.execute(
      "SELECT * FROM sede where nombre = ?",
      [nombre]
    );
    if (existenteName.length > 0) {
      return await res.status(200).json({
        mensaje: `La seccion no se ha podido ingresar por duplicidad en el nombre`,
      });
    }
    const [existente] = await pool.execute("SELECT * FROM sede where id = ?", [
      id_sede,
    ]);
    if (existente.length > 0) {
      await pool.execute("UPDATE sede SET nombre = ? WHERE id = ?", [
        nombre,
        id_sede,
      ]);
      return await res.status(200).json({
        mensaje: `La sede #${id_sede} ha sido modificado correctamente`,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id de la sede no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateSeccion ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const updateEmpresa = async (req, res) => {
  const { id, nombre } = req.body;

  if (!id || id < 0 || isNaN(id)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la empresa enviado no es valido" });
  }
  if (!nombre || nombre == "") {
    return await res
      .status(400)
      .json({ mensaje: "El nombre a ingresar no es valido" });
  }
  try {
    const [existenteName] = await pool.execute(
      "SELECT * FROM empresas where nombre = ?",
      [nombre]
    );
    if (existenteName.length > 0) {
      return await res.status(200).json({
        mensaje: `La seccion no se ha podido ingresar por duplicidad en el nombre`,
      });
    }
    const [existente] = await pool.execute(
      "SELECT * FROM empresas where id = ?",
      [id]
    );
    if (existente.length > 0) {
      await pool.execute("UPDATE empresas SET nombre = ? WHERE id = ?", [
        nombre,
        id,
      ]);
      return await res.status(200).json({
        mensaje: `La empresa #${id} ha sido modificado correctamente`,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id de la empresa no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateSeccion ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const updateLaboratorio = async (req, res) => {
  const { id_laboratorio, razon, direccion, telefono, rif } = req.body;

  if (!id_laboratorio || id_laboratorio < 0 || isNaN(id_laboratorio)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del laboratorio enviado no es valido" });
  }
  if (!razon || razon == "") {
    return await res
      .status(400)
      .json({ mensaje: "El nombre a ingresar no es valido" });
  }
  try {
    const [nombreExistente] = await pool.execute(
      "SELECT razon_social FROM laboratorios_externos WHERE razon_social = ? AND id != ? ",
      [razon, id_laboratorio]
    );
    const [rifExistente] = await pool.execute(
      "SELECT rif FROM laboratorios_externos WHERE rif = ? AND id != ?",
      [rif, id_laboratorio]
    );

    if (nombreExistente.length > 0 || rifExistente.length > 0) {
      return await res.status(400).json({
        mensaje:
          "El nombre/rif que intenta agregar para este laboratorio ya existe",
      });
    } else {
      const [categoria] = await pool.execute(
        "UPDATE laboratorios_externos set razon_social = ?, direccion = ?, rif = ?, telefono =? where id = ?",
        [razon, direccion, rif, telefono, id_laboratorio]
      );
      return await res.status(200).json({
        mensaje: "Laboratorio insertado correctamente",
        laboratorioId: categoria.insertId,
      });
    }
  } catch (error) {
    console.log("🚀 ~ updateSeccion ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const crearSede = async (req, res) => {
  const { nombre, clave } = req.body;
  try {
    if (!nombre || nombre == "" || !clave || clave == "" || isNaN(clave)) {
      return await res
        .status(400)
        .json({ mensaje: "Ingrese un nombre o una clave valida" });
    }
    const [nombreExistente] = await pool.execute(
      "SELECT nombre FROM sede WHERE nombre = ?",
      [nombre]
    );
    if (nombreExistente.length > 0) {
      return await res.status(400).json({
        mensaje: "El nombre que intenta agregar para esta sede ya existe",
      });
    } else {
      const [sede] = await pool.execute(
        "INSERT INTO sede (nombre, clave) VALUES (?, ?)",
        [nombre, clave]
      );
      return await res.status(200).json({
        mensaje: "Sede insertada correctamente",
        seccionId: sede.insertId,
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const crearEmpresa = async (req, res) => {
  const { nombre } = req.body;
  try {
    if (!nombre || nombre == "") {
      return await res
        .status(400)
        .json({ mensaje: "Ingrese un nombre valido" });
    }
    const [nombreExistente] = await pool.execute(
      "SELECT nombre FROM empresas WHERE nombre = ?",
      [nombre]
    );
    if (nombreExistente.length > 0) {
      return await res.status(400).json({
        mensaje: "El nombre que intenta agregar para esta empresa ya existe",
      });
    } else {
      const [empresa] = await pool.execute(
        "INSERT INTO empresas (nombre) VALUES (?)",
        [nombre]
      );
      return await res.status(200).json({
        mensaje: "Empresa insertada correctamente",
        seccionId: empresa.insertId,
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const crearLaboratorio = async (req, res) => {
  const { rif, razon, direccion, telefono } = req.body;
  try {
    if (!rif || rif == "" || rif < 0) {
      return await res.status(400).json({ mensaje: "Ingrese un rif valido" });
    }
    if (!razon || razon == "") {
      return await res
        .status(400)
        .json({ mensaje: "Ingrese un nommbre valido" });
    }

    const [nombreExistente] = await pool.execute(
      "SELECT razon_social FROM laboratorios_externos WHERE razon_social = ?",
      [razon]
    );
    const [rifExistente] = await pool.execute(
      "SELECT rif FROM laboratorios_externos WHERE rif = ?",
      [rif]
    );

    if (nombreExistente.length > 0 || rifExistente.length > 0) {
      return await res.status(400).json({
        mensaje:
          "El nombre/rif que intenta agregar para este laboratorio ya existe",
      });
    } else {
      const [categoria] = await pool.execute(
        "INSERT INTO laboratorios_externos (rif,razon_social,direccion,telefono) VALUES (?,?,?,?)",
        [rif, razon, direccion, telefono]
      );
      return await res.status(200).json({
        mensaje: "Laboratorio insertado correctamente",
        laboratorioId: categoria.insertId,
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getSedes = async (req, res) => {
  try {
    const [sedes] = await pool.execute("SELECT * FROM sede");
    return await res.status(200).json(sedes);

   
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getEmpresas = async (req, res) => {
  try {
    const [empresas] = await pool.execute("SELECT * FROM empresas");
    return await res.status(200).json(empresas);
    
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getLaboratorios = async (req, res) => {
  try {
    const [laboratorios] = await pool.execute(
      "SELECT * FROM laboratorios_externos"
    );
    return await res.status(200).json(laboratorios);

  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getExamenByFecha = async (req, res) => {
  try {
    let { fecha } = req.query;

    let examenDia = [];
    const [examenes] = await pool.execute(
      `SELECT * FROM examenes_paciente WHERE fecha between '${fecha} 00:00:01' AND '${fecha} 23:59:59'`
    );
    for await (const ex of examenes) {
      const [examen] = await pool.execute(
        `SELECT * FROM examenes where id = ?`,[ex.id_ex]
      );
      const [paciente] = await pool.execute(
        `SELECT * FROM pacientes WHERE id = ?`,[ex.id_pac]
      );
      const [bioanalista] = await pool.execute(
        `SELECT * FROM bioanalistas WHERE id = ?`,[ex.id_bio]
      );
      const [orden] = await pool.execute(`SELECT * FROM ordenes WHERE id = ?`, [
        ex.id_orden,
      ]);
      console.log(ex);
      let hora = ex.fecha.toJSON().split("T")[1].split(".")[0];
      examenDia.push({
        id: ex.id,
        cedula: paciente[0].cedula,
        paciente: paciente[0].nombre,
        bioanalista: bioanalista[0].nombre,
        examen: examen[0].nombre,
        status_ws: orden[0].status_ws,
        status_imp: orden[0].status_imp,
        status_correo: orden[0].status_correo,
        hora,
      });
    }
    res.status(200).json({ examenes: examenDia });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getExamenDetalle = async (req, res) => {
  console.log(req.body);
};
