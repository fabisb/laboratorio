import { pool } from "../database/db.js";

export const getBioanalistas = async (req, res) => {
  try {
    const [bioanalistas] = await pool.execute(
      'SELECT `id`, `cedula`, `nombre`, `ingreso`, `telefono`, `direccion`, `colegio`, `pre_cedula`, `status` FROM bioanalistas WHERE status = "activo"'
    );
    if (bioanalistas.length > 0) {
      return await res.status(200).json( bioanalistas );
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
    const {cedula}=req.query;

    try {
    const [paciente] = await pool.execute(
      'SELECT * FROM pacientes WHERE cedula = ?',[cedula]
    );
    if (paciente.length > 0) {
      return await res.status(200).json( paciente[0] );
    } else {
      return await res
        .status(400)
        .json({ mensaje: "No se ha encontrado el paciente" });
    }
  } catch (error) {
    console.log(error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
