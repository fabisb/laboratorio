import { pool } from "../database/db.js";
export const getUsers = async (req, res) => {
  try {
    const [users] = await pool.execute("SELECT id,nombre FROM users")
    if (users.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran usuarios" });
    } else {
      return await res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getPacientes = async (req, res) => {
  try {
    const [users] = await pool.execute("SELECT * FROM pacientes")
    if (users.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran usuarios" });
    } else {
      return await res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getExamenesReportes = async (req, res) => {
  try {

    let query = `SELECT DISTINCT e.id_pac as 'id_pac',ex.id as 'id_ex',e.id,ex.nombre AS 'nombre',s.nombre AS 'seccion', b.nombre as 'bioanalista', sd.nombre as 'sede', p.nombre as 'paciente', ct.nombre as 'categoria', e.fecha as 'fecha', o.orden as 'orden', o.clave as 'clave' FROM laboratorio.pacientes p INNER JOIN laboratorio.examenes_paciente e ON e.id_pac = p.id INNER JOIN laboratorio.examenes ex ON ex.id = e.id_ex INNER JOIN laboratorio.ordenes o ON e.id_orden=o.id INNER JOIN laboratorio.seccion_examen s ON ex.id_seccion = s.id INNER JOIN laboratorio.bioanalistas b ON b.id = e.id_bio INNER JOIN laboratorio.sede sd ON e.id_sede = sd.id INNER JOIN laboratorio.categoria_examen ct ON ct.id=ex.id_categoria WHERE e.status='activo' AND `
    const { filtrosValue, desde, hasta } = req.body

    const examenA = filtrosValue.find(e => e.columna == 'examenDet')
    if (examenA) {
      const [examenes] = await pool.execute(`SELECT e.id_pac as 'id_pac', e.id,ex.nombre AS 'nombre',s.nombre AS 'seccion', b.nombre as 'bioanalista', sd.nombre as 'sede', p.nombre as 'paciente', ct.nombre as 'categoria', e.fecha as 'fecha', o.orden as 'orden', o.clave as 'clave' FROM laboratorio.pacientes p INNER JOIN laboratorio.examenes_paciente e ON e.id_pac = p.id INNER JOIN laboratorio.examenes ex ON ex.id = e.id_ex INNER JOIN laboratorio.ordenes o ON e.id_orden=o.id INNER JOIN laboratorio.seccion_examen s ON ex.id_seccion = s.id INNER JOIN laboratorio.bioanalistas b ON b.id = e.id_bio INNER JOIN laboratorio.sede sd ON e.id_sede = sd.id INNER JOIN laboratorio.categoria_examen ct ON ct.id=ex.id_categoria WHERE e.id='${examenA.valor}' AND e.status='activo'`)

      res.status(200).json({ examenes, columnas: ['Id', 'Nombre', 'Seccion', 'Paciente', 'Bioanalista', 'Orden', 'Sede', 'Categoria', 'Fecha', 'Detalle'] })
      return
    }

    const empresa = filtrosValue.find(e => e.columna == 'empresa')

    const asegurado = filtrosValue.find(e => e.columna == 'asegurado')

    const paciente = filtrosValue.find(e => e.columna == 'paciente')

    const genero = filtrosValue.find(e => e.columna == 'genero')

    const orden = filtrosValue.find(e => e.columna == 'orden')

    const usuario = filtrosValue.find(e => e.columna == 'usuario')

    const hastaEdad = filtrosValue.find(e => e.columna == 'hasta')

    const desdeEdad = filtrosValue.find(e => e.columna == 'desde')

    const categoria = filtrosValue.find(e => e.columna == 'categoria')

    const seccion = filtrosValue.find(e => e.columna == 'seccion')

    const bioanalista = filtrosValue.find(e => e.columna == 'bioanalista')

    const sede = filtrosValue.find(e => e.columna == 'sede')

    const examen = filtrosValue.find(e => e.columna == 'examen')

    let fecha = await pool.execute(`SELECT CURRENT_DATE`)
    let fechaActual = fecha[0][0].CURRENT_DATE.toJSON().split('T')[0]
    let year = fechaActual.split('-')[0]

    if (desdeEdad) {
      let fechaHasta
      let fechaDesde = fechaActual.replace(year, year - desdeEdad.valor)
      if (hastaEdad) {
        fechaHasta = fechaActual.replace(year, year - hastaEdad.valor - 1)
        query += `p.fecha_nacimiento between '${fechaHasta}' and '${fechaDesde}' AND `
      }


    }

    if (empresa) {
      query += `o.clave= '${empresa.valor}' AND `
    }
    if (genero) {
      query += `p.genero = '${genero.valor}' AND `
    }
    if (sede) {
      query += `e.id_sede = '${sede.valor}' AND `
    }
    if (usuario) {
      query += `e.id_usuario = '${usuario.valor}' AND `
    }
    if (bioanalista) {
      query += `e.id_bio = '${bioanalista.valor}' AND `
    }
    if (examen) {
      query += `e.id_ex = '${examen.valor}' AND `
    }
    if (asegurado) {
      query += `o.id_empresa = '${asegurado.valor}' AND `
    }
    if (seccion) {
      query += `e.id_ex IN (SELECT id FROM examenes WHERE id_seccion = '${seccion.valor}' ${categoria ? `AND id_categoria = '${categoria.valor}'` : ``}) AND `
    } else {
      if (categoria) {
        query += `e.id_ex IN (SELECT id FROM examenes WHERE id_categoria = '${categoria.valor}') AND `
      }
    }
    if (paciente) {
      query += `e.id_pac = '${paciente.valor}' AND `
    }
    if (orden) {
      query += `e.id_orden = '${orden.valor}' AND `

    }


    query += `e.fecha between '${desde} 00:00:00' and '${hasta} 23:59:00'`


    let len = query.length
    if (query.endsWith('AND ')) {
      query = query.slice(0, len - 4)

    }

    const [examenes] = await pool.execute(query)








    await res.status(200).json({ examenes, columnas: ['Id', 'Nombre', 'Seccion', 'Paciente', 'Bioanalista', 'Orden', 'Sede', 'Categoria', 'Fecha', 'Detalle'] })
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};


export const getPaciente = async (req, res) => {
  try {
    const [paciente] = await pool.execute(`SELECT * FROM pacientes where id='${req.query.idPac}'`)

    if (paciente.length > 0) {
      await res.status(200).json(paciente[0])

    } else {
      await res.status(400).json({ mensaje: 'No se encontro el paciente' })
    }



  } catch (error) {
    console.log(error)
    await res.status(500).json({ mensaje: 'Error de Servidor' })
  }
}

export const getExternosReportes = async (req, res) => {
  try {


    let query = `SELECT DISTINCT e.id as 'id', ex.nombre as 'examen' , p.nombre as 'paciente', lb.razon_social as 'laboratorio', e.bioanalista as 'bioanalista', e.id_orden as 'orden', c.nombre as 'categoria', s.nombre as 'seccion', u.nombre as 'usuario', e.fecha as 'fecha' FROM laboratorio.examenes_externos e INNER JOIN laboratorio.examenes ex ON e.id_ex = ex.id INNER JOIN laboratorio.laboratorios_externos lb ON e.id_lab = lb.id INNER JOIN laboratorio.seccion_examen s ON ex.id_seccion = s.id INNER JOIN laboratorio.categoria_examen c ON c.id = ex.id_categoria INNER JOIN users u ON u.id=e.id_usuario INNER JOIN laboratorio.pacientes p ON e.id_pac = p.id WHERE e.status='activo' AND `
    const { filtrosValue, desde, hasta } = req.body


    const paciente = filtrosValue.find(e => e.columna == 'paciente')

    const genero = filtrosValue.find(e => e.columna == 'genero')

    const laboratorio = filtrosValue.find(e => e.columna == 'laboratorio')

    const usuario = filtrosValue.find(e => e.columna == 'usuario')

    const hastaEdad = filtrosValue.find(e => e.columna == 'hasta')

    const desdeEdad = filtrosValue.find(e => e.columna == 'desde')

    const examen = filtrosValue.find(e => e.columna == 'examen')

    let fecha = await pool.execute(`SELECT CURRENT_DATE`)
    let fechaActual = fecha[0][0].CURRENT_DATE.toJSON().split('T')[0]
    let year = fechaActual.split('-')[0]

    if (desdeEdad) {
      let fechaHasta
      let fechaDesde = fechaActual.replace(year, year - desdeEdad.valor)
      if (hastaEdad) {
        fechaHasta = fechaActual.replace(year, year - hastaEdad.valor - 1)
        query += `p.fecha_nacimiento between '${fechaHasta}' and '${fechaDesde}' AND `
      }


    }

    if (genero) {
      query += `p.genero = '${genero.valor}' AND `
    }
    if (usuario) {
      query += `e.id_usuario = '${usuario.valor}' AND `
    }
    if (examen) {
      query += `e.id_ex = '${examen.valor}' AND `
    }
    if (paciente) {
      query += `e.id_pac = '${paciente.valor}' AND `
    }
    if (laboratorio) {
      query += `e.id_lab = '${laboratorio.valor}' AND `
    }



    query += `e.fecha between '${desde} 00:00:00' and '${hasta} 23:59:00'`


    let len = query.length
    if (query.endsWith('AND ')) {
      query = query.slice(0, len - 4)

    }

    const [examenes] = await pool.execute(query)








    res.status(200).json({ examenes, columnas: ['Id', 'Nombre', 'Seccion', 'Orden', 'Paciente', 'Laboratorio', 'Bioanalista', 'Categoria', 'Usuario', 'Fecha', 'PDF'] })
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getBioanalistasReportes = async (req, res) => {
  try {


    let query = `SELECT DISTINCT b.nombre, b.id,b.colegio, b.ministerio,b.telefono,b.direccion FROM laboratorio.bioanalistas b INNER JOIN laboratorio.examenes_paciente e ON e.id_bio = b.id INNER JOIN laboratorio.pacientes p ON p.id = e.id_pac INNER JOIN laboratorio.examenes ex ON ex.id = e.id_ex INNER JOIN laboratorio.seccion_examen s ON s.id= ex.id_seccion INNER JOIN laboratorio.categoria_examen ct ON ct.id = ex.id_categoria WHERE e.status='activo' AND `

    const { filtrosValue, desde, hasta } = req.body

    const bioanalista = filtrosValue.find(e => e.columna == 'bioanalista')

    if (bioanalista) {
      const [bioanalistas] = await pool.execute(`SELECT * FROM bioanalistas where id='${bioanalista.valor}'`)








      res.status(200).json({ bioanalistas, columnas: ['Id', 'Nombre', 'Colegio', 'Ministerio', 'Telefono', 'Direccion'] })
      return
    }

    const empresa = filtrosValue.find(e => e.columna == 'empresa')

    const paciente = filtrosValue.find(e => e.columna == 'paciente')

    const categoria = filtrosValue.find(e => e.columna == 'categoria')

    const seccion = filtrosValue.find(e => e.columna == 'seccion')

    const sede = filtrosValue.find(e => e.columna == 'sede')

    const examen = filtrosValue.find(e => e.columna == 'examen')

    let fecha = await pool.execute(`SELECT CURRENT_DATE`)
    let fechaActual = fecha[0][0].CURRENT_DATE.toJSON().split('T')[0]
    let year = fechaActual.split('-')[0]


    if (empresa) {
      query += `o.clave= '${empresa.valor}' AND `
    }
    if (sede) {
      query += `e.id_sede = '${sede.valor}' AND `
    }
    if (examen) {
      query += `e.id_ex = '${examen.valor}' AND `
    }
    if (seccion) {
      query += `e.id_ex IN (SELECT id FROM examenes WHERE id_seccion = '${seccion.valor}' ${categoria ? `AND id_categoria = '${categoria.valor}'` : ``}) AND `
    } else {
      if (categoria) {
        query += `e.id_ex IN (SELECT id FROM examenes WHERE id_categoria = '${categoria.valor}') AND `
      }
    }
    if (paciente) {
      query += `e.id_pac = '${paciente.valor}' AND `
    }


    query += `e.fecha between '${desde} 00:00:00' and '${hasta} 23:59:00'`


    let len = query.length
    if (query.endsWith('AND ')) {
      query = query.slice(0, len - 4)

    }

    const [bioanalistas] = await pool.execute(query)








    res.status(200).json({ bioanalistas, columnas: ['Id', 'Nombre', 'Colegio', 'Ministerio', 'Telefono', 'Direccion'] })
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getOrdenesReportes = async (req, res) => {
  try {


    let query = `SELECT DISTINCT o.id as 'id', o.orden as 'orden', o.clave as 'clave', sd.nombre as 'sede',p.nombre as 'paciente',b.nombre as 'bioanalista',o.fecha as 'fecha' ,o.expediente as 'expediente' FROM laboratorio.ordenes o INNER JOIN laboratorio.pacientes p ON o.id_paciente = p.id INNER JOIN laboratorio.examenes_paciente e ON o.id = e.id_orden INNER JOIN laboratorio.sede sd ON sd.id=e.id_sede INNER JOIN laboratorio.bioanalistas b ON e.id_bio = b.id WHERE e.status='activo' AND `
    const { filtrosValue, desde, hasta } = req.body

    const orden = filtrosValue.find(e => e.columna == 'orden')

    if (orden) {

      const [ordenes] = await pool.execute(`SELECT DISTINCT o.id as 'id', o.orden as 'orden', o.clave as 'clave', sd.nombre as 'sede',p.nombre as 'paciente',b.nombre as 'bioanalista',o.fecha as 'fecha' ,o.expediente as 'expediente' FROM laboratorio.ordenes o INNER JOIN laboratorio.pacientes p ON o.id_paciente = p.id INNER JOIN laboratorio.examenes_paciente e ON o.id = e.id_orden INNER JOIN laboratorio.sede sd ON sd.id=e.id_sede INNER JOIN laboratorio.bioanalistas b ON e.id_bio = b.id WHERE o.id='${orden.valor}'`)

      res.status(200).json({ ordenes, columnas: ['Id', 'Orden', 'Empresa', 'Sede', 'Paciente', 'Bioanalista', 'Expediente', 'Fecha', 'Examenes'] })
      return
    }

    const empresa = filtrosValue.find(e => e.columna == 'empresa')

    const paciente = filtrosValue.find(e => e.columna == 'paciente')

    const genero = filtrosValue.find(e => e.columna == 'genero')

    const usuario = filtrosValue.find(e => e.columna == 'usuario')

    const hastaEdad = filtrosValue.find(e => e.columna == 'hasta')

    const desdeEdad = filtrosValue.find(e => e.columna == 'desde')

    const expediente = filtrosValue.find(e => e.columna == 'expediente')

    const bioanalista = filtrosValue.find(e => e.columna == 'bioanalista')

    const sede = filtrosValue.find(e => e.columna == 'sede')

    const examen = filtrosValue.find(e => e.columna == 'examen')

    let fecha = await pool.execute(`SELECT CURRENT_DATE`)
    let fechaActual = fecha[0][0].CURRENT_DATE.toJSON().split('T')[0]
    let year = fechaActual.split('-')[0]

    if (desdeEdad) {
      let fechaHasta
      let fechaDesde = fechaActual.replace(year, year - desdeEdad.valor)
      if (hastaEdad) {
        fechaHasta = fechaActual.replace(year, year - hastaEdad.valor - 1)
        query += `p.fecha_nacimiento between '${fechaHasta}' and '${fechaDesde}' AND `
      }


    }

    if (empresa) {
      query += `o.clave= '${empresa.valor}' AND `
    }
    if (genero) {
      query += `p.genero = '${genero.valor}' AND `
    }
    if (sede) {
      query += `e.id_sede = '${sede.valor}' AND `
    }
    if (usuario) {
      query += `e.id_usuario = '${usuario.valor}' AND `
    }
    if (bioanalista) {
      query += `o.id_bio = '${bioanalista.valor}' AND `
    }
    if (examen) {
      query += `e.id_ex = '${examen.valor}' AND `
    }

    if (paciente) {
      query += `o.id_paciente = '${paciente.valor}' AND `
    }
    if (expediente) {
      query += `o.expediente = '${expediente.valor}' AND `
    }


    query += `o.fecha between '${desde} 00:00:00' and '${hasta} 23:59:00'`


    let len = query.length
    if (query.endsWith('AND ')) {
      query = query.slice(0, len - 4)

    }
    console.log(query)

    const [ordenes] = await pool.execute(query)








    res.status(200).json({ ordenes, columnas: ['Id', 'Orden', 'Empresa', 'Sede', 'Paciente', 'Bioanalista', 'Expediente', 'Fecha', 'Examenes'] })
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getPacientesReportes = async (req, res) => {
  try {



    let query = `SELECT DISTINCT p.id,p.cedula,p.nombre,p.telefono,p.genero,p.fecha_nacimiento,p.direccion FROM laboratorio.pacientes p INNER JOIN laboratorio.ordenes o ON p.id=o.id_paciente INNER JOIN laboratorio.examenes_paciente e ON e.id_pac = o.id_paciente WHERE e.status='activo' AND `
    const { filtrosValue, desde, hasta } = req.body


    const paciente = filtrosValue.find(e => e.columna == 'paciente')
    if (paciente) {

      const [pacientes] = await pool.execute(`SELECT * FROM pacientes where id = ${paciente.valor}`)








      res.status(200).json({ pacientes, columnas: ['Id', 'Cedula', 'Nombre', 'Genero', 'Edad', 'Telefono', 'Direccion', 'Examenes'] })
      return
    }



    const empresa = filtrosValue.find(e => e.columna == 'empresa')

    const genero = filtrosValue.find(e => e.columna == 'genero')

    const usuario = filtrosValue.find(e => e.columna == 'usuario')

    const hastaEdad = filtrosValue.find(e => e.columna == 'hasta')

    const desdeEdad = filtrosValue.find(e => e.columna == 'desde')

    const categoria = filtrosValue.find(e => e.columna == 'categoria')

    const seccion = filtrosValue.find(e => e.columna == 'seccion')

    const bioanalista = filtrosValue.find(e => e.columna == 'bioanalista')

    const sede = filtrosValue.find(e => e.columna == 'sede')

    const examen = filtrosValue.find(e => e.columna == 'examen')

    let fecha = await pool.execute(`SELECT CURRENT_DATE`)
    let fechaActual = fecha[0][0].CURRENT_DATE.toJSON().split('T')[0]
    let year = fechaActual.split('-')[0]

    if (desdeEdad) {
      let fechaHasta
      let fechaDesde = fechaActual.replace(year, year - desdeEdad.valor)
      if (hastaEdad) {
        fechaHasta = fechaActual.replace(year, year - hastaEdad.valor - 1)
        query += `p.fecha_nacimiento between '${fechaHasta}' and '${fechaDesde}' AND `
      }


    }

    if (empresa) {
      query += `o.clave= '${empresa.valor}' AND `
    }
    if (genero) {
      query += `p.genero = '${genero.valor}' AND `
    }
    if (sede) {
      query += `e.id_sede = '${sede.valor}' AND `
    }
    if (usuario) {
      query += `e.id_usuario = '${usuario.valor}' AND `
    }
    if (bioanalista) {
      query += `e.id_bio = '${bioanalista.valor}' AND `
    }
    if (examen) {
      query += `e.id_ex = '${examen.valor}' AND `
    }
    if (seccion) {
      query += `e.id_ex IN (SELECT id FROM examenes WHERE id_seccion = '${seccion.valor}' ${categoria ? `AND id_categoria = '${categoria.valor}'` : ``}) AND `
    } else {
      if (categoria) {
        query += `e.id_ex IN (SELECT id FROM examenes WHERE id_categoria = '${categoria.valor}') AND `
      }
    }

    let len = query.length


    query += `e.fecha between '${desde} 00:00:00' and '${hasta} 23:59:00'`
    if (query.endsWith('AND ')) {
      query = query.slice(0, len - 4)

    }
    const [pacientes] = await pool.execute(query)

    res.status(200).json({ pacientes, columnas: ['Id', 'Cedula', 'Nombre', 'Genero', 'Edad', 'Telefono', 'Direccion', 'Examenes'] })

  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};