import { pool } from "../database/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [usuarios] = await pool.execute("SELECT * FROM users");
    const [bioanalistas] = await pool.execute("SELECT * FROM bioanalistas");
    return await res.status(200).json({ usuarios, bioanalistas });
  } catch (error) {
    console.log("🚀 ~ getAllUsers ~ error:", error);
    return await res.status(500).json({ mensaje: "ERROR DE SERVIDOR" });
  }
};
