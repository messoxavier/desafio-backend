// routes/escolas.js
const express = require('express');
const router = express.Router();
const escolaController = require('../controllers/escolaController');

// Rota para listar todas as escolas
router.get('/', escolaController.listarEscolas);

// Rota para buscar uma escola por ID
router.get('/:id', escolaController.getEscolaById);

// Rota para adicionar uma nova escola
router.post('/', escolaController.addEscola);

// Rota para editar uma escola
router.put('/:id', escolaController.editEscola);

// Rota para deletar uma escola
router.delete('/:id', escolaController.deleteEscola);

module.exports = router;
