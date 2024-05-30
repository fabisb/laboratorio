import { pool } from "../database/db.js";

export const syncFiles = async (req, res) => {
  console.log("🚀 ~ syncFiles ~ req.query:", req.query);
  const { idBioanalista } = req.query;
  try {
    const [bioanalistas] = await pool.execute(
      "SELECT * FROM bioanalistas WHERE id = ?",
      [idBioanalista]
    );
    if (bioanalistas[0].foto_firma != null) {
      bioanalistas[0].foto_firma = `${Buffer.from(
        bioanalistas[0].foto_firma,
        "base64"
      )}`;
    }
    return await res.status(200).json(bioanalistas[0]);
  } catch (error) {
    console.log("🚀 ~ syncFiles ~ error:", error);
    return await res
      .status(500)
      .json({ mensaje: "Ha ocurrido un error en el servidor" });
  }
};
