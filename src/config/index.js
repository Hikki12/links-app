require('dotenv').config();

module.exports = {
    dev: process.env.NODE_ENV || 3000,
    port: process.env.PORT,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
}