export default {
    //SECRET
    SECRET: process.env.SECRET || "secret",

    //SV PORT
    PORT: process.env.PORT || 3000,

    //DB CONFIG
    DB_HOST: process.env.MYSQLHOST || "localhost",
    DB_PASSWORD: process.env.MYSQLPASSWORD || "",
    DB_PORT: process.env.MYSQLPORT || 3306,
    DB_USER: process.env.MYSQLUSER || "root",
    DB_NAME: process.env.DB_NAME || "laboratorio",
}