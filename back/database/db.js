import { createPool } from "mysql2/promise";
export const pool = await createPool({
  host: "localhost",
  user: "root",
  database: "laboratorio",
  port: 3306,
  waitForConnections: true,
  namedPlaceholders:true
});
