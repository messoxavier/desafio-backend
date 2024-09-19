const pool = require('../config/db');

// Função para adicionar um novo usuário
const addUser = (user, callback) => {
  const query = 'INSERT INTO usuarios (nome, cpf, senha, data_nascimento) VALUES (?, ?, ?, ?)';
  pool.query(query, [user.nome, user.cpf, user.senha, user.data_nascimento], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.insertId);
  });
};

// Função para buscar um usuário pelo CPF
const getUserByCpf = (cpf, callback) => {
  const query = 'SELECT * FROM usuarios WHERE cpf = ?';
  pool.query(query, [cpf], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback(new Error('Usuário não encontrado'), null);
    }
    return callback(null, results[0]);
  });
};

// Função para buscar um usuário pelo ID
const getUserById = (id, callback) => {
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  pool.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback(new Error('Usuário não encontrado'), null);
    }
    return callback(null, results[0]);
  });
};


module.exports = {
  addUser,
  getUserByCpf,
  getUserById, 
};
