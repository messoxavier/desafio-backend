const { listarEscolas, addEscola, getEscolaById, editEscola, deleteEscola } = require('../models/Escola');

// Função para listar todas as escolas
exports.listarEscolas = (req, res) => {
  listarEscolas((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Função para buscar uma escola pelo ID
exports.getEscolaById = (req, res) => {
  const { id } = req.params;

  getEscolaById(id, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!result) {
      return res.status(404).json({ message: 'Escola não encontrada' });
    }
    res.json(result);
  });
};

// Função para adicionar uma nova escola
exports.addEscola = (req, res) => {
  const { nome, endereco } = req.body;
  
  addEscola({ nome, endereco }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result });
  });
};

// Função para editar uma escola
exports.editEscola = (req, res) => {
  const { id } = req.params;
  const { nome, endereco } = req.body;

  editEscola(id, { nome, endereco }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Escola atualizada com sucesso' });
  });
};

// Função para deletar uma escola
exports.deleteEscola = (req, res) => {
  const { id } = req.params;

  deleteEscola(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
};
