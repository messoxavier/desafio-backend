const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Rota para listar todos os alunos
router.get('/', alunoController.getAlunos);

// Rota para adicionar um novo aluno
router.post('/', alunoController.addAluno);

module.exports = router;