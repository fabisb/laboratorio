export default {
    //SECRET
    SECRET: process.env.SERCRET || "secret",

    //SV PORT
    PORT: process.env.PORT || 3000,

    //DB CONFIG
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    DB_PORT: process.env.DB_PORT || 3306,
    DB_NAME: process.env.DB_NAME || "laboratorio",
}