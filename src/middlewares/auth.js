const jwt = require('jsonwebtoken');

const SECRET = 'pawsyruthcardoso'; 

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

        req.decoded = decoded;  
        next();
    });
};

module.exports = {
    verifyJWT,
    SECRET
};