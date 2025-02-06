const db = require('../models/ativoModels');

// Função para criar um novo ativo
const criarAtivo = (req, res) => {
    const { nome, ticker, cotas, preco_medio, preco_atual } = req.body;

    if (!nome || !ticker || !cotas || !preco_medio || !preco_atual) {
        return res.status(404).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const query = `INSERT INTO ativos (nome, ticker, cotas, preco_medio, preco_atual)
                    VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [nome, ticker, cotas, preco_medio, preco_atual], (err, result) => {
        if (err) {
            console.error('Erro ao inserir o ativo:', err);
            return res.status(500).json({ message: 'Erro ao buscar ativos.' });
        }
        res.status(201).json({ message: 'Ativo inserido com sucesso!', id: result.insertId});
    });
};

// Função para listar todos os ativos
const listarAtivos = (req, res) => {
    const query = 'SELECT * FROM ativos';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar ativos:', err);
            return res.status(500).json({ message: 'Erro ao buscar ativos.' });
        }
        res.status(200).json(results);
    });
};

// Função para atualizar um ativo
const atualizarAtivo = (req, res) => {

}

// Função para deletar um ativo
const deletarAtivo = (req, res) => {

}

module.exports = { criarAtivo, listarAtivos, atualizarAtivo, deletarAtivo };