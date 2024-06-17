import { createPool } from "mysql2/promise";
import config from '../config/config.js';
export const pool = await createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  database: config.DB_NAME,
  password:config.DB_PASSWORD,
  port: config.DB_PORT,
  waitForConnections: true,
  namedPlaceholders:true
});
