// Importa o express para criar rotas
const express = require('express');
const router = express.Router(); // Cria um objeto de rotas

// Importa as funções do controlador (lógica CRUD)
const { criarAtivo, listarAtivos, atualizarAtivo, deletarAtivo } = require('../controllers/ativosController');

// Rota p add um novo ativo (POST)
router.post('/', criarAtivo);

// Rota p listar todos os ativos (GET)
router.get('/', listarAtivos);

// Rota p atualizar um ativo (PUT)
router.put('/:id', atualizarAtivo);

// Rota p deletar um ativo (DELETE)
router.delete('/:id', deletarAtivo);

// Exporta o router para ser usado no servidor
module.exports = router;