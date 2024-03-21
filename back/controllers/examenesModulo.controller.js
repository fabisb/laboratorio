import { pool } from "../database/db.js";
export const getSecciones = async (req, res) => {
  try {
    const [secciones] = await pool.execute("SELECT * FROM seccion_examen");
    if (secciones.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran secciones" });
    } else {
      return await res.status(200).json(secciones);
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getExamenByNombre = async (req, res) => {
  const { nombre } = req.query;
  try {
    const [examenes] = await pool.execute(
      "SELECT * FROM examenes WHERE nombre = ?",
      [nombre]
    );
    if (examenes.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran examenes" });
    } else {
      return await res.status(200).json(examenes);
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
    if (examenes.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran examenes" });
    } else {
      return await res.status(200).json(examenes);
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getExamenById = async (req, res) => {
  const { idExamen } = req.query;
  try {
    const [examenes] = await pool.execute(
      "SELECT * FROM examenes WHERE id = ?",
      [idExamen]
    );
    if (examenes.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran examenes" });
    } else {
      //return await res.status(200).json(examenes);
      const [detalles] = await pool.execute(
        "SELECT * FROM detalles_examen WHERE id_ex = ?",
        [examenes[0].id]
      );
      if (detalles.length > 0) {
        const [rangos] = await pool.execute(
          "SELECT * FROM rangos_detalle WHERE id_det_ex = ?",
          [detalles[0].id]
        );
        const [resultados] = await pool.execute(
          "SELECT * FROM resultados_detalle WHERE id_det_ex = ?",
          [detalles[0].id]
        );
        const [subCa] = await pool.execute(
          "SELECT * FROM subcaracteristicas_detalle WHERE id_det_ex = ?",
          [detalles[0].id]
        );
        return await res
          .status(200)
          .json({ examen: examenes[0], detalles, rangos, resultados, subCa });
      } else {
        return await res.status(200).json({ examen: examenes[0], detalles });
      }
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const getExamenBySeccion = async (req, res) => {
  const { idSeccion } = req.query;
  try {
    const [examenes] = await pool.execute(
      "SELECT * FROM examenes WHERE id_seccion = ?",
      [idSeccion]
    );
    if (examenes.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran examenes" });
    } else {
      return await res.status(200).json(examenes);
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const crearExamen = async (req, res) => {
  try {
    const { seccion, nombre, caracteristicas } = req.body;
    console.log("🚀 ~ crearExamen ~ req.body:", req.body);
    if (!nombre || nombre == "") {
      return await res
        .status(400)
        .json({ mensaje: "Ingrese un nombre valido" });
    }
    if (!seccion) {
      return await res
        .status(400)
        .json({ mensaje: "Ingrese una seccion valida" });
    }
    if (caracteristicas.length == 0) {
      return await res
        .status(400)
        .json({ mensaje: "Ingrese caracteristicas validas" });
    }
    const [nombreExistente] = await pool.execute(
      "SELECT nombre FROM examenes WHERE nombre = ? ",
      [nombre]
    );
    if (nombreExistente.length > 0) {
      return await res.status(400).json({
        mensaje: "El nombre que intenta agregar para este examen ya existe",
      });
    } else {
      const [examenNew] = await pool.execute(
        "INSERT INTO examenes (nombre, id_seccion) VALUES (?,?)",
        [nombre, seccion]
      );
      /* examenNew.insertId */
      await Promise.all(
        await caracteristicas.map(async (ca) => {
          console.log("🚀 ~ awaitcaracteristicas.map ~ ca:", ca);
          ca.caracteristica.push({
            nombre: "id_ex",
            valor: examenNew.insertId,
          });
          const columnas = ca.caracteristica
            .map((dato) => dato.nombre)
            .join(", ");
          const valores = ca.caracteristica.map((dato) => "?").join(", ");
          const consulta = `INSERT INTO detalles_examen (${columnas}) VALUES (${valores})`;
          // Ejecutar la consulta
          console.log("🚀 ~ awaitcaracteristicas.map ~ consulta:", consulta);
          const [detalle] = await pool.execute(
            consulta,
            ca.caracteristica.map((dato) => {
              if (dato.nombre == "impsiempre") {
                return dato.valor;
              } else if (dato.nombre == "posicion") {
                return dato.valor || 50;
              } else {
                return dato.valor || null;
              }
            })
          );
          /* detalle.insertId */
          if (ca.subCaracteristicas.length > 0) {
            await Promise.all(
              await ca.subCaracteristicas.map(async (sub) => {
                if (sub.tipo == "" || !sub.tipo) {
                  return await res.status(400).json({
                    mensaje: "Ingrese un tipo de sub-caracteristica valido",
                  });
                }
                if (sub.nombre == "" || !sub.nombre) {
                  return await res.status(400).json({
                    mensaje: "Ingrese un nombre de sub-caracteristica valido",
                  });
                }
                const [subCa] = await pool.execute(
                  "INSERT INTO `subcaracteristicas_detalle`(`tipo`, `nombre`, `valor`, `id_det_ex`) VALUES (?,?,?,?)",
                  [sub.tipo, sub.nombre, sub.valor, detalle.insertId]
                );
              })
            );
          }

          if (ca.resultados.length > 0) {
            await Promise.all(
              await ca.resultados.map(async (resu) => {
                const [resultados] = await pool.execute(
                  "INSERT INTO `resultados_detalle`(`resultado`, `id_det_ex`) VALUES (?,?)",
                  [resu, detalle.insertId]
                );
              })
            );
          }
          if (ca.rangos.length > 0) {
            await Promise.all(
              await ca.rangos.map(async (ran) => {
                const [rangos] = await pool.execute(
                  "INSERT INTO `rangos_detalle`(`id_det_ex`, `desde`, `hasta`, `inferior`, `superior`, `genero`) VALUES (?,?,?,?,?,?)",
                  [
                    detalle.insertId,
                    ran.desde,
                    ran.hasta,
                    ran.inferior,
                    ran.superior,
                    ran.genero,
                  ]
                );
              })
            );
          }
          return await res.status(200).json({
            mensaje: "Examen insertado correctamente",
          });
        })
      );
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
/* examen: 'nombre',
seccion:'seccion',
caracteristicas: [
    {
        "caracteristica": [
            {
                "nombre": "nombre",
                "valor": "dsa"
            },
            {
                "nombre": "unidad",
                "valor": "ml"
            },
            {
                "nombre": "posicion",
                "valor": "1"
            },
            {
                "nombre": "imp",
                "valor": false
            }
        ],
        "subCaracteristicas": [
            {
                "tipo": "numero",
                "nombre": "hematocrito",
                "valor": ""
            },
            {
                "tipo": "formula",
                "nombre": "hematocrito calculado",
                "valor": "{hematocrito}[*]{0.23}"
            }
        ],
        "rangos": [
            {
                "inferior": "10",
                "superior": "20",
                "desde": "10",
                "hasta": "15",
                "genero": "masculino"
            },
            {
                "inferior": "",
                "superior": "",
                "desde": "",
                "hasta": "",
                "genero": "todos"
            }
        ],
        "resultados": [
            "azul",
            "verde"
        ]
    }
]  */
export const crearSeccion = async (req, res) => {
  const { nombre } = req.body;
  try {
    if (!nombre || nombre == "") {
      return await res
        .status(400)
        .json({ mensaje: "Ingrese un nombre valido" });
    }
    const [nombreExistente] = await pool.execute(
      "SELECT nombre FROM seccion_examen WHERE nombre = ?",
      [nombre]
    );
    if (nombreExistente.length > 0) {
      return await res.status(400).json({
        mensaje: "El nombre que intenta agregar para esta seccion ya existe",
      });
    } else {
      const [seccion] = await pool.execute(
        "INSERT INTO seccion_examen (nombre) VALUES (?)",
        [nombre]
      );
      return await res.status(200).json({
        mensaje: "Seccion insertada correctamente",
        seccionId: seccion.insertId,
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
