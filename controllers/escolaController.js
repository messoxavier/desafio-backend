// controllers/escolaController.js
const { listarEscolas, adicionarEscola } = require('../models/Escola');

// Função para listar todas as escolas
exports.listarEscolas = (req, res) => {
  listarEscolas((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Função para adicionar uma nova escola
exports.adicionarEscola = (req, res) => {
  const { nome, endereco } = req.body;
  adicionarEscola(nome, endereco, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId });
  });
};
