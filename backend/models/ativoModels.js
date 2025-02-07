const mysql = require('mysql2');

// Conexão com o DB
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1234',
    database: process.env.DB_NAME || 'capitalcontrol',
    ssl: { rejectUnauthorized: false }
});

// Testando a conexão com DB
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err);
    } else {
        console.log('Banco de dados conecado com sucesso!');
    }
});

module.exports = db;