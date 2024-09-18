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

// Função para buscar uma escola pelo ID
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

// Função para editar uma escola
const editEscola = (id, escola, callback) => {
  const query = 'UPDATE escolas SET nome = ?, endereco = ? WHERE id = ?';
  pool.query(query, [escola.nome, escola.endereco, id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Função para deletar uma escola
const deleteEscola = (id, callback) => {
  const query = 'DELETE FROM escolas WHERE id = ?';
  pool.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

module.exports = {
  listarEscolas,
  getEscolaById, 
  addEscola,
  editEscola,
  deleteEscola,
};
