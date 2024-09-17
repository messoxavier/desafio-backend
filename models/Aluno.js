const pool = require('../config/db');

// Função para listar todos os alunos
const getAlunos = (callback) => {
    const query = `SELECT alunos.id, alunos.nome, alunos.cpf, alunos.data_nascimento, professores.nome AS professores_nome
    FROM alunos
    INNER JOIN professores ON alunos.professor_id = professores.id
    `;
    pool.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

// Função para cadastrar um novo aluno
const addAluno = (aluno, callback) => {
    const query = 'INSERT INTO alunos (nome, cpf, data_nascimento, professor_id) VALUES (?, ?, ?, ?)';
    pool.query(query, [aluno.nome, aluno.cpf, aluno.data_nascimento, aluno.professor_id], (error, results) => {
        if(error) {
            return callback(error, null);
        }
        return callback(null, results.insertId);
    });
};

module.exports = {
    getAlunos,
    addAluno,
};
