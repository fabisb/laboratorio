import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../database/db.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publics = path.join(__dirname, "../public");
/* export const loginController2 = async (req, res, next) => {
  const { user, pass } = req.body;
  if (!(user || pass) || user == "" || pass == "") {
    return await res
      .status(422)
      .json({ mensaje: "Error al iniciar sesion, valide los datos" });
  }
  try {
    const [id] = await pool.execute(
      "SELECT id, nivel FROM users WHERE cedula = ? AND password = ?",
      [user, pass]
    );
    if (id.length > 0) {
      var token = await jwt.sign(
        { id: id[0].id, user, nivel: id[0].nivel },
        "secret",
        {
          expiresIn: "1 days",
        }
      );

      return await res.status(200).json({ token, user });
    } else {
      return await res.status(404).json({
        mensaje:
          "No se han encontrado informacion con ese usuario o contraseña",
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
}; */
export const getSedes = async (req, res) => {
  try {
    const [sedes] = await pool.execute("SELECT * FROM sede");
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
export const loginController = async (req, res, next) => {
  const { user, pass } = req.body;
  if (!(user || pass) || user == "" || pass == "") {
    return await res
      .status(422)
      .json({ mensaje: "Error al iniciar sesion, valide los datos" });
  }
  try {
    const [id] = await pool.execute(
      "SELECT id, nivel, password, nombre, cedula FROM users WHERE cedula = ?",
      [user]
    );

    if (id.length > 0) {
      const comparacionClave = await bcrypt.compare(pass, id[0].password);

      if (comparacionClave) {
        var token = await jwt.sign(
          {
            id: id[0].id,
            user,
            nivel: id[0].nivel,
            nombre: id[0].nombre,
            cedula: id[0].cedula,
          },
          "secret",
          {
            expiresIn: "1 days",
          }
        );

        return await res.status(200).json({
          token,
          user,
          nivel: id[0].nivel,
          nombre: id[0].nombre,
          cedula: id[0].cedula,
          id: id[0].id,
        });
      } else {
        return await res.status(404).json({
          mensaje: "Contraseña no valida",
        });
      }
    } else {
      return await res.status(404).json({
        mensaje: "No se ha encontrado usuario con esa cedula",
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
/* export const loginController1 = async (req, res, next) => {
  console.log("loginController1");
  const { user, pass } = req.body;
  if (!(user || pass) || user == "" || pass == "") {
    return await res
      .status(422)
      .json({ mensaje: "Error al iniciar sesion, valide los datos" });
  }

  try {
    const [idCoordinador] = await pool.execute(
      "SELECT id, nivel, password FROM coordinador WHERE cedula = ?",
      [user]
    );
    if (idCoordinador.length > 0) {
      const comparacionClave = await bcrypt.compare(
        pass,
        idCoordinador[0].password
      );
      if (comparacionClave) {
        var token = await jwt.sign(
          { id: idCoordinador[0].id, user, nivel: idCoordinador[0].nivel },
          "secret",
          {
            expiresIn: "1 days",
          }
        );

        return await res.status(200).json({ token, user });
      } else {
        return await res.status(404).json({
          mensaje: "Contraseña no valida",
        });
      }
    } else {
      const [idAdministrador] = await pool.execute(
        "SELECT id, nivel, password FROM administrador WHERE cedula = ?",
        [user]
      );
      if (idAdministrador.length > 0) {
        const comparacionClave = await bcrypt.compare(
          pass,
          idAdministrador[0].password
        );
        if (comparacionClave) {
          var token = await jwt.sign(
            {
              id: idAdministrador[0].id,
              user,
              nivel: idAdministrador[0].nivel,
            },
            "secret",
            {
              expiresIn: "1 days",
            }
          );

          return await res.status(200).json({ token, user });
        } else {
          return await res.status(404).json({
            mensaje: "Contraseña no valida",
          });
        }
      } else {
        return await res.status(404).json({
          mensaje: "No se han encontrado informacion con ese usuario",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
 */
export const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  try {
    var decoded = await jwt.verify(token, "secret");
    if (decoded) {
      req.user = decoded;
      /* return await res.status(401).json({
          mensaje: "Su nivel de usuario no esta autorizado para esta peticion",
        }); */
      await next();
    }
  } catch (err) {
    // err
    console.log(err);
    return await res.status(401).sendFile(path.join(publics, "/401.html"));
  }
};
export const administradorToken = async (req, res, next) => {
  const { token } = req.headers;
  try {
    var decoded = await jwt.verify(token, "secret");
    if (decoded) {
      req.user = decoded;
      if (decoded.nivel == 1) {
        await next();
      } else {
        return await res.status(401).json({
          mensaje: "Su nivel de usuario no esta autorizado para esta peticion",
        });
      }
    }
  } catch (err) {
    // err
    console.log(err);
    return await res.status(401).json({
      mensaje: "Su nivel de usuario no esta autorizado para esta peticion",
    });
  }
};
export const bioanalistaToken = async (req, res, next) => {
  const { token } = req.headers;
  try {
    var decoded = await jwt.verify(token, "secret");
    if (decoded) {
      req.user = decoded;
      if (decoded.nivel == 3) {
        await next();
      } else {
        return await res.status(401).json({
          mensaje: "Su nivel de usuario no esta autorizado para esta peticion",
        });
      }
    }
  } catch (err) {
    // err
    console.log(err);
    return await res.status(401).json({
      mensaje: "Su nivel de usuario no esta autorizado para esta peticion",
    });
  }
};
export const auxiliarToken = async (req, res, next) => {
  const { token } = req.headers;
  try {
    var decoded = await jwt.verify(token, "secret");
    if (decoded) {
      req.user = decoded;
      if (decoded.nivel == 2) {
        await next();
      } else {
        return await res.status(401).json({
          mensaje: "Su nivel de usuario no esta autorizado para esta peticion",
        });
      }
    }
  } catch (err) {
    // err
    console.log(err);
    return await res.status(401).json({
      mensaje: "Su nivel de usuario no esta autorizado para esta peticion",
    });
  }
};
export const impresionToken = async (req, res, next) => {
  const { token } = req.headers;
  try {
    var decoded = await jwt.verify(token, "secret");
    if (decoded) {
      req.user = decoded;
      if (decoded.nivel == 4) {
        await next();
      } else {
        return await res.status(401).json({
          mensaje: "Su nivel de usuario no esta autorizado para esta peticion",
        });
      }
    }
  } catch (err) {
    // err
    console.log(err);
    return await res.status(401).json({
      mensaje: "Su nivel de usuario no esta autorizado para esta peticion",
    });
  }
};

//COOKIES CONTROLLER

export async function verifyCookie(req, res, next) {
  const { token } = req.cookies;
  try {
    var decoded = await jwt.verify(token, "secret");
    if (decoded) {
      req.user = decoded;
      if (decoded.nivel == 4 || decoded.nivel == 2 || decoded.nivel == 3) {
        res.status(401).sendFile(path.join(publics, "/401.html"));
      } else {
        await next();
      }
    }
  } catch (err) {
    console.log(err);
    return await res
      .status(420)
      .json({ mensaje: "Error de autentificacion, verificar token" });
  }
}

export async function impresionCookie(req, res, next) {
  const { token } = req.cookies;
  try {
    var decoded = await jwt.verify(token, "secret");
    if (decoded) {
      req.user = decoded;
      if (decoded.nivel == 1 || decoded.nivel == 4) {
        await next();
      } else {
        res.status(401).sendFile(path.join(publics, "/401.html"));
      }
    }
  } catch (err) {
    console.log(err);
    return await res
      .status(420)
      .json({ mensaje: "Error de autentificacion, verificar token" });
  }
}
export async function clearCookie(req, res, next) {
  res.clearCookie("token");
  res.clearCookie("username");
  res.clearCookie("nivel");
  next();
}
export async function loginEspejo(req, res) {
  const { user, pass } = req.body;
  if (!(user || pass) || user == "" || pass == "") {
    return await res
      .status(422)
      .json({ mensaje: "Error al iniciar sesion, valide los datos" });
  }
  try {
    const [id] = await pool.execute(
      "SELECT id, nivel, password, nombre, cedula FROM users WHERE cedula = ?",
      [user]
    );

    if (id.length > 0) {
      const comparacionClave = await bcrypt.compare(pass, id[0].password);

      if (comparacionClave) {
        var token = await jwt.sign(
          { id: id[0].id, user, nivel: id[0].nivel, cedula: id[0].cedula },
          "secret",
          {
            expiresIn: "1 days",
          }
        );
        res.cookie("token", token, {
          maxAge: 60000 * 60 * 2,
          httpOnly: true,
          secure: true,
          sameSite: true,
        });
        res.cookie("username", id[0].nombre, {
          maxAge: 60000 * 60 * 2,
          secure: true,
          sameSite: true,
        });
        res.cookie("nivel", id[0].nivel, {
          maxAge: 60000 * 60 * 2,
          secure: true,
          sameSite: true,
        });
        return await res.status(200).json({ token, username: id[0].nombre });
      } else {
        return await res.status(404).json({
          mensaje: "Contraseña no valida",
        });
      }
    } else {
      return await res.status(404).json({
        mensaje: "No se ha encontrado usuario con esa cedula",
      });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
}

//COOKIES CONTROLLER

export const imagen = async (req, res, next) => {
  const { img, cedula, nombre, colegio } = req.body;
  try {
    await pool.execute(
      "INSERT INTO bioanalistas (foto_carnet, cedula, nombre, colegio) VALUES (?,?,?,?)",
      [img, cedula, nombre, colegio]
    );
    const [imgNueva] = await pool.execute(
      "SELECT foto_carnet FROM bioanalistas"
    );
    return await res
      .status(200)
      .json({ mensaje: "exitoso", img: imgNueva[0].foto_carnet });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};
