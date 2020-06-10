const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost:3306',
    user: 'id14031815_iaca',
    password: '',
    database: 'id14031815_pftn'
});

pool.query = util.promisify(pool.query);

module.exports = pool;