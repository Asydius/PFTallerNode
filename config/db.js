const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'id14031815_iaca',
    password: 'I!1j5oHaWygW#PyB',
    database: 'id14031815_pftn'
});

pool.query = util.promisify(pool.query);

module.exports = pool;