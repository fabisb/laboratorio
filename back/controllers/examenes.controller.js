import { pool } from "../database/db.js";

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

    const rangos = await Promise.all(resultadosDetalle.map(async e=>{
      console.log('res: ', e)
      const [rangosBdd] = await pool.execute(`SELECT * FROM rangos_detalle where id_det_ex = '${e.id}'`)
      return {idDetEx: e.id, rangos:rangosBdd}
      
    }))
    console.log('rangos otros:' + rangos)
    return await res
      .status(200)
      .json({ examen: resultados, detalle: resultadosDetalle,rangos: rangos });
  } catch (error) {
    return await res
      .status(500)
      .json({ mensaje: "ha ocurrido un error el servidor" });
  }
};

export const modificarExamen = async (req, res) => {
  const { examen, detalle, idExamen } = req.body;
  console.log("🚀 ~ modificarExamen ~ idExamen:", idExamen);
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
      if (resultados != null && resultados != '') {
        console.log('aaa')
        
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

    const idsDetalle = detalle.map(e=>{
      
      
      let a = parseInt(e.idDetalleBdd)
      return a
    })
    const idsDetalleEx = detallesExistentes.map(e=>e.id)
    console.log('ids',idsDetalle)
    console.log('idsEx',idsDetalleEx)

    const detalleDelete =idsDetalleEx.filter(det => {
      
      return !(idsDetalle.includes(det))
    
    })
    console.log('del: ',detalleDelete)
    if(detalleDelete.length>0){
      await pool.query('UPDATE detalles_examen SET status = "inactivo" WHERE id IN (?)',[detalleDelete])
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
            dato.nombre,
            dato.posicion,
            dato.unidad,
            dato.impsiempre,
            dato.resultados ? dato.resultados : null,
            dato.idDetalleBdd,
          ]
        );
        console.log('del: ', 'DELETE from rangos_detalle where id_det_ex = ?', [dato.idDetalleBdd] )
        await pool.execute('DELETE from rangos_detalle where id_det_ex = ?', [dato.idDetalleBdd])
        let cadenaRangos = ''

        dato.rangos.forEach(rg=>{
          cadenaRangos += `('${dato.idDetalleBdd}','${rg.superior}','${rg.inferior}','${rg.desde}','${rg.hasta}','${rg.genero}'),`

        })

      
      cadenaRangos = cadenaRangos.slice(0, cadenaRangos.length - 1);
      if(dato.rangos.length>0){
        const rangosConsulta = await pool.execute(`INSERT INTO rangos_detalle (id_det_ex,inferior,superior, desde, hasta,genero) VALUES ${cadenaRangos}`)

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
  console.log("🚀 ~ crearExamen ~ examen:", examen);
  console.log("🚀 ~ crearExamen ~ detalle:", detalle);
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
        `INSERT INTO detalles_examen(id_ex, nombre, posicion, unidad, impsiempre, resultados) VALUES('${examenInsert.insertId}','${nombre}','${posicion}','${unidad}','','${resultados}')`
      );
      console.log("🚀 ~ forawait ~ consulta:", consulta);
      rangos.forEach(async (rg) => {
        cadenaRangos += `('${consulta.insertId}','${rg.superior}','${rg.inferior}','${rg.desde}','${rg.hasta}','${rg.genero}'),`;
      });
      cadenaRangos = cadenaRangos.slice(0, cadenaRangos.length - 1);
      if(rangos.length>0){
        const rangosConsulta = await pool.execute(`INSERT INTO rangos_detalle (id_det_ex,inferior,superior, desde, hasta,genero) VALUES ${cadenaRangos}`)

      }
      
    }

    const valores = detalle
      .map((dato) => {
        return `('${examenInsert.insertId}','${dato.nombre}','${dato.posicion}','${dato.unidad}','${dato.impsiempre}','${dato.resultados}')`;
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
  const {orden} = req.body;
  var ordenId
  console.log("🚀 ~ crearOrden ~ Orden:", orden);
  try {
    const [validarOrden] = await pool.execute(`SELECT id FROM ordenes WHERE orden='${orden.orden}' AND clave = '${orden.clave}'`)
    if(validarOrden.length > 0) {
      return await res
      .status(400)
      .json({ mensaje: "Ya existe una orden con ese numero y clave"});
    }
    if(orden.clave == 'no'){
      const [ordenBdd] = await pool.execute(
        `INSERT INTO ordenes(clave, id_paciente, id_bio) VALUES ('${orden.clave}','${orden.idPac}','${orden.id_bio}')`
      )
      ordenId=ordenBdd.insertId
  
      const updateOrden = await pool.execute(
        `UPDATE ordenes SET orden= '${ordenBdd.insertId}' where id= '${ordenBdd.insertId}'`
      )
  
      
    }else{
      const [ordenBdd] = await pool.execute(
        `INSERT INTO ordenes(clave, id_paciente,orden, id_bio) VALUES ('${orden.clave}','${orden.idPac}','${orden.orden}','${orden.id_bio}')`
      )
      ordenId=ordenBdd.insertId
  
  
      
    }
    for await (const ex of orden.examenes) {
      const [examenBdd] = await pool.execute(`
      INSERT INTO examenes_paciente(id_orden, id_ex, id_pac, id_bio) VALUES ('${ordenId}','${ex.id_ex}','${ex.idPac}','${orden.id_bio}')
      `)
      for await (const dt of ex.detallesExamen){
        const [detalleBdd] = await pool.execute(`
        INSERT INTO detalles_examenes_paciente(id_dt, id_ex, id_ex_pac, id_rango, resultado, nota) VALUES ('${dt.id_dt}','${ex.id_ex}','${examenBdd.insertId}','${dt.id_rango}','${dt.resultado}','${dt.nota}')
        `)
        for await (const sb of dt.subCaracteristicasDt){
          const [subCaracteristicaBdd] = await pool.execute(`
          INSERT INTO detalle_subcaracteristica_paciente(id_det_ex, id_detalle_sub, resultado, nota) VALUES ('${detalleBdd.insertId}','${sb.id_detalle_sub}','${sb.resultado}','${sb.nota}')
          `)
        }
        
      }
    }
    
  

    return await res
      .status(200)
      .json({ mensaje: "Orden ingresada con exito" });
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

export const getCaracteristicasExamenPaciente = async (req, res) => {
  const { id} = req.query;
  console.log(id)
  if (id== '' || !id ) {
    return await res.status(400).json({mensaje:'Los datos enviados no son validos'});
    
  }
  try {
    const [caracteristicas] = await pool.execute(
      "SELECT * FROM detalles_examenes_paciente WHERE id_ex_pac = ?",
      [id]
    );
    console.log(caracteristicas)

    if (caracteristicas.length > 0) {
      
      let caracteristicasData =[]

      for await (const ct of caracteristicas) {
        const [nombre] = await pool.execute(`SELECT nombre,unidad FROM detalles_examen where id=${ct.id_dt}`)
        const [rango] = await pool.execute(`SELECT inferior,superior FROM rangos_detalle where id=${ct.id_rango}`)
        caracteristicasData.push({
          nombre: nombre[0].nombre,
          unidad: nombre[0].unidad,
          rango: rango[0],
          resultado: ct.resultado,
          nota: ct.nota
        })
      }
      return await res
      .status(200)
      .json({ caracteristicasData });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getExamenesPaciente = async (req, res) => {
  const { cedula, preCedula,fecha } = req.query;

  if (cedula == '' || !cedula ) {
    return await res.status(400).json({mensaje:'Los datos enviados no son validos'});
    
  }
  try {
    const [paciente] = await pool.execute(
      "SELECT * FROM pacientes WHERE cedula = ? AND pre_cedula = ?",
      [cedula, preCedula]
    );
    if (paciente.length > 0) {
      const [examenes] = await pool.execute(`SELECT * FROM examenes_paciente where id_pac ='${paciente[0].id}'`)
      let examenesData =[]

      for await (const ex of examenes) {
        const [examen] = await pool.execute(`SELECT * FROM examenes where id=${ex.id_ex}`)
        examenesData.push({
          id:ex.id,
          id_bio:ex.id_bio,
          nombreEx:examen[0].nombre,
          id_ex:ex.id_ex,
          fecha:ex.fecha
        })
      }
      return await res
      .status(200)
      .json({ examenesData });
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
  const { cedula, preCedula } = req.query;

  if (cedula == '' || !cedula ) {
    return await res.status(400).json({mensaje:'Los datos enviados no son validos'});
    
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
export const getPacienteHijo = async (req, res) => {
  console.log('getPacienteHijo')
  const { cedula, nombre } = req.query;
  console.log("🚀 ~ getPacienteHijo ~ req.query:", req.query)
if (cedula == '' || !cedula || nombre == '' || !nombre) {
  return await res.status(400).json({mensaje:'Los datos enviados no son validos'});
  
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

export const getHijosController = async (req, res) => {
  console.log("getHijosControllerExamnes");
  const { cedula } = req.query;
  console.log("🚀 ~ getHijosController ~ cedula:", cedula);
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
