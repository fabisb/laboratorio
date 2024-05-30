import { pool } from "../database/db.js";
export const getUsers = async (req, res) => {
    try {
      const [users] = await pool.execute("SELECT id,nombre FROM users")
      console.log(users)
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