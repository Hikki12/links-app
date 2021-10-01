const { promisify } = require('util');
const mysql = require('mysql');
const config = require('./config/index');

const pool = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name
});

pool.getConnection((err, connection) => {
    if(err){
        console.error(err);
    }
    if (connection) connection.release();
    console.log('DB is connected');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;