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
export const getCategorias = async (req, res) => {
  try {
    const [categorias] = await pool.execute("SELECT * FROM categoria_examen");
    if (categorias.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran categorias" });
    } else {
      return await res.status(200).json(categorias);
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};


export const getCaracteristicasById = async (req, res) => {
  console.log("aaabb");
  const { id } = req.query;
  try {
    const [caracteristicas] = await pool.execute(
      "SELECT * FROM detalles_examen WHERE id_ex = ?",
      [id]
    );
    if (caracteristicas.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran caracteristicas" });
    } else {
      return await res.status(200).json(caracteristicas);
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getExamenesBySec = async (req, res) => {
  const { id } = req.query;
  try {
    const [examenes] = await pool.execute(
      "SELECT * FROM examenes WHERE id_seccion = ?",
      [id]
    );
    if (examenes.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran caracteristicas" });
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
        "SELECT * FROM detalles_examen WHERE id_ex = ? AND status = 'activo'",
        [examenes[0].id]
      );
      if (detalles.length > 0) {
        let detallesIn = "";

        let detallesId = detalles.forEach((d) => (detallesIn += `'${d.id}',`));
        detallesIn = detallesIn.slice(0, -1);
        const [rangos] = await pool.execute(
          `SELECT * FROM rangos_detalle WHERE id_det_ex in (${detallesIn}) AND status = 'activo'`
        );
        const [resultados] = await pool.execute(
          `SELECT * FROM resultados_detalle WHERE id_det_ex in (${detallesIn})`
        );
        const [subCa] = await pool.execute(
          `SELECT * FROM subcaracteristicas_detalle WHERE id_det_ex in (${detallesIn}) AND status = 'activo'`
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

export const getExamenByCategoria = async (req, res) => {
  const { idSeccion } = req.query;
  try {
    const [examenes] = await pool.execute(
      "SELECT * FROM examenes WHERE id_categoria = ?",
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
    const { seccion, nombre, caracteristicas,categoria } = req.body;
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
      //VALIDACION
      for await (const ca of caracteristicas) {
        console.log("🚀 ~ awaitcaracteristicas.map ~ ca:", ca);
        for await (const dato of ca.caracteristica) {
          if (dato.nombre == "" || !dato.nombre) {
            return await res.status(400).json({
              mensaje: "Ingrese un nombre de caracteristica valido",
            });
          }
          if (dato.nombre == "nombre" && !dato.valor) {
            return await res.status(400).json({
              mensaje: "Ingrese un nombre valido para la caracteristica",
            });
          }
          if (
            dato.nombre == "impsiempre" &&
            dato.valor != 1 &&
            dato.valor != 0
          ) {
            return await res.status(400).json({
              mensaje:
                "Ingrese un Imprimir Siempre valido para la caracteristica",
            });
          }
        }

        /* detalle.insertId */
        if (ca.subCaracteristicas.length > 0) {
          for await (const sub of ca.subCaracteristicas) {
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
          }
        }
        if (ca.resultados.length > 0) {
          for await (const resu of ca.resultados) {
            if (resu == "") {
              return await res.status(400).json({
                mensaje: `El resultado '${resu}' no es valido`,
              });
            }
          }
        }
        if (ca.rangos.length > 0) {
          for await (const ran of ca.rangos) {
            if (isNaN(ran.inferior)) {
              return await res.status(400).json({
                mensaje: `El rango inferior: ${ran.inferior} no es valido`,
              });
            }
            if (isNaN(ran.superior)) {
              return await res.status(400).json({
                mensaje: `El rango superior: ${ran.superior} no es valido`,
              });
            }
          }
        }
      }
      //VALIDACION

      //INSERCION
      const [examenNew] = await pool.execute(
        "INSERT INTO examenes (nombre, id_seccion,id_categoria) VALUES (?,?,?)",
        [nombre, seccion,categoria]
      );
      /* examenNew.insertId */
      await Promise.all(
        await caracteristicas.map(async (ca) => {
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
          const [detalle] = await pool.execute(
            consulta,
            ca.caracteristica.map((dato) => {
              if (
                dato.nombre == "unidad" ||
                dato.nombre == "posicion" ||
                dato.nombre == "impsiempre"
              ) {
                return dato.valor;
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
        })
      );
      return await res.status(200).json({
        mensaje: "Examen insertado correctamente",
        examenId: examenNew.insertId
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const insertCaracteristica = async (req, res) => {
  try {
    const { caracteristicas, idEx } = req.body;
    console.log("🚀 ~ insertCaracteristica ~ req.body:", req.body);
    if (!idEx || idEx < 0 || isNaN(idEx)) {
      return await res
        .status(400)
        .json({ mensaje: "El id del examen no es valido" });
    }
    if (caracteristicas.length == 0) {
      return await res
        .status(400)
        .json({ mensaje: "Ingrese caracteristicas validas" });
    }

    const [nombreExistente] = await pool.execute(
      "SELECT * FROM examenes WHERE id = ? ",
      [idEx]
    );
    if (nombreExistente.length == 0) {
      return await res.status(400).json({
        mensaje:
          "El examen al que le intenta agregar la caracteristica, no existe",
      });
    } else {
      //VALIDACION
      for await (const ca of caracteristicas) {
        for await (const dato of ca.caracteristica) {
          if (dato.nombre == "" || !dato.nombre) {
            return await res.status(400).json({
              mensaje: "Ingrese un nombre de caracteristica valido",
            });
          }
          if (dato.nombre == "nombre" && !dato.valor) {
            return await res.status(400).json({
              mensaje: "Ingrese un nombre valido para la caracteristica",
            });
          }
          if (
            dato.nombre == "impsiempre" &&
            dato.valor != 1 &&
            dato.valor != 0
          ) {
            return await res.status(400).json({
              mensaje:
                "Ingrese un Imprimir Siempre valido para la caracteristica",
            });
          }
        }

        /* detalle.insertId */
        if (ca.subCaracteristicas.length > 0) {
          for await (const sub of ca.subCaracteristicas) {
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
          }
        }
        if (ca.resultados.length > 0) {
          for await (const resu of ca.resultados) {
            if (resu == "") {
              return await res.status(400).json({
                mensaje: `El resultado '${resu}' no es valido`,
              });
            }
          }
        }
        if (ca.rangos.length > 0) {
          for await (const ran of ca.rangos) {
            if (isNaN(ran.inferior)) {
              return await res.status(400).json({
                mensaje: `El rango inferior: ${ran.inferior} no es valido`,
              });
            }
            if (isNaN(ran.superior)) {
              return await res.status(400).json({
                mensaje: `El rango superior: ${ran.superior} no es valido`,
              });
            }
          }
        }
      }
      //VALIDACION

      /* examenNew.insertId */
      await Promise.all(
        await caracteristicas.map(async (ca) => {
          ca.caracteristica.push({
            nombre: "id_ex",
            valor: idEx,
          });
          const columnas = ca.caracteristica
            .map((dato) => dato.nombre)
            .join(", ");
          const valores = ca.caracteristica.map((dato) => "?").join(", ");
          const consulta = `INSERT INTO detalles_examen (${columnas}) VALUES (${valores})`;
          // Ejecutar la consulta
          const [detalle] = await pool.execute(
            consulta,
            ca.caracteristica.map((dato) => {
              if (
                dato.nombre == "unidad" ||
                dato.nombre == "posicion" ||
                dato.nombre == "impsiempre"
              ) {
                return dato.valor;
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
        })
      );
      return await res.status(200).json({
        mensaje: "Caracteristica insertada correctamente",
        examenId: idEx
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

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


export const crearCategoria = async (req, res) => {
  const { nombre } = req.body;
  try {
    if (!nombre || nombre == "") {
      return await res
        .status(400)
        .json({ mensaje: "Ingrese un nombre valido" });
    }
    const [nombreExistente] = await pool.execute(
      "SELECT nombre FROM categoria_examen WHERE nombre = ?",
      [nombre]
    );
    if (nombreExistente.length > 0) {
      return await res.status(400).json({
        mensaje: "El nombre que intenta agregar para esta Categoria ya existe",
      });
    } else {
      const [categoria] = await pool.execute(
        "INSERT INTO categoria_examen (nombre) VALUES (?)",
        [nombre]
      );
      return await res.status(200).json({
        mensaje: "Categoria insertada correctamente",
        categoriaId: categoria.insertId,
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};


export const updateExamen = async (req, res) => {
  const { id_examen, nombre, id_seccion } = req.body;
  if (!id_examen || id_examen < 0 || isNaN(id_examen)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del examen enviado no es valido" });
  }
  if (!id_seccion || id_seccion < 0 || isNaN(id_seccion)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la seccion enviado no es valido" });
  }
  if (!nombre || nombre == "") {
    return await res
      .status(400)
      .json({ mensaje: "El nombre a ingresar no es valido" });
  }
  try {
    const [existente] = await pool.execute("SELECT * FROM examen id = ?", [
      id_examen,
    ]);
    if (existente.length > 0) {
      await pool.execute(
        "UPDATE examenes SET nombre = ?, id_seccion = ? WHERE id = ?",
        [nombre, id_seccion, id_examen]
      );
      return await res.status(200).json({
        mensaje: `El examen #${id_examen} ha sido modificado correctamente`,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id del examen no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateExamen ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const updateSeccion = async (req, res) => {
  const { id_seccion, nombre } = req.body;

  if (!id_seccion || id_seccion < 0 || isNaN(id_seccion)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la seccion enviado no es valido" });
  }
  if (!nombre || nombre == "") {
    return await res
      .status(400)
      .json({ mensaje: "El nombre a ingresar no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM seccion_examen where id = ?",
      [id_seccion]
    );
    if (existente.length > 0) {
      await pool.execute("UPDATE seccion_examen SET nombre = ? WHERE id = ?", [
        nombre,
        id_seccion,
      ]);
      return await res.status(200).json({
        mensaje: `La seccion #${id_seccion} ha sido modificado correctamente`,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id de la seccion no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateSeccion ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const updateCategoria = async (req, res) => {
  const { id_categoria, nombre } = req.body;

  if (!id_categoria || id_categoria < 0 || isNaN(id_categoria)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la seccion enviado no es valido" });
  }
  if (!nombre || nombre == "") {
    return await res
      .status(400)
      .json({ mensaje: "El nombre a ingresar no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM categoria_examen where id = ?",
      [id_categoria]
    );
    if (existente.length > 0) {
      await pool.execute("UPDATE categoria_examen SET nombre = ? WHERE id = ?", [
        nombre,
        id_categoria,
      ]);
      return await res.status(200).json({
        mensaje: `La categoria #${id_categoria} ha sido modificada correctamente`,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id de la categoria no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateCategoria ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const updateCaracteristica = async (req, res) => {
  const { id_caracteristica, caracteristica } = req.body;
  console.log("🚀 ~ updateCaracteristica ~ req.body:", req.body);
  if (isNaN(id_caracteristica)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la caracteristica no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM detalles_examen WHERE id = ?",
      [id_caracteristica]
    );
    if (existente.length > 0) {
      const valores = caracteristica
        .map((dato) => {
          if (dato.nombre == "posicion" && dato.valor <= 0) {
            throw new Error(`La posición debe ser mayor a cero`);
          }
          return `${dato.nombre} = ?`;
        })
        .join(", ");
      caracteristica.push({ valor: id_caracteristica });
      const [update] = await pool.execute(
        `UPDATE detalles_examen SET ${valores} WHERE id = ?`,
        caracteristica.map((dato) => {
          if (dato.nombre == "impsiempre") {
            return dato.valor;
          } else if (dato.nombre == "posicion") {
            return dato.valor || 50;
          } else {
            return dato.valor || null;
          }
        })
      );
      console.log("🚀 ~ updateCaracteristica ~ update:", update);
      return await res.status(200).json({
        mensaje:
          "La caracteristica #" + id_caracteristica + " ha sido actualizada",
        update,
        examenId: existente[0].id_ex,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id de la caracteristica no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateCaracteristica ~ error:", error);
    if (error == "Error: La posición debe ser mayor a cero") {
      return await res
        .status(400)
        .json({ mensaje: "La posición debe ser mayor a cero" });
    } else {
      return await res
        .status(500)
        .json({ mensaje: "Ha ocurrido un error en el servidor" });
    }
  }
};

export const updateSubCaracteristica = async (req, res) => {
  const { id_subCaracteristica, subCaracteristica } = req.body;
  console.log("🚀 ~ updateSubCaracteristica ~ req.body:", req.body);
  if (
    !id_subCaracteristica ||
    id_subCaracteristica < 0 ||
    isNaN(id_subCaracteristica)
  ) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la subcaracteristica no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM subcaracteristicas_detalle WHERE id = ?",
      [id_subCaracteristica]
    );
    if (existente.length > 0) {
      const subCaracteristicaMap = Object.entries(subCaracteristica).map(
        ([key, value]) => {
          if (key != "id") {
            return { nombre: key, valor: value };
          }
        }
      );
      const valores = subCaracteristicaMap
        .map((dato) => {
          if (dato.nombre != "valor" && dato.valor == "") {
            throw new Error(
              `Ingrese un ${dato.nombre} valido para la sub caracteristica`
            );
          }
          return `${dato.nombre} = ?`;
        })
        .join(", ");
      subCaracteristicaMap.push({ valor: id_subCaracteristica });
      const [update] = await pool.execute(
        `UPDATE subcaracteristicas_detalle SET ${valores} WHERE id = ?`,
        subCaracteristicaMap.map((dato) => {
          if (dato.nombre == "valor") {
            return dato.valor || null;
          } else {
            return dato.valor;
          }
        })
      );
      return await res.status(200).json({
        mensaje:
          "La subCaracteristica #" +
          id_subCaracteristica +
          " ha sido actualizada correctamente",
        update,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id de la caracteristica no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateSubCaracteristica ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const updateRango = async (req, res) => {
  const { id_rango, rango } = req.body;
  const { desde, hasta, inferior, superior, genero } = rango;
  if (
    isNaN(id_rango) ||
    isNaN(desde) ||
    isNaN(hasta) ||
    isNaN(inferior) ||
    isNaN(superior)
  ) {
    return await res
      .status(400)
      .json({ mensaje: "Alguno de los valores no son numericos" });
  }
  if (
    inferior == null ||
    superior == null ||
    inferior == "" ||
    superior == ""
  ) {
    return await res
      .status(400)
      .json({ mensaje: "Los valores inferior o superior no son validos" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM rangos_detalle WHERE id = ?",
      [id_rango]
    );
    if (existente.length > 0) {
      const [update] = await pool.execute(
        "UPDATE rangos_detalle SET desde = ?, hasta = ?, inferior = ?, superior = ?, genero = ? WHERE id = ?",
        [
          desde || null,
          hasta || null,
          inferior,
          superior,
          genero || null,
          id_rango,
        ]
      );
      return await res.status(200).json({
        mensaje: "El rango #" + id_rango + " ha sido actualizado correctamente",
        update,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id del rango no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateRango ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const updateResultados = async (req, res) => {
  const { id_resultado, resultado } = req.body;
  if (!id_resultado || id_resultado < 0 || isNaN(id_resultado)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del resultado no es valido" });
  }
  if (resultado == "") {
    return await res.status(400).json({ mensaje: "El resultado no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM resultados_detalle WHERE id = ?",
      [id_resultado]
    );
    if (existente.length > 0) {
      const [update] = await pool.execute(
        "UPDATE resultados_detalle SET resultado = ? WHERE id = ?",
        [resultado, id_resultado]
      );
      return await res.status(200).json({
        mensaje:
          "El resultado #" +
          id_resultado +
          " ha sido actualizado correctamente",
        update,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id del resultado no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateResultados ~ error:", error);

    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const insertSubCaracteristica = async (req, res) => {
  const { newSubCaracteristica } = req.body;

  const { idCar: id_caracteristica } = newSubCaracteristica;
  if (!id_caracteristica || id_caracteristica < 0 || isNaN(id_caracteristica)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la subcaracteristica no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM detalles_examen WHERE id = ?",
      [id_caracteristica]
    );
    if (existente.length > 0) {
      if (newSubCaracteristica.tipo == "" || !newSubCaracteristica.tipo) {
        return await res.status(400).json({
          mensaje: "Ingrese un tipo de sub-caracteristica valido",
        });
      }
      if (newSubCaracteristica.nombre == "" || !newSubCaracteristica.nombre) {
        return await res.status(400).json({
          mensaje: "Ingrese un nombre de sub-caracteristica valido",
        });
      }
      const [subCa] = await pool.execute(
        "INSERT INTO `subcaracteristicas_detalle`(`tipo`, `nombre`, `valor`, `id_det_ex`) VALUES (?,?,?,?)",
        [
          newSubCaracteristica.tipo,
          newSubCaracteristica.nombre,
          newSubCaracteristica.valor,
          id_caracteristica,
        ]
      );
      return await res.status(200).json({
        examenId: existente[0].id_ex,
        mensaje: "Sub Caracteristica insertada correctamente",
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id de la caracteristica no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ insertSubCaracteristica ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const insertRango = async (req, res) => {
  const { id_caracteristica, rango } = req.body;
  console.log("🚀 ~ insertRango ~ req.body:", req.body);
  const { desde, hasta, inferior, superior, genero } = rango;
  if (
    isNaN(id_caracteristica) ||
    isNaN(desde) ||
    isNaN(hasta) ||
    isNaN(inferior) ||
    isNaN(superior)
  ) {
    return await res
      .status(400)
      .json({ mensaje: "Alguno de los valores no son numericos" });
  }
  if (
    inferior == null ||
    superior == null ||
    inferior == "" ||
    superior == ""
  ) {
    return await res
      .status(400)
      .json({ mensaje: "Los valores inferior o superior no son validos" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM detalles_examen WHERE id = ?",
      [id_caracteristica]
    );
    if (existente.length > 0) {
      const [nuevoRango] = await pool.execute(
        "INSERT INTO rangos_detalle (`id_det_ex`, `desde`, `hasta`, `inferior`, `superior`, `genero`) VALUES (?,?,?,?,?,?)",
        [id_caracteristica, desde, hasta, inferior, superior, genero]
      );
      return await res.status(200).json({
        mensaje: "Rango insertado correctamente",
        examenId: existente[0].id_ex,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id del rango no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateRango ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const insertResultado = async (req, res) => {
  const { id_caracteristica, resultado } = req.body;

  if (!id_caracteristica || id_caracteristica < 0 || isNaN(id_caracteristica)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la caracteristica no es valido" });
  }
  if (resultado == "" || resultado == null || resultado == undefined) {
    return await res
      .status(400)
      .json({ mensaje: "El campo de resultado no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM detalles_examen WHERE id = ?",
      [id_caracteristica]
    );
    if (existente.length > 0) {
      const [resultadoInsertado] = await pool.execute(
        "INSERT INTO `resultados_detalle`(`resultado`, `id_det_ex`) VALUES (?,?)",
        [resultado, id_caracteristica]
      );
      return await res.status(200).json({
        examenId: existente[0].id_ex,
        mensaje: "Resultado insertado correctamente",
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id de la caracteristica no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ insertResultado ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const deleteResultado = async (req, res) => {
  const { id_resultado } = req.body;
  if (!id_resultado || id_resultado < 0 || isNaN(id_resultado)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del resultado no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM resultados_detalle WHERE id = ?",
      [id_resultado]
    );
    if (existente.length > 0) {
      const [resultadoDelete] = await pool.execute(
        "DELETE FROM `resultados_detalle` WHERE id = ?",
        [id_resultado]
      );
      return await res.status(200).json({
        mensaje: "Resultado eliminado correctamente",
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El resultado que intenta eliminar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteResultado ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const deleteRango = async (req, res) => {
  const { id_rango } = req.body;
  if (!id_rango || id_rango < 0 || isNaN(id_rango)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del rango no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM rangos_detalle WHERE id = ?",
      [id_rango]
    );
    if (existente.length > 0) {
      const [rangoDelete] = await pool.execute(
        "UPDATE `rangos_detalle` SET `status` = ? WHERE id = ?",
        ["nulo", id_rango]
      );
      return await res.status(200).json({
        mensaje: "Rango eliminado correctamente",
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El rango que intenta eliminar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteRango ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const deleteSubCaracteristica = async (req, res) => {
  const { id_subCa } = req.body;
  if (!id_subCa || id_subCa < 0 || isNaN(id_subCa)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la sub caracteristica no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM subcaracteristicas_detalle WHERE id = ?",
      [id_subCa]
    );
    if (existente.length > 0) {
      const [subCaNulo] = await pool.execute(
        "UPDATE `subcaracteristicas_detalle` SET `status` = ? WHERE id = ?",
        ["nulo", id_subCa]
      );
      return await res.status(200).json({
        mensaje: "Sub Caracteristica anulada correctamente",
      });
    } else {
      return await res.status(400).json({
        mensaje: "La sub caracteristica que intenta eliminar no existe",
      });
    }
  } catch (error) {
    console.log("🚀 ~ deleteSubCaracteristica ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const deleteCaracteristica = async (req, res) => {
  const { id_ca } = req.body;
  if (!id_ca || id_ca < 0 || isNaN(id_ca)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la caracteristica no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM detalles_examen WHERE id = ?",
      [id_ca]
    );
    if (existente.length > 0) {
      const [CaNulo] = await pool.execute(
        "UPDATE `detalles_examen` SET `status` = ? WHERE id = ?",
        ["nulo", id_ca]
      );
      return await res.status(200).json({
        mensaje: "Caracteristica anulada correctamente",
        examenId: existente[0].id_ex,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "La caracteristica que intenta eliminar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteCaracteristica ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
