const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Rota para listar todos os alunos
router.get('/', alunoController.getAlunos);

// Rota para buscar aluno pelo ID
router.get('/:id', alunoController.getAlunoById);

// Rota para adicionar um novo aluno
router.post('/', alunoController.addAluno);

// Rota para editar um aluno
router.put('/:id', alunoController.editAluno);

// Rota para deletar um aluno
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;