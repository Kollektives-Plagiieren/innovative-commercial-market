const config = require('./config');
const Pool = require('pg').Pool;

const pool = new Pool({
    user: config.dbUser,
    password: config.dbPassword,
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbDatabase
});

module.exports = pool;
