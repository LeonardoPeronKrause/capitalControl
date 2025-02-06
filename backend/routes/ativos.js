const express = require('express');
const router = express.Router();
const { criarAtivo, listarAtivos, atualizarAtivo, deletarAtivo } = require('../controllers/ativosController');

// Rota p add um novo ativo
router.post('/', criarAtivo);

// Rota p listar todos os ativos
router.get('/', listarAtivos);

// Rota p atualizar um ativo
router.put('/', atualizarAtivo);

// Rota p deletar um ativo
router.delete('/', deletarAtivo);

module.exports = router;