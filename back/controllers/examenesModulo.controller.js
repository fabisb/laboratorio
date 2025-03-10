import { pool } from "../database/db.js";
export const getSecciones = async (req, res) => {
  try {
    const [secciones] = await pool.execute("SELECT * FROM seccion_examen WHERE status='activo'");
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
export const getEmpresas = async (req, res) => {
  try {
    const [empresas] = await pool.execute("SELECT * FROM empresas WHERE status='activo'");
    if (empresas.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran empresas" });
    } else {
      return await res.status(200).json(empresas);
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
    const [sedes] = await pool.execute("SELECT * FROM sede WHERE status='activo'");
    if (sedes.length == 0) {
      return await res.status(404).json({ mensaje: "No se encuentran sedes" });
    } else {
      return await res.status(200).json(sedes);
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
    const [categorias] = await pool.execute("SELECT * FROM categoria_examen WHERE status='activo'");
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

export const getLaboratorios = async (req, res) => {
  try {
    const [laboratorios] = await pool.execute(
      "SELECT * FROM laboratorios_externos WHERE status='activo'"
    );
    if (laboratorios.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran laboratorios" });
    } else {
      return await res.status(200).json(laboratorios);
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const getCaracteristicasById = async (req, res) => {
  let caracteristicas = [];
  const { id } = req.query;
  try {
    const [caracteristicasDet] = await pool.execute(
      "SELECT * FROM detalles_examen WHERE id_ex = ? and status ='activo'",
      [id]
    );
    const [titulos] = await pool.execute(
      "SELECT * FROM titulos WHERE id_ex = ?",
      [id]
    );
    if (caracteristicasDet.length == 0) {
      return await res
        .status(404)
        .json({ mensaje: "No se encuentran caracteristicas" });
    } else {
      caracteristicas = [...caracteristicasDet, ...titulos]
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
    const [examenes] = await pool.execute("SELECT * FROM examenes WHERE status='activo'");
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
    const [seccion] = await pool.execute(
      "SELECT * FROM seccion_examen WHERE id = ?",
      [examenes[0].id_seccion]
    );
    const [titulos] = await pool.execute(
      "SELECT * FROM titulos WHERE id_ex = ?",
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
          .json({
            examen: examenes[0],
            detalles,
            rangos,
            resultados,
            subCa,
            seccion,
            titulos
          });
      } else {
        return await res
          .status(200)
          .json({ examen: examenes[0], detalles, seccion, titulos });
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
    const { seccion, nombre, caracteristicas, categoria, titulos } = req.body;
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
      "SELECT nombre FROM examenes WHERE nombre = ? AND status= ? ",
      [nombre, 'activo']
    );
    if (nombreExistente.length > 0) {
      return await res.status(400).json({
        mensaje: "El nombre que intenta agregar para este examen ya existe",
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
          if (dato.nombre == "posicion" && dato.valor <= 0) {
            dato.valor = 500
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
        [nombre, seccion, categoria]
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
      if (titulos.length > 0) {
        await Promise.all(
          await titulos.map(async (t) => {
            const [titulos] = await pool.execute(
              "INSERT INTO `titulos`(`titulo`, `posicion`,`id_ex`) VALUES (?,?,?)",
              [
                t.titulo,
                t.posicion,
                examenNew.insertId
              ]
            );
          })
        );
      }

      return await res.status(200).json({
        mensaje: "Examen insertado correctamente",
        examenId: examenNew.insertId,
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
        examenId: idEx,
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const crearTitulo = async (req, res) => {
  const { titulo, posicion, id_ex } = req.body;
  try {
    if (!titulo || titulo == "") {
      return await res
        .status(400)
        .json({ mensaje: "Ingrese un nombre valido" });
    }
    const [nombreExistente] = await pool.execute(
      "SELECT titulo FROM titulos WHERE titulo = ? and id_ex =?",
      [titulo, id_ex]
    );
    if (nombreExistente.length > 0) {
      return await res.status(400).json({
        mensaje: "El titulo que intenta agregar para este examen ya existe",
      });
    } else {
      const [seccion] = await pool.execute(
        "INSERT INTO titulos (titulo,posicion,id_ex) VALUES (?,?,?)",
        [titulo, posicion, id_ex]
      );
      return await res.status(200).json({
        mensaje: "Titulo insertado correctamente",
        tituloId: seccion.insertId,
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
        mensaje: "El nombre que intenta agregar para esta sempresa ya existe",
      });
    } else {
      const [seccion] = await pool.execute(
        "INSERT INTO empresas (nombre) VALUES (?)",
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
    const [existenteName] = await pool.execute(
      "SELECT * FROM seccion_examen where nombre = ?",
      [nombre]
    );
    if (existenteName.length > 0) {
      return await res.status(200).json({
        mensaje: `La seccion no se ha podido ingresar por duplicidad en el nombre`,
      });
    }
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
export const updateExamenTabla = async (req, res) => {
  const { id_categoria, id_seccion, nombre, id_examen } = req.body;

  if (!id_seccion || id_seccion < 0 || isNaN(id_seccion)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la seccion enviado no es valido" });
  }
  if (!id_categoria || id_categoria < 0 || isNaN(id_categoria)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la categoria enviado no es valido" });
  }
  if (!id_categoria || id_categoria < 0 || isNaN(id_categoria)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la categoria enviado no es valido" });
  }
  if (!id_examen || id_examen < 0 || isNaN(id_examen)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del examen enviado no es valido" });
  }
  if (!nombre || nombre == "") {
    return await res
      .status(400)
      .json({ mensaje: "El nombre a ingresar no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM examenes where id = ?",
      [id_examen]
    );
    const [existenteName] = await pool.execute(
      "SELECT * FROM examenes where nombre = ? AND id != ?",
      [nombre, id_examen]
    );
    if (existenteName.length > 0) {
      return await res.status(400).json({
        mensaje: `El Examen no se ha podido ingresar por duplicidad en el nombre`,
      });
    }
    if (existente.length > 0) {
      await pool.execute(
        "UPDATE examenes SET nombre = ?, id_categoria=?, id_seccion=? WHERE id = ?",
        [nombre, id_categoria, id_seccion, id_examen]
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
export const updateEmpresa = async (req, res) => {
  const { id_empresa, nombre } = req.body;

  if (!id_empresa || id_empresa < 0 || isNaN(id_empresa)) {
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
        mensaje: `La empresa no se ha podido ingresar por duplicidad en el nombre`,
      });
    }
    const [existente] = await pool.execute(
      "SELECT * FROM empresas where id = ?",
      [id_empresa]
    );
    if (existente.length > 0) {
      await pool.execute(
        "UPDATE empresas SET nombre = ? WHERE id = ?",
        [nombre, id_empresa]
      );
      return await res.status(200).json({
        mensaje: `La empresa #${id_empresa} ha sido modificada correctamente`,
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id de la empresa no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateCategoria ~ error:", error);
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
    const [existenteName] = await pool.execute(
      "SELECT * FROM categoria_examen where nombre = ?",
      [nombre]
    );
    if (existenteName.length > 0) {
      return await res.status(200).json({
        mensaje: `La categoria no se ha podido ingresar por duplicidad en el nombre`,
      });
    }
    const [existente] = await pool.execute(
      "SELECT * FROM categoria_examen where id = ?",
      [id_categoria]
    );
    if (existente.length > 0) {
      await pool.execute(
        "UPDATE categoria_examen SET nombre = ? WHERE id = ?",
        [nombre, id_categoria]
      );
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

export const updateTitulo = async (req, res) => {
  const { id_titulo, titulo, posicion } = req.body;

  if (!id_titulo || id_titulo < 0 || isNaN(id_titulo)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la seccion enviado no es valido" });
  }
  if (!titulo || titulo == "") {
    return await res
      .status(400)
      .json({ mensaje: "El nombre a ingresar no es valido" });
  }
  try {
    const [existenteName] = await pool.execute(
      "SELECT * FROM titulos where titulo = ? and id != ?",
      [titulo, id_titulo]
    );
    if (existenteName.length > 0) {
      return await res.status(200).json({
        mensaje: `El titulo no se ha podido ingresar por duplicidad en el nombre`,
      });
    }
    const [existente] = await pool.execute(
      "SELECT * FROM titulos where id = ?",
      [id_titulo]
    );
    if (existente.length > 0) {
      const [tit] = await pool.execute(
        "UPDATE titulos SET titulo = ?, posicion = ? WHERE id = ?",
        [titulo, posicion, id_titulo]
      );
      return await res.status(200).json({
        mensaje: `EL titulo #${id_titulo} ha sido modificada correctamente`,
        examenId: existente[0].id_ex
      });

    } else {
      return await res
        .status(400)
        .json({ mensaje: "El id del titulo no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ updateTitulo ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
export const updateCaracteristica = async (req, res) => {
  const { id_caracteristica, caracteristica } = req.body;
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
            dato.valor = 500
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

export const deleteTitulo = async (req, res) => {
  const { id_titulo } = req.body;
  if (!id_titulo || id_titulo < 0 || isNaN(id_titulo)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del titulo no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM titulos WHERE id = ?",
      [id_titulo]
    );
    if (existente.length > 0) {
      const [resultadoDelete] = await pool.execute(
        "DELETE FROM `titulos` WHERE id = ?",
        [id_titulo]
      );
      return await res.status(200).json({
        mensaje: "Titulo eliminado correctamente", examenId: existente[0].id_ex
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El titulo que intenta eliminar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteResultado ~ error:", error);
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

export const deleteExamen = async (req, res) => {
  const { id } = req.body
  if (!id || id < 0 || isNaN(id)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del examen no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM examenes WHERE id = ?",
      [id]
    );
    if (existente.length > 0) {
      const [CaNulo] = await pool.execute(
        "UPDATE `examenes` SET `status` = ? WHERE id = ?",
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
    console.log("🚀 ~ deleteExamen ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const deleteEmpresa = async (req, res) => {
  const { id } = req.body
  if (!id || id < 0 || isNaN(id)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la empresa no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM empresas WHERE id = ?",
      [id]
    );
    if (existente.length > 0) {
      if (existente[0].status == 'activo') {
        const [CaNulo] = await pool.execute(
          "UPDATE `empresas` SET `status` = ? WHERE id = ?",
          ["nulo", id]
        );
      } else {

        const [CaNulo] = await pool.execute(
          "UPDATE `empresas` SET `status` = ? WHERE id = ?",
          ["activo", id]
        );
      }
      return await res.status(200).json({
        mensaje: "Empresa anulada correctamente"
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "La empresa que intenta eliminar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteEmpresa ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const deleteSede = async (req, res) => {
  const { id } = req.body
  if (!id || id < 0 || isNaN(id)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la sede no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM sede WHERE id = ?",
      [id]
    );
    if (existente.length > 0) {
      if (existente[0].status == 'activo') {

        const [CaNulo] = await pool.execute(
          "UPDATE `sede` SET `status` = ? WHERE id = ?",
          ["nulo", id]
        );
      } else {
        const [CaNulo] = await pool.execute(
          "UPDATE `sede` SET `status` = ? WHERE id = ?",
          ["activo", id]
        );
      }
      return await res.status(200).json({
        mensaje: "Sede anulada correctamente"
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "La Sede que intenta eliminar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteSede ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};




export const deleteCategoria = async (req, res) => {
  const { id } = req.body
  if (!id || id < 0 || isNaN(id)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la categoria no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM categoria_examen WHERE id = ?",
      [id]
    );
    if (existente.length > 0) {
      const [CaNulo] = await pool.execute(
        "UPDATE `categoria_examen` SET `status` = ? WHERE id = ?",
        ["nulo", id]
      );
      return await res.status(200).json({
        mensaje: "Categoria anulada correctamente"
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "La Categoria que intenta eliminar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteCategoria ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};

export const deleteSeccion = async (req, res) => {
  const { id } = req.body
  if (!id || id < 0 || isNaN(id)) {
    return await res
      .status(400)
      .json({ mensaje: "El id de la seccion no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM seccion_examen WHERE id = ?",
      [id]
    );
    if (existente.length > 0) {
      const [CaNulo] = await pool.execute(
        "UPDATE `seccion_examen` SET `status` = ? WHERE id = ?",
        ["nulo", id]
      );
      return await res.status(200).json({
        mensaje: "Seccion anulada correctamente"
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "La Seccion que intenta eliminar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteSeccion ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};


export const deleteLaboratorio = async (req, res) => {
  const { id } = req.body
  if (!id || id < 0 || isNaN(id)) {
    return await res
      .status(400)
      .json({ mensaje: "El id del Laboratorio no es valido" });
  }
  try {
    const [existente] = await pool.execute(
      "SELECT * FROM laboratorios_externos WHERE id = ?",
      [id]
    );
    if (existente.length > 0) {
      if (existente[0].status == 'activo') {

        const [CaNulo] = await pool.execute(
          "UPDATE `laboratorios_externos` SET `status` = ? WHERE id = ?",
          ["nulo", id]
        );
      } else {
        const [CaActivo] = await pool.execute(
          "UPDATE `laboratorios_externos` SET `status` = ? WHERE id = ?",
          ["activo", id]
        );
      }
      return await res.status(200).json({
        mensaje: "Status laboratorio modificado correctamente"
      });
    } else {
      return await res
        .status(400)
        .json({ mensaje: "El Laboratorio que intenta modificar no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteLaboratorio ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};


