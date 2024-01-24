import { pool } from "../database/db.js";

export const agregarPacienteController = async (req, res) => {
  const { paciente } = req.body;
  console.log("🚀 ~ agregarPacienteController ~ paciente:", paciente);
  try {
    // Crear la consulta SQL
    const columnas = paciente.map((dato) => dato.nombre).join(", ");
    const valores = paciente.map((dato) => "?").join(", ");
    const consulta = `INSERT INTO pacientes (${columnas}) VALUES (${valores})`;

    // Ejecutar la consulta
    const resultados = await pool.execute(
      consulta,
      paciente.map((dato) => dato.valor)
    );
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};
