// Importa o db
const db = require('../models/ativoModels');
const { obterCotacao } = require('./services/apiAlpha');

// Função para criar um novo ativo
const criarAtivo = (req, res) => {
    const { nome, ticker, cotas, preco_medio, preco_atual } = req.body;

    if (!nome || !ticker || !cotas || !preco_medio || !preco_atual) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const query = `INSERT INTO ativos (nome, ticker, cotas, preco_medio, preco_atual)
                    VALUES (?, ?, ?, ?, ?)`;
    const values = [ nome, ticker, cotas, preco_medio, preco_atual ];

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
        res.status(200).json(results.rows || results);
    });
};

// Função para atualizar um ativo
const atualizarAtivo = (req, res) => {
    const { id } = req.params;
    const { nome, ticker, cotas, preco_medio, preco_atual } = req.body;

    if (!nome || !ticker || !cotas || !preco_medio || !preco_atual) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const query = `UPDATE ativos SET nome = ?, ticker = ?, cotas = ?, preco_medio = ?, preco_atual = ? WHERE id = ?`;

    db.query(query, [nome, ticker, cotas, preco_medio, preco_atual, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar o ativo:', err);
            return res.status(500).json({ mesage: 'Ativo não encontrado.'});
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ativo não encontrado.' })
        }

        return res.status(200).json({ message: 'Ativo atualizado com sucesso!' });
    });
};

// Função para deletar um ativo
const deletarAtivo = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM ativos WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar o ativo:', err);
            return res.status(500).json({ message: 'Erro ao deletar o ativo.'});
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ativo não encontrado'})
        }

        return res.status(404).json({ message: 'Ativo deletado com sucesso!'});
    });
};

// Função de cotação em tempo real
const mostrarCotacaoAtivo = async (req, res) => {
    const ticker = req.params.ticker;  // Obtém o ticker da URL da requisição
    
    try {
      const cotacao = await obterCotacao(ticker);
      if (cotacao) {
        res.json({ ticker, cotacao });
      } else {
        res.status(404).json({ message: 'Cotação não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar cotação' });
    }
};

module.exports = { criarAtivo, listarAtivos, atualizarAtivo, deletarAtivo, mostrarCotacaoAtivo };