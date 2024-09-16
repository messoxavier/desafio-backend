const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// Rota para listar todos os professores
router.get('/', professorController.getProfessores);

// Rota para adicionar um novo professor
router.post('/', professorController.addProfessor);

module.exports = router;
