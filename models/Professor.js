const pool = require('../config/db');

// Função para listar todos os professores
const getProfessores = (callback) => {
  const query = `SELECT professores.id, professores.nome, professores.cpf, professores.data_nascimento, escolas.nome AS escola_nome
    FROM professores
    INNER JOIN escolas ON professores.escola_id = escolas.id
  `;
  pool.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Função para buscar professor pelo ID
const getProfessorById = (id, callback) => {
  const query = `SELECT professores.id, professores.nome, professores.cpf, professores.data_nascimento, professores.escola_id AS escola_nome
    FROM professores
    INNER JOIN escolas ON professores.escola_id = escolas.id
    WHERE professores.id = ?
    `
  pool.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback(new Error('Professor não encontrado'), null)
    }
    return callback(null, results[0]);
  });
};

// Função para adicionar um novo professor
const addProfessor = (professor, callback) => {
  const query = 'INSERT INTO professores (nome, cpf, data_nascimento, escola_id) VALUES (?, ?, ?, ?)';
  pool.query(query, [professor.nome, professor.cpf, professor.data_nascimento, professor.escola_id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.insertId);
  });
};

// Função para editar um professor
const editProfessor = (id, professor, callback) => {
  const query = 'UPDATE professores SET nome = ?, cpf = ?, data_nascimento = ?, escola_id = ? WHERE id = ?';
  pool.query(query, [professor.nome, professor.cpf, professor.data_nascimento, professor.escola_id, id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Função para deletar um professor
const deleteProfessor = (id, callback) => {
  const query = 'DELETE FROM professores WHERE id = ?';
  pool.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

module.exports = {
  getProfessores,
  addProfessor,
  getProfessorById,
  editProfessor,
  deleteProfessor,
};

