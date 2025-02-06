require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Permite q o front se comunique c o bak sem block de segurança
app.use(express.json()); // P receber dados em JSON

// Testando a conexão com DB
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err);
    } else {
        console.log('Banco de dados conecado com sucesso!');
    }
});

// Rota 
app.get('/', (req, res) => {
    res.send('API do CapitalControl está rodando!');
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`);
});