const alunoModel = require('../models/Aluno');

// Função para listar todos os alunos
const getAlunos = (req, res) => {
    alunoModel.getAlunos((error, results) => {
        if (error) {
            console.error('Erro ao buscar alunos:', error);
            return res.status(500).json({ error: 'Erro ao buscar alunos' });
        }
        res.status(200).json(results);
    });
};

// Função para cadastrar um novo aluno
const addAluno = (req, res) => {
    const { nome, cpf, data_nascimento, professor_id } = req.body;

    if (!nome || !cpf || !data_nascimento || !professor_id) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios: nome, cpf, data_nascimento, professor_id'});
    }

    const aluno = { nome, cpf, data_nascimento, professor_id };

    alunoModel.addAluno(aluno, (error, result) => {
        if (error) {
            console.error('Erro ao cadastrar aluno:', error);
            return res.status(500).json({ error: 'Erro ao cadastrar aluno' });
        }
        res.status(201).json({ message: 'Aluno cadastrado com sucesso', id: result });
    });
};

module.exports = {
    getAlunos,
    addAluno,
};