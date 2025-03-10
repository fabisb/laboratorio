import { pool } from "../database/db.js";
import moment from 'moment';


export const getExamenReimpresion = async (req, res) => {
  const { reimp } = req.body;

  try {
    let examenes = [];
    for await (const ex of reimp) {
      const [examen] = await pool.execute(
        `SELECT * FROM examenes_paciente where id = ?`,
        [ex]
      );
      const [infoExamen] = await pool.execute(
        `SELECT * FROM examenes where id =?`,
        [examen[0].id_ex]
      );
      const [seccion] = await pool.execute(
        `SELECT * FROM seccion_examen WHERE id = ?`,
        [infoExamen[0].id_seccion]
      );
      const [bioanalista] = await pool.execute(
        `SELECT * FROM bioanalistas WHERE id = ?`,
        [examen[0].id_bio]
      );

      const [detalles] = await pool.execute(
        `SELECT * FROM detalles_examenes_paciente where id_ex_pac= ?`,
        [ex]
      );
      let detalles2 = detalles;
      let caracteristicas = [];
      for await (const dt of detalles2) {
        const [detalleInfo] = await pool.execute(
          `SELECT * FROM detalles_examen WHERE id = '${dt.id_dt}'`
        );
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
            tipo: subCaInfo[0].tipo
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
          posicion:detalleInfo[0].posicion,
          subCaracteristicas,
        });
      }
      const [titulos] = await pool.execute(
        `SELECT * FROM titulos where id_ex = ?`,
        [examen[0].id_ex]
      );
      titulos.map((e) => {
        caracteristicas.push(e);
      });
      bioanalista[0].foto_firma = `${Buffer.from(
        bioanalista[0].foto_firma,
        "base64"
      )}`;
      caracteristicas = caracteristicas.sort(function (a, b) {
        if (a.posicion > b.posicion) {
          return 1;
        }
        if (a.posicion < b.posicion) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      const [orden] = await pool.execute(
        `SELECT * FROM ordenes where id = ?`,
        [examen[0].id_orden]
      );
      const [paciente] = await pool.execute(
        `SELECT * FROM pacientes where id = ?`,
        [orden[0].id_paciente]
      );
      paciente[0].edad = calcularEdadNormal(paciente[0].fecha_nacimiento);
      examenes.push({
        examen: infoExamen[0].nombre,
        nombreSeccion: seccion[0].nombre,
        bioanalista: bioanalista[0],
        ordenId: examen[0].id_orden,
        caracteristicas,
        orden: orden[0].orden,
        paciente: paciente[0]
      });
    }
    return await res.status(200).json({ examenes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const calcularEdadNormal = (fecha) => {
  let fechaActual = moment().format("YYYY-MM-DD");

  let fecha2 = (
    moment(fecha).format("YYYY-MM-DD"));
  const mes = moment(fecha).format("MM");
  const ano = moment(fecha).format("YYYY");
  const dia = moment(fecha).format("DD");
  if (
    (mes == 2 && dia > 29) ||
    moment(fecha2).isAfter(fechaActual) ||
    ano < 1890
  ) {

    return "";
  }

  const mesAc = moment().format("MM");
  const anoAc = moment().format("YYYY");
  const diaAc = moment().format("DD");

  let mesR = mesAc - mes;
  let diaR = diaAc - dia;
  let anoR = anoAc - ano;

  if (mesR < 0) {
    mesR = mesR + 12;
    anoR--;
  }
  if (diaR < 0) {
    mesR--;
  }

  return `${anoR} años;  ${mesR} meses`;
};
export const crearExamenPendiente = async (req, res) => {
  const { examenPac, idPac } = req.body;
  try {
    const [examen] = await pool.execute(
      `INSERT INTO examenes_pendientes (id_ex,id_pac) VALUES (?, ?)`,
      [examenPac.examenId, idPac]
    );

    for await (const dt of examenPac.detallesExamenPd) {
      const [detalle] = await pool.execute(
        `INSERT INTO detalles_ex_pendientes(id_dt,id_ex,id_ex_pd,id_rango,resultado,nota,inferior,superior) VALUES (?,?,?,?,?,?,?,?)`,
        [
          dt.id_dt,
          dt.id_ex,
          examen.insertId,
          dt.id_rango,
          dt.resultado.toUpperCase(),
          dt.nota,
          dt.inferior,
          dt.superior,
        ]
      );
      for await (const sb of dt.subCaracteristicasDt) {
        const [subCaracteristicaDtPd] = await pool.execute(`
        INSERT INTO detalle_sub_ex_pd(id_det_ex_pd, id_detalle_sub, resultado, nota) VALUES ('${detalle.insertId}','${sb.id_detalle_sub}','${sb.resultado}','${sb.nota}')`);
      }
    }

    return await res.status(200).json({ examen });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
export const getPendienteExamen = async (req, res) => {
  const { id } = req.query;

  try {
    const [pendiente] = await pool.execute(
      `SELECT * FROM examenes_pendientes where id = ${id}`
    );

    const [examen] = await pool.execute(
      `SELECT * FROM examenes where id = ${pendiente[0].id_ex}`
    );
    const [titulos] = await pool.execute(
      `SELECT * FROM titulos where id_ex = ${pendiente[0].id_ex}`
    );
    const [seccion] = await pool.execute(
      `SELECT * FROM seccion_examen where id =${examen[0].id_seccion}`
    );

    const [detalles] = await pool.execute(
      `SELECT * FROM detalles_ex_pendientes where id_ex_pd = ${pendiente[0].id}`
    );
    let detallesExamenPc = [];
    let subCaracteristicasExPc = [];

    for await (const dt of detalles) {
      const [caracteristica] = await pool.execute(
        `SELECT * FROM detalles_examen where id = ${dt.id_dt}`
      );

      const [sub] = await pool.execute(
        `SELECT * FROM detalle_sub_ex_pd where id_det_ex_pd = ${dt.id}`
      );
      for await (const sb of sub) {
        const [subCa] = await pool.execute(
          `SELECT * FROM subcaracteristicas_detalle where id= ${sb.id_detalle_sub}`
        );

        subCaracteristicasExPc.push({
          idSub: sb.id_detalle_sub,
          nombreSub: subCa[0].nombre,
          resultado: sb.resultado,
          nota: sb.nota,
          tipo: subCa[0].tipo,
        });
      }
      detallesExamenPc.push({
        idCar: caracteristica[0].id,
        rango: dt.id_rango,
        inferior: dt.inferior,
        superior: dt.superior,
        resultado: dt.resultado,
        nota: dt.nota,
        nombreCar: caracteristica[0].nombre,
        imprimir: caracteristica[0].impsiempre,
        unidad: caracteristica[0].unidad,
      });
    }
    titulos.map((e) => detallesExamenPc.push(e));


    return await res.status(200).json({
      examenPac: {
        examenId: examen[0].id,
        examenNombre: examen[0].nombre,
        detallesExamenPc,
        subCaracteristicasExPc,
        seccionNombre: seccion[0].nombre,
        idLab: pendiente[0].id_lab,
      },
    });
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "ha ocurrido un error el servidor" });
  }
};

export const getExamen = async (req, res) => {
  const { id } = req.body;
  try {
    const [resultados] = await pool.execute(
      `SELECT * FROM examenes where id = ${id}`
    );

    const [resultadosDetalle] = await pool.execute(
      `SELECT * FROM detalles_examen where id_ex = ${id} AND status = ?`,
      ["activo"]
    );

    const rangos = await Promise.all(
      resultadosDetalle.map(async (e) => {
        const [rangosBdd] = await pool.execute(
          `SELECT * FROM rangos_detalle where id_det_ex = '${e.id}'`
        );
        return { idDetEx: e.id, rangos: rangosBdd };
      })
    );
    return await res
      .status(200)
      .json({ examen: resultados, detalle: resultadosDetalle, rangos: rangos });
  } catch (error) {
    return await res
      .status(500)
      .json({ mensaje: "ha ocurrido un error el servidor" });
  }
};

export const updateSubCaracteristicaCar = async (req, res) => {
  const { idCar, nota, subCaracteristicas } = req.body;

  try {
    const [notaBdd] = await pool.execute(
      `UPDATE detalles_examenes_paciente set nota=? where id=?`,
      [nota, idCar]
    );

    for (let index = 0; index < subCaracteristicas.length; index++) {
      const element = subCaracteristicas[index];

      const [sb] = await pool.execute(
        `UPDATE detalle_subcaracteristica_paciente set ${element.campo}=? where id=?`,
        [element.valor, element.id]
      );
    }
    return await res
      .status(200)
      .json({ mensaje: "El resultado ha sido modificado exitosamente" });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};
export const getExamenResultadosExterno = async (req, res) => {
  const { id } = req.query;
  try {

    const [examenExterno] = await pool.execute('SELECT PDF FROM examenes_externos WHERE id = ?', [id]);
    if (examenExterno.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: 'No se ha encontrado examenes externos con el id #' + id });

    } else {
      if (examenExterno[0].PDF == null) {

        return await res
          .status(400)
          .json({ mensaje: 'El examen no tiene un PDF asociado' });
      } else {


        return await res.status(200).setHeader('Content-Type', 'application/pdf').send(examenExterno[0].PDF);
      }

    }
  } catch (error) {
    console.log("🚀 ~ getExamenResultadosExterno ~ error:", error)
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });

  }
}
export const getExamenResultados = async (req, res) => {
  try {
    const { id } = req.query;
    if (id < 0 || id == "") {
      return await res
        .status(400)
        .json({ mensaje: "El id ingresado no es correcto" });
    }
    let detalleResultados = [];
    const [detalles] = await pool.execute(
      `
      SELECT * FROM detalles_examenes_paciente where id_ex_pac = ?
    `,
      [id]
    );

    if (detalles.length == 0) {
      return await res
        .status(400)
        .json({ mensaje: "El examen no tiene resultados" });
    }

    for await (const d of detalles) {
      const [subB] = await pool.execute(
        `
      SELECT * FROM detalle_subcaracteristica_paciente where id_det_ex = ?
    `,
        [d.id]
      );
      let sub = [];
      for await (const s of subB) {
        const [sb] = await pool.execute(
          `
        SELECT * FROM subcaracteristicas_detalle where id = ?
      `,
          [s.id_detalle_sub]
        );

        sub.push({
          id: s.id,
          id_det_ex: s.id_det_ex,
          id_detalle_sub: s.id_detalle_sub,
          resultado: s.resultado,
          nota: s.nota,
          nombre: sb[0].nombre,
          valor: sb[0].valor,
          tipo: sb[0].tipo,
        });
      }
      const [rango] = await pool.execute(
        `
      SELECT * FROM rangos_detalle where id = ?
    `,
        [d.id_rango]
      );
      const [caracteristica] = await pool.execute(
        `
      SELECT * FROM detalles_examen where id = ?
    `,
        [d.id_dt]
      );
      const [resultados] = await pool.execute(
        `
      SELECT * FROM resultados_detalle where id_det_ex = ?
    `,
        [d.id_dt]
      );

      detalleResultados.push({
        id: d.id,
        id_dt: d.id_dt,
        id_ex: d.id_ex,
        id_ex_pac: d.id_ex_pac,
        nombre: caracteristica[0].nombre,
        resultado: d.resultado,
        nota: d.nota,
        unidad: caracteristica[0].unidad,
        rango: rango[0],
        sub,
        resultados,
        posicion: caracteristica[0].posicion
      });
    }

    const [titulos] = await pool.execute(
      `select * from titulos where id_ex=?`,
      [detalles[0].id_ex]
    );
    titulos.map((e) => {
      detalleResultados.push(e);
    });
    return await res.status(200).json(detalleResultados);
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const modificarResultadoExamen = async (req, res) => {
  const { idRes, resultado, nota } = req.body;
  try {
    const [r] = await pool.execute(
      `UPDATE detalles_examenes_paciente set resultado = ?, nota = ? WHERE id = ?`,
      [resultado, nota, idRes]
    );
    return await res
      .status(200)
      .json({ mensaje: `Resultado modificado exitosamente` });
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const crearExamenExterno = async (req, res) => {
  const { idEx, idLab, nota, bioanalista, idPac, PDF, orden } = req.body;
  if (bioanalista == "") {
    return await res
      .status(400)
      .json({ mensaje: "El bioanalista no puede estar vacio" });
  }
  if (orden == "" || orden == 0) {
    return await res
      .status(400)
      .json({ mensaje: "Hay un error en la orden ingresada" });
  }
  if (idLab == 0 || idEx == 0 || idPac == 0) {
    return await res
      .status(400)
      .json({ mensaje: "Hay un error en la consulta" });
  }

  try {
    const [r] = await pool.execute(
      `INSERT INTO examenes_externos(id_ex, bioanalista, nota, id_lab, id_pac, PDF, id_orden, id_usuario) VALUES (?,?,?,?,?,?,?,?)`,
      [idEx, bioanalista, nota, idLab, idPac, PDF, orden, req.user.id]
    );
    return await res
      .status(200)
      .json({ mensaje: `Examen Agregado Exitosamente` });
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const modificarExamenExterno = async (req, res) => {
  const { idLab, nota, idExt, bioanalista, PDF, orden } = req.body;
  if (bioanalista == "") {
    return await res
      .status(400)
      .json({ mensaje: "El bioanalista no puede estar vacio" });
  }
  if (idLab == 0 || idExt == 0) {
    return await res
      .status(400)
      .json({ mensaje: "Hay un error en la consulta" });
  }
  if (orden == "" || orden == 0) {
    return await res
      .status(400)
      .json({ mensaje: "Hay un error en la orden ingresada" });
  }
  try {
    const [r] = await pool.execute(
      `UPDATE examenes_externos set bioanalista= ?, nota= ?, id_lab = ?, PDF = ?, id_orden = ? WHERE id = ?`,
      [bioanalista, nota, idLab, PDF, orden, idExt]
    );
    return await res
      .status(200)
      .json({ mensaje: `Examen Modificado Exitosamente` });
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const modificarLaboratorio = async (req, res) => {
  const { id, idLab } = req.body;

  try {
    const [r] = await pool.execute(
      `UPDATE examenes_paciente set id_lab = ? WHERE id = ?`,
      [idLab, id]
    );
    return await res
      .status(200)
      .json({ mensaje: `Laboratorio modificado exitosamente` });
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const modificarExamen = async (req, res) => {
  const { examen, detalle, idExamen } = req.body;
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
  try {
    for await (const dato of detalle) {
      const { nombre, unidad, resultados, idDetalleBdd } = dato;
      if (resultados != null && resultados != "") {

        if (resultados.split("~").length == 0) {
          return await res.status(400).json({
            mensaje:
              "El formato de un resultado de una caracteristica es erroneo",
          });
        }
        if (
          (resultados.split("~").length < 2 ||
            resultados.split("~").length > 10) &&
          resultados.split("~").length != 0
        ) {
          return await res.status(400).json({
            mensaje:
              "Minimo deben haber 2 resultados posibles en las caracteristicas",
          });
        }
      }

      if (!nombre || nombre == "") {
        return await res.status(400).json({
          mensaje: "El campo nombre de alguna de las caracteristicas es vacio",
        });
      }
      if (!unidad || unidad == "") {
        return await res.status(400).json({
          mensaje: "El campo unidad de alguna de las caracteristicas es vacio",
        });
      }
    }

    const [detallesExistentes] = await pool.execute(
      'SELECT * FROM detalles_examen WHERE id_ex = ? AND status = "activo"',
      [idExamen]
    );

    const idsDetalle = detalle.map((e) => {
      let a = parseInt(e.idDetalleBdd);
      return a;
    });
    const idsDetalleEx = detallesExistentes.map((e) => e.id);

    const detalleDelete = idsDetalleEx.filter((det) => {
      return !idsDetalle.includes(det);
    });
    if (detalleDelete.length > 0) {
      await pool.query(
        'UPDATE detalles_examen SET status = "inactivo" WHERE id IN (?)',
        [detalleDelete]
      );
    }

    const [examenUpdate] = await pool.execute(
      "UPDATE examenes SET nombre = ? WHERE id = ?",
      [examen, idExamen]
    );

    await Promise.all(
      await detalle.map(async (dato) => {
        await pool.execute(
          "UPDATE detalles_examen SET nombre = ?, posicion = ?, unidad = ?, impsiempre = ?, resultados = ? WHERE id = ? AND status = 'activo'",
          [
            dato.nombre.toUpperCase(),
            dato.posicion,
            dato.unidad,
            dato.impsiempre,
            dato.resultados ? dato.resultados.toUpperCase() : null,
            dato.idDetalleBdd,
          ]
        );

        await pool.execute("DELETE from rangos_detalle where id_det_ex = ?", [
          dato.idDetalleBdd,
        ]);
        let cadenaRangos = "";

        dato.rangos.forEach((rg) => {
          cadenaRangos += `('${dato.idDetalleBdd}','${rg.superior}','${rg.inferior}','${rg.desde}','${rg.hasta}','${rg.genero}'),`;
        });

        cadenaRangos = cadenaRangos.slice(0, cadenaRangos.length - 1);
        if (dato.rangos.length > 0) {
          const rangosConsulta = await pool.execute(
            `INSERT INTO rangos_detalle (id_det_ex,inferior,superior, desde, hasta,genero) VALUES ${cadenaRangos}`
          );
        }
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
  try {
    for await (const dato of detalle) {
      const { nombre, unidad, resultados, rangos } = dato;
      rangos.forEach(async (rg) => {
        if (rg.superior == "" || rg.inferior == "") {
          return await res.status(400).json({
            mensaje: "El formato de un Rango es erroneo",
          });
        }
      });
      if (resultados != "") {
        if (resultados.split("~").length == 0) {
          return await res.status(400).json({
            mensaje:
              "El formato de un resultado de una caracteristica es erroneo",
          });
        }
        if (
          (resultados.split("~").length < 2 ||
            resultados.split("~").length > 10) &&
          resultados.split("~").length != 0
        ) {
          return await res.status(400).json({
            mensaje:
              "Minimo deben haber 2 resultados posibles en las caracteristicas",
          });
        }
      }

      if (!nombre || nombre == "") {
        return await res.status(400).json({
          mensaje: "El campo nombre de alguna de las caracteristicas es vacio",
        });
      }
      if (!unidad || unidad == "") {
        return await res.status(400).json({
          mensaje: "El campo unidad de alguna de las caracteristicas es vacio",
        });
      }
    }

    const [examenInsert] = await pool.execute(
      "INSERT INTO examenes (nombre) VALUES (?)",
      [examen]
    );

    for await (const dato of detalle) {
      const { nombre, unidad, resultados, rangos, posicion } = dato;
      let cadenaRangos = "";

      const [consulta] = await pool.execute(
        `INSERT INTO detalles_examen(id_ex, nombre, posicion, unidad, impsiempre, resultados) VALUES('${examenInsert.insertId
        }','${nombre.toUpperCase()}','${posicion}','${unidad}','','${resultados.toUpperCase()}')`
      );
      rangos.forEach(async (rg) => {
        cadenaRangos += `('${consulta.insertId}','${rg.superior}','${rg.inferior}','${rg.desde}','${rg.hasta}','${rg.genero}'),`;
      });
      cadenaRangos = cadenaRangos.slice(0, cadenaRangos.length - 1);
      if (rangos.length > 0) {
        const rangosConsulta = await pool.execute(
          `INSERT INTO rangos_detalle (id_det_ex,inferior,superior, desde, hasta,genero) VALUES ${cadenaRangos}`
        );
      }
    }

    const valores = detalle
      .map((dato) => {
        return `('${examenInsert.insertId}','${dato.nombre.toUpperCase()}','${dato.posicion
          }','${dato.unidad}','${dato.impsiempre
          }','${dato.resultados.toUpperCase()}')`;
      })
      .join(", ");
    //const consulta = `INSERT INTO detalles_examen(id_ex, nombre, posicion, unidad, impsiempre, resultados) VALUES ${valores}`;

    //const resultados = await pool.execute(consulta);
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
export const crearOrden = async (req, res) => {
  const { orden, sedeVar, user } = req.body;
  if (user == "" || sedeVar == "") {
    return await res.status(400).json({ mensaje: "Datos de token erroneo" });
  }
  var ordenId;
  try {
    const [validarOrden] = await pool.execute(
      `SELECT id FROM ordenes WHERE orden='${orden.orden}' AND clave = '${orden.clave}'`
    );
    if (orden.expediente == "") {
      return await res
        .status(400)
        .json({ mensaje: "El expediente no puede estar Vacio" });
    }

    if (validarOrden.length > 0) {
      return await res
        .status(400)
        .json({ mensaje: "Ya existe una orden con ese numero y clave" });
    }
    const [fecha] = await pool.execute(`SELECT CURRENT_DATE`);
    let fechaActual = fecha[0].CURRENT_DATE.toJSON().split("T")[0];
    const [validarExpediente] = await pool.execute(
      `SELECT (id) FROM ordenes where expediente = '${orden.expediente}' AND fecha BETWEEN '${fechaActual} 00:00:00' AND '${fechaActual} 23:59:00'`
    );
    if (validarExpediente.length > 0) {
      return await res.status(400).json({
        mensaje: `Ya existe una orden con el expediente numero ${orden.expediente} en el dia de Hoy (${fechaActual})`,
      });
    }
    if (orden.clave == "no") {
      const [ordenBdd] = await pool.execute(
        `INSERT INTO ordenes(clave, id_paciente, id_bio, expediente, id_empresa) VALUES ('${orden.clave}','${orden.idPac}','${orden.id_bio}','${orden.expediente}',${orden.empresa == '' ? 0 : orden.empresa})`
      );
      ordenId = ordenBdd.insertId;

      const updateOrden = await pool.execute(
        `UPDATE ordenes SET orden= '${ordenBdd.insertId}' where id= '${ordenBdd.insertId}'`
      );
    } else {
      const [ordenBdd] = await pool.execute(
        `INSERT INTO ordenes(clave, id_paciente,orden, id_bio, expediente, id_empresa) VALUES ('${orden.clave}','${orden.idPac}','${orden.orden}','${orden.id_bio}','${orden.expediente}', ${orden.empresa == '' ? 0 : orden.empresa})`
      );
      ordenId = ordenBdd.insertId;
    }
    for await (const ex of orden.examenes) {
      const [examenBdd] = await pool.execute(`INSERT INTO examenes_paciente(id_orden, id_ex, id_pac, id_bio,id_sede,id_usuario) VALUES ('${ordenId}','${ex.id_ex}','${ex.idPac}','${orden.id_bio}','${sedeVar}','${user}')`);
      for await (const dt of ex.detallesExamen) {
        if (dt.status != "titulo") {
          const [detalleBdd] = await pool.execute(`INSERT INTO detalles_examenes_paciente(id_dt, id_ex, id_ex_pac, id_rango,superior,inferior, resultado, nota) VALUES ('${dt.id_dt}','${ex.id_ex}','${examenBdd.insertId}','${dt.id_rango == 'no' ? 0 : dt.id_rango}','${dt.superior == 'no' ? 0 : dt.superior}','${dt.inferior == 'no' ? 0 : dt.inferior}','${dt.resultado}','${dt.nota}')`);
          for await (const sb of dt.subCaracteristicasDt) {
            const [subCaracteristicaBdd] = await pool.execute(`INSERT INTO detalle_subcaracteristica_paciente(id_det_ex, id_detalle_sub, resultado, nota) VALUES ('${detalleBdd.insertId}','${sb.id_detalle_sub}','${sb.resultado}','${sb.nota}')`);
          }
        }
      }
    }

    return await res
      .status(200)
      .json({ mensaje: "Orden ingresada con exito", ordenId });
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

export const getEmpresas = async (req, res) => {
  try {
    const [empresas] = await pool.execute(
      'SELECT * FROM empresas WHERE status="activo"'
    );
    if (empresas.length > 0) {
      return await res.status(200).json(empresas);
    } else {
      return await res
        .status(400)
        .json({ mensaje: "No se han encontrado empresas disponibles" });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getCaracteristicasExamenPaciente = async (req, res) => {
  const { id } = req.query;
  if (id == "" || !id) {
    return await res
      .status(400)
      .json({ mensaje: "Los datos enviados no son validos" });
  }
  try {
    const [caracteristicas] = await pool.execute(
      "SELECT * FROM detalles_examenes_paciente WHERE id_ex_pac = ?",
      [id]
    );

    if (caracteristicas.length > 0) {
      let caracteristicasData = [];

      for await (const ct of caracteristicas) {
        const [nombre] = await pool.execute(
          `SELECT nombre,unidad FROM detalles_examen where id=${ct.id_dt}`
        );
        const [rango] = await pool.execute(
          `SELECT inferior,superior FROM rangos_detalle where id=${ct.id_rango}`
        );
        caracteristicasData.push({
          nombre: nombre[0].nombre,
          unidad: nombre[0].unidad,
          rango: rango[0],
          resultado: ct.resultado,
          nota: ct.nota,
        });
      }
      return await res.status(200).json({ caracteristicasData });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getExamenesPaciente = async (req, res) => {
  const { cedula, preCedula, fecha } = req.query;

  if (cedula == "" || !cedula) {
    return await res
      .status(400)
      .json({ mensaje: "Los datos enviados no son validos" });
  }
  try {
    const [paciente] = await pool.execute(
      "SELECT * FROM pacientes WHERE cedula = ? AND pre_cedula = ?",
      [cedula, preCedula]
    );
    if (paciente.length > 0) {
      const [examenes] =
        fecha == "no"
          ? await pool.execute(
            `SELECT * FROM examenes_paciente where id_pac ='${paciente[0].id}' AND status="activo"`
          )
          : await pool.execute(
            `SELECT * FROM examenes_paciente where id_pac ='${paciente[0].id}' AND fecha between "${fecha} 00:00:00" AND "${fecha} 23:59:00"  AND status="activo"`
          );
      let examenesData = [];

      for await (const ex of examenes) {
        const [examen] = await pool.execute(
          `SELECT * FROM examenes where id=${ex.id_ex}`
        );
        if (examen.length > 0) {
          examenesData.push({
            id: ex.id,
            id_bio: ex.id_bio,
            nombreEx: examen[0].nombre,
            id_ex: ex.id_ex,
            fecha: ex.fecha,
          });
        }
      }
      return await res.status(200).json({ examenesData });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "No se ha encontrado el paciente", paciente: 404 });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getExamenesExternos = async (req, res) => {
  const { cedula, preCedula, fecha } = req.query;

  if (cedula == "" || !cedula) {
    return await res
      .status(400)
      .json({ mensaje: "Los datos enviados no son validos" });
  }
  try {
    const [paciente] = await pool.execute(
      "SELECT * FROM pacientes WHERE cedula = ? AND pre_cedula = ?",
      [cedula, preCedula]
    );
    if (paciente.length > 0) {
      const [examenes] =
        fecha == "no"
          ? await pool.execute(
            `SELECT * FROM examenes_externos where id_pac ='${paciente[0].id}'  AND status="activo"`
          )
          : await pool.execute(
            `SELECT * FROM examenes_externos where id_pac ='${paciente[0].id}' AND fecha between "${fecha} 00:00:00" AND "${fecha} 23:59:00"`
          );
      let examenesData = [];

      for await (const ex of examenes) {
        const [examen] = await pool.execute(
          `SELECT * FROM examenes where id=${ex.id_ex}`
        );
        const [lab] = await pool.execute(
          `SELECT * FROM laboratorios_externos where id ='${ex.id_lab}' `
        );

        examenesData.push({
          id: ex.id,
          nombreEx: examen[0].nombre,
          id_ex: ex.id_ex,
          fecha: ex.fecha,
          bioanalista: ex.bioanalista,
          nota: ex.nota,
          laboratorio: lab[0].razon_social,
          idLab: ex.id_lab,
          id_orden: ex.id_orden,
        });
      }
      return await res.status(200).json({ examenesData });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "No se ha encontrado el paciente", paciente: 404 });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getPaciente = async (req, res) => {
  const { cedula, preCedula,nombreHijo } = req.query;
  console.log("🚀 ~ getPaciente ~ nombreHijo:", nombreHijo)

  if (cedula == "" || !cedula) {
    return await res
      .status(400)
      .json({ mensaje: "Los datos enviados no son validos" });
  }
  try {
    const [paciente] = await pool.execute(
      "SELECT * FROM pacientes WHERE cedula = ? AND pre_cedula = ?",
      [cedula, preCedula]
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

export const deletePendientesPaciente = async (req, res) => {
  const { id } = req.query;

  try {
    const [pendiente] = await pool.execute(
      "SELECT * FROM examenes_pendientes WHERE id= ? ",
      [id]
    );

    if (pendiente.length > 0) {
      const [caracteristicas] = await pool.execute(
        `SELECT * FROM detalles_ex_pendientes where id_ex_pd= ?`,
        [id]
      );
      for await (const ct of caracteristicas) {
        await pool.execute(
          `DELETE FROM detalle_sub_ex_pd WHERE id_det_ex_pd= ?`,
          [ct.id]
        );
      }
      await pool.execute(`DELETE FROM examenes_pendientes WHERE id= ?`, [id]);
      await pool.execute(
        `DELETE FROM detalles_ex_pendientes WHERE id_ex_pd= ?`,
        [id]
      );
    } else {
      return await res
        .status(400)
        .json({ mensaje: "No se ha encontrado el pendiente", pendiente: 404 });
    }

    return await res
      .status(200)
      .json({ mensaje: "Se ha eliminado el pendiente" });
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getPendientesPaciente = async (req, res) => {
  const { idPac } = req.query;

  try {
    const [pendientesBdd] = await pool.execute(
      "SELECT * FROM examenes_pendientes WHERE id_pac = ? AND status = 'pendiente'",
      [idPac]
    );
    let pendientes = [];
    for await (const pd of pendientesBdd) {
      const [examen] = await pool.execute(
        "SELECT * FROM examenes where id= ?",
        [pd.id_ex]
      );
      pendientes.push({
        id: pd.id,
        id_ex: pd.id_ex,
        id_pac: pd.id_pac,
        nombre: examen[0].nombre,
        fecha: pd.fecha,
      });
    }

    if (pendientes.length > 0) {
      return await res.status(200).json(pendientes);
    } else {
      return await res.status(200).json({
        mensaje: "No se han encontrado examenes pendientes para el paciente",
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getPacienteHijo = async (req, res) => {
  const { cedula, nombre } = req.query;
  if (cedula == "" || !cedula || nombre == "" || !nombre) {
    return await res
      .status(400)
      .json({ mensaje: "Los datos enviados no son validos" });
  }
  try {
    const [paciente] = await pool.execute(
      "SELECT * FROM pacientes WHERE cedula = ? AND pre_cedula = 'N' AND nombre = ?",
      [cedula, nombre]
    );
    if (paciente.length > 0) {
      return await res.status(200).json(paciente[0]);
    } else {
      return await res
        .status(404)
        .json({ mensaje: "No se ha encontrado el paciente" });
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
    const [examenes] = await pool.execute("SELECT * FROM examenes WHERE status='activo'");
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

export const getHijosController = async (req, res) => {
  const { cedula } = req.query;
  try {
    if (!cedula || isNaN(cedula) || cedula == "") {
      return await res.status(400).json({ mensaje: "La cedula no es valida" });
    }
    const [rep] = await pool.execute(
      "SELECT * FROM pacientes WHERE cedula = ?",
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

export const statusExamenes = async (req, res) => {
  const { status, col, id } = req.body;
  if (col != "status_imp" || "status_ws" || "status_correo") {
  }
  try {
    const [statusEx] = await pool.execute(
      `UPDATE ordenes SET ${col} = ? WHERE id = ?`,
      [status, id]
    );
    return await res
      .status(200)
      .json({ mensaje: "Status modificado correctamente", id });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};

export const deleteExamenPaciente = async (req, res) => {
  const { id } = req.body
  if (!id || id < 0 || isNaN(id)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del examen no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM examenes_paciente WHERE id = ?",
      [id]
    );
    if (existente.length > 0) {
      const [CaNulo] = await pool.execute(
        "UPDATE `examenes_paciente` SET `status` = ? WHERE id = ?",
        ["nulo", id]
      );
      return await res.status(200).json({
        mensaje: "Examen anulado correctamente"
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El examen que intenta eliminar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteExamenPaciente ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const deleteExamenExterno = async (req, res) => {
  const { id } = req.body
  if (!id || id < 0 || isNaN(id)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del examen no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM examenes_externos WHERE id = ?",
      [id]
    );
    if (existente.length > 0) {
      const [CaNulo] = await pool.execute(
        "UPDATE `examenes_externos` SET `status` = ? WHERE id = ?",
        ["nulo", id]
      );
      return await res.status(200).json({
        mensaje: "Examen anulado correctamente"
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El examen que intenta eliminar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteExamenExternos ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

