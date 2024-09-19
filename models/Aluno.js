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

// Função para buscar aluno pelo ID
const getAlunoById = (id, callback) => {
    const query = `SELECT alunos.id, alunos.nome, alunos.cpf, alunos.data_nascimento, alunos.professor_id AS professor_nome
    FROM alunos
    INNER JOIN professores ON alunos.professor_id = professores.id
    WHERE alunos.id = ?
    `
    pool.query(query, [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        if (results.length === 0) {
            return callback(new Error('Aluno não encontrado'), null)
        }
        return callback(null, results[0]);
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

// Função para editar um aluno
const editAluno = (id, aluno, callback) => {
    const query = 'UPDATE alunos SET nome = ?, cpf = ?, data_nascimento = ?, professor_id = ? WHERE id = ?';
    pool.query(query, [aluno.nome, aluno.cpf, aluno.data_nascimento, aluno.professor_id, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

// Função para deletar um aluno
const deleteAluno = (id, callback) => {
    const query = 'DELETE FROM alunos WHERE id = ?';
    pool.query(query, [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

module.exports = {
    getAlunos,
    addAluno,
    getAlunoById,
    editAluno,
    deleteAluno,
};
