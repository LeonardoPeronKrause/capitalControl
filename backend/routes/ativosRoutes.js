// Importa o express para criar rotas
const express = require('express');
const db = require('../models/ativoModels');

// Importa as funções do controlador (lógica CRUD)
const { criarAtivo, listarAtivos, atualizarAtivo, deletarAtivo, mostrarCotacaoAtivo } = require('../controllers/ativosController');

const router = express.Router(); // Cria um objeto de rotas

// Rota p add um novo ativo (POST)
router.post('/ativos', criarAtivo);

// Rota p listar todos os ativos (GET)
router.get('/ativos', listarAtivos);

// Rota p atualizar um ativo (PUT)
router.put('/:id', atualizarAtivo);

// Rota p deletar um ativo (DELETE)
router.delete('/:id', deletarAtivo);

// Rota p mostrar a cotação de um ativo em tempo real
router.get('/cotacao/:ticker', mostrarCotacaoAtivo);

// Exporta o router para ser usado no servidor
module.exports = router;