const mysql = require('mysql2');
require('dotenv').config();

// Conexão com o DB
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1234',
    database: process.env.DB_NAME || 'capitalcontrol',
    ssl: { rejectUnauthorized: false }
});

module.exports = db;