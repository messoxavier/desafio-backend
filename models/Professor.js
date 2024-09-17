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

module.exports = {
  getProfessores,
  addProfessor,
};

