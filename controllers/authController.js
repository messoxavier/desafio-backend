const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

// Função de registro de usuário
exports.register = async (req, res) => {
    const { nome, cpf, senha, data_nascimento } = req.body; // Inclui data de nascimento

    try {
        // Verifica se o usuário já existe
        pool.query('SELECT * FROM usuarios WHERE cpf = ?', [cpf], async (err, results) => {
            if (results.length > 0) {
                return res.status(409).json({ mensagem: 'Usuário já cadastrado' });
            }

            // Gera o hash da senha
            const hashedPassword = await bcrypt.hash(senha, 10);

            pool.query(
                'INSERT INTO usuarios (nome, cpf, senha, data_nascimento) VALUES (?, ?, ?, ?)',
                [nome, cpf, hashedPassword, data_nascimento],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({ mensagem: 'Erro ao registrar o usuário' });
                    }
                    return res.status(201).json({ mensagem: 'Usuário registrado com sucesso' });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

// Função de login de usuário
exports.login = (req, res) => {
    const { cpf, senha } = req.body;

    try {
        // Verifica se o usuário existe
        pool.query('SELECT * FROM usuarios WHERE cpf = ?', [cpf], async (err, results) => {
            if (err || results.length === 0) {
                return res.status(401).json({ mensagem: 'Usuário não encontrado' });
            }

            const user = results[0];

            // Verifica se a senha está correta
            const senhaValida = await bcrypt.compare(senha, user.senha);

            if (!senhaValida) {
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }

            // Gera o token JWT
            const token = jwt.sign(
                { id: user.id, cpf: user.cpf },
                process.env.JWT_SECRET || 'jWt@Desafio_2024',
                { expiresIn: '1h' }
            );

            // Retorna o token para o cliente
            return res.status(200).json({ token, mensagem: 'Login bem-sucedido' });
        });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};
