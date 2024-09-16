const pool = require('../config/db');

// Função para listar todas as escolas
const listarEscolas = (callback) => {
  const query = 'SELECT * FROM escolas';
  pool.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Função para listar uma escola pelo ID
const getEscolaById = (id, callback) => {
  const query = 'SELECT * FROM escolas WHERE id = ?';
  pool.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results[0]);
  });
};

// Função para adicionar uma nova escola
const addEscola = (escola, callback) => {
  const query = 'INSERT INTO escolas (nome, endereco) VALUES (?, ?)';
  pool.query(query, [escola.nome, escola.endereco], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.insertId);
  });
};

module.exports = {
  listarEscolas,
  getEscolaById,
  addEscola,
};
