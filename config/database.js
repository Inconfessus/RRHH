const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b82a7a589f590b',
    password: '83dc7780',
    database: 'empresa_node'
});

pool.query = util.promisify(pool.query);
module.exports = pool;