const professorModel = require('../models/Professor');

// Função para listar todos os professores
const getProfessores = (req, res) => {
  professorModel.getProfessores((error, results) => {
    if (error) {
      console.error('Erro ao buscar professores:', error);
      return res.status(500).json({ error: 'Erro ao buscar professores' });
    }
    res.status(200).json(results);
  });
};

// Função para adicionar um novo professor
const addProfessor = (req, res) => {
  const { nome, cpf, data_nascimento, escola_id } = req.body;


  // Validação dos dados recebidos
  if (!nome || !cpf || !data_nascimento || !escola_id) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios: nome, cpf, data_nascimento, escola_id' });
  }

  const professor = { nome, cpf, data_nascimento, escola_id };

  professorModel.addProfessor(professor, (error, result) => {
    if (error) {
      console.error('Erro ao adicionar professor:', error);
      return res.status(500).json({ error: 'Erro ao adicionar professor' });
    }
    res.status(201).json({ message: 'Professor adicionado com sucesso', id: result });
  });
};

module.exports = {
  getProfessores,
  addProfessor,
};
