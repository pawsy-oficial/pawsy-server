const jwt = require('jsonwebtoken');
const { SECRET } = require("../middlewares/auth")
const loginTuto = (req, res) => {
    const { email, password } = req.body;

    //Falta a query para todas as validações

    if (email && password) {
        const payload = {
            id: 777,
            email: email,
        };

        const expireHour = 24 * 30;
        const token = jwt.sign(payload, SECRET, { expiresIn: expireHour });

        res.cookie('token', token, { httpOnly: true }); //httpOnly ajuda na segurança
        return res.status(200).send({ success: true, message: 'Authenticated' });
    } else {
        return res.status(401).send({ success: false, message: 'Authentication failed' });
    }
}

module.exports = {
    loginTuto
}