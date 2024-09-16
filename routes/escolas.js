// routes/escolas.js
const express = require('express');
const router = express.Router();
const escolaController = require('../controllers/escolaController');

// Rota para listar todas as escolas
router.get('/', escolaController.listarEscolas);

// Rota para adicionar uma nova escola
router.post('/', escolaController.adicionarEscola);

module.exports = router;
