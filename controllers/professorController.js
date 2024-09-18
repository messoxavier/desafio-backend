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

// Função para buscar professor pelo ID
const getProfessorById = (req, res) => {
  const { id } = req.params;

  professorModel.getProfessorById(id, (error, result) => {
    if (error) {
      console.error('Erro ao buscar professor:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(result);
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

// Função para editar um professor
const editProfessor = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, data_nascimento, escola_id } = req.body;

  // Validação dos dados recebidos
  if (!nome || !cpf || !data_nascimento || !escola_id) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios: nome, cpf, data_nascimento, escola_id' });
  }

  const professor = { nome, cpf, data_nascimento, escola_id };

  professorModel.editProfessor(id, professor, (error, result) => {
    if (error) {
      console.error('Erro ao atualizar professor:', error);
      return res.status(500).json({ error: 'Erro ao atualizar professor' });
    }
    res.status(200).json({ message: 'Professor atualizado com sucesso' });
  });
};

// Função para deletar um professor
const deleteProfessor = (req, res) => {
  const { id } = req.params;

  professorModel.deleteProfessor(id, (error, result) => {
    if (error) {
      console.error('Erro ao deletar professor:', error);
      return res.status(500).json({ error: 'Erro ao deletar professor' });
    }
    res.status(204).send();
  });
};

module.exports = {
  getProfessores,
  addProfessor,
  getProfessorById,
  editProfessor,
  deleteProfessor,
};
