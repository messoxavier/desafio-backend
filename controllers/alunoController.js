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

// Função para buscar aluno pelo ID
const getAlunoById = (req, res) => {
    const { id } = req.params;

    alunoModel.getAlunoById(id, (error, result) => {
        if (error) {
            console.error('Erro ao buscar aluno:', error);
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(result);
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

// Função para editar um aluno
const editAluno = (req, res) => {
    const { id } = req.params;
    const { nome, cpf, data_nascimento, professor_id } = req.body;

    if (!nome || !cpf || !data_nascimento || !professor_id) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios: nome, cpf, data_nascimento, professor_id'});
    }

    const aluno = { nome, cpf, data_nascimento, professor_id };

    alunoModel.editAluno(id, aluno, (error, result) => {
        if (error) {
            console.error('Erro ao atualizar aluno:', error);
            return res.status(500).json({ error: 'Erro ao atualizar aluno' });
        }
        res.status(200).json({ message: 'Aluno atualizado com sucesso' });
    });
};

// Função para deletar um aluno
const deleteAluno = (req, res) => {
    const { id } = req.params;

    alunoModel.deleteAluno(id, (error, result) => {
        if (error) {
            console.error('Erro ao deletar aluno:', error);
            return res.status(500).json({ error: 'Erro ao deletar aluno' });
        }
        res.status(204).send();
    });
};

module.exports = {
    getAlunos,
    addAluno,
    getAlunoById,
    editAluno,
    deleteAluno,
};