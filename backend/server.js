const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ativoRoutes = require('./routes/ativosRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Permite q o front se comunique c o bak sem block de segurança
app.use(express.json()); // P receber dados em JSON

app.use('/api', ativoRoutes);

// Rota 
app.get('/', (req, res) => {
    res.send('API do CapitalControl está rodando!');
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`);
});