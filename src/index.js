const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { verifyJWT, SECRET } = require('./middlewares/auth.js');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    //Falta a query para todas as validações
    
    if (email && password) {
        const payload = {
            id: 777,
            email: email,
        };
        
        const expireHour = 24*30;
        const token = jwt.sign(payload, SECRET, { expiresIn: expireHour });
        
        res.cookie('token', token, { httpOnly: true }); //httpOnly ajuda na segurança
        res.status(200).send({ success: true, message: 'Authenticated' });
    } else {
        res.status(401).send({ success: false, message: 'Authentication failed' });
    }
});

app.get('/autenticacao', verifyJWT, (req, res) => {
    res.status(200).send({ success: true, message: 'You are authorized!', user: req.decoded });
});

app.listen(3000, () => {
    console.log("server ON");
});