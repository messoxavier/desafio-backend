const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ status: "401", mensagem: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jWt@Desafio_2024');
        req.usuario = decoded;
        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return res.status(401).json({ status: "401", mensagem: 'Falha na autenticação' });
    }
};
