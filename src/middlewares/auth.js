import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
const SECRET = 'pawsyruthcardoso'; //Chave secreta

app.use(express.json());
app.use(cookieParser());
app.use(router());

// Rota para autenticar e criar um JWT
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Falta a query do banco, mas verifica se está correto
    if (email && password) {
        // Payload que você quer codificar dentro do JWT
        const payload = {
            id: id,
            email: email,
        };
        
        // Criando o JWT
        const expireHour = 24*30
        const token = jwt.sign(payload, SECRET, { expiresIn: expireHour });
        
        // Definindo o JWT como um cookie
        res.cookie('token', token, { httpOnly: true }); // httpOnly ApiREST
        res.status(200).send({ success: true, message: 'Authenticated' });
    } else {
        res.status(401).send({ success: false, message: 'Authentication failed' });
    }
});

// Middleware para verificar JWT
const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).send({ success: false, message: 'No token provided' });
    }
    
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ success: false, message: 'Failed to authenticate token' });
        }

        req.decoded = decoded;  // Coloca o payload decodificado na requisição (opcional)
        next();
    });
};

// Rota que requer autenticação via JWT
app.get('/autenticacao', verifyJWT, (req, res) => {
    res.status(200).send({ success: true, message: 'You are authorized!', user: req.decoded });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
