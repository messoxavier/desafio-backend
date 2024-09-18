const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// Rota para listar todos os professores
router.get('/', professorController.getProfessores);

// Rota para buscar professor pelo ID
router.get('/:id', professorController.getProfessorById);

// Rota para adicionar um novo professor
router.post('/', professorController.addProfessor);

// Rota para editar um professor
router.put('/:id', professorController.editProfessor);

// Rota para deletar um professor
router.delete('/:id', professorController.deleteProfessor);

module.exports = router;
