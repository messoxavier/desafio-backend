const professorModel = require('../models/Professor');
const userModel = require('../models/Usuario');
const bcrypt = require('bcrypt');

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
  const { nome, cpf, senha, data_nascimento, escola_id } = req.body;


  // Validação dos dados recebidos
  if (!nome || !cpf || !senha || !data_nascimento || !escola_id) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios: nome, cpf, data_nascimento, escola_id' });
  }

  const professor = { nome, cpf, senha, data_nascimento, escola_id };

  professorModel.addProfessor(professor, (error, professorId) => {
    if (error) {
      console.error('Erro ao adicionar professor:', error);
      return res.status(500).json({ error: 'Erro ao adicionar professor' });
    }

    const hashedPassword = bcrypt.hashSync(senha, 10);
    userModel.addUser({ nome, cpf, senha: hashedPassword, data_nascimento, professor_id: professorId }, (err, userId) => {
      if (err) {
        console.error('Erro ao adicionar usuário:', err);
        return res.status(500).json({ error: 'Erro ao adicionar usuário' });
      }
    res.status(201).json({ message: 'Professor adicionado com sucesso', professorId });
  });
});
};

// Função para editar um professor
const editProfessor = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, senha, data_nascimento, escola_id } = req.body;

  // Validação dos dados recebidos
  if (!nome || !cpf || !senha || !data_nascimento || !escola_id) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios: nome, cpf, data_nascimento, escola_id' });
  }

  const professor = { nome, cpf, senha, data_nascimento, escola_id };

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

  userModel.getUserByProfessorId(id, (error, userResult) => {
    if (error) {
      console.error('Erro ao buscar o usuário associado ao professor:', error);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }

    if (userResult) {
      const userId = userResult.id;

  professorModel.deleteProfessor(id, (error, result) => {
    if (error) {
      console.error('Erro ao deletar professor:', error);
      return res.status(500).json({ error: 'Erro ao deletar professor' });
    }

    userModel.deleteUser(userId, (error, result) => {
      if (error) {
        console.error('Erro ao deletar usuário associado ao professor:', error);
        return res.status(500).json({ error: 'Erro ao deletar usuário' });
      }
    res.status(204).send();
  });
});
    }else {
      return res.status(404).json({ error: 'Usuário associado ao professor não encontrado'});
    }
});
};

module.exports = {
  getProfessores,
  addProfessor,
  getProfessorById,
  editProfessor,
  deleteProfessor,
};
