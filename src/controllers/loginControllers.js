const jwt = require('jsonwebtoken');
const { SECRET } = require("../middlewares/auth");
const bcrypt = require('bcrypt')
const db = require('../db');

const loginTuto = async (req, res) => {
    const { email, password } = req.body;

    let query = "SELECT * FROM tutor WHERE nm_email = ?"; 

    db.query(query, [email], async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao consultar o banco de dados.');
            return;
        }
        
        if (result.length === 0) {
            res.status(400).send('E-mail ou senha estão incorretas');
            return;
        }

        const storedHashedPassword = result[0].pw_tutor;
        const storedIdTutor = result[0].id_tutor;
        const storedNameTutor = result[0].nm_tutor;
        const storedEmailTutor = result[0].nm_email;
        const storedCelTutor = result[0].num_celular;

        try {
            const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

            if (!passwordMatch) {
                res.status(400).send('E-mail ou senha estão incorretas');
                return;
            }
            
            const token = jwt.sign({id: storedIdTutor}, process.env.JWT_PASS, {
                 expiresIn: '8h',
                })
            
            return res.json({
                id: storedIdTutor,
                nome: storedNameTutor,
                email: storedEmailTutor,
                celular: storedCelTutor,
                token: token
            })

        } catch (bcryptError) {
            console.log(bcryptError);
            res.status(500).send('Erro ao verificar a senha.');
        }
    });
}

module.exports = {
    loginTuto
}
// if (email && password) {
//     const payload = {
//         id: 777,
//         email: email,
//     };

//     const expireHour = 24 * 30;
//     const token = jwt.sign(payload, SECRET, { expiresIn: expireHour });

//     res.cookie('token', token, { httpOnly: true }); //httpOnly ajuda na segurança
//     return res.status(200).send({ success: true, message: 'Authenticated' });
// } else {
//     return res.status(401).send({ success: false, message: 'Authentication failed' });
// }