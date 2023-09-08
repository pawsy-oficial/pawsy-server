const jwt = require('jsonwebtoken');
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
        
            //secure: false por enquanto, já que ainda está localhost
            res.cookie('jwtToken', token, { httpOnly: true, secure: false, maxAge: 8 * 60 * 60 * 1000 });
            
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

const getProfileTutor = async (req, res) => {
    res.json(
        req.user
    )
}

const loginClinic = async (req, res) => {
    const { cnpj, password } = req.body;

    let query = "SELECT * FROM clinica WHERE cnpj_clinica = ?"; 

    db.query(query, [cnpj], async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao consultar o banco de dados.');
            return;
        }
        
        if (result.length === 0) {
            res.status(400).send('CNPJ ou senha estão incorretas');
            return;
        }

        const storedHashedPassword = result[0].pw_clinica;
        const storedIdClinica = result[0].id_clinica;
        const storedNameClinica = result[0].nm_clinica;
        const storedCnpjClinica = result[0].cnpj_clinica;
        const storedEmailClinica = result[0].email_clinica;
        const storedCelClinica = result[0].tl_clinica;

        const queryEndereco = `SELECT 
            e.cd_cep AS CEP,
            e.nm_rua AS Rua,
            e.num_residencia AS Numero,
            e.complemento AS Complemento,
            e.latitude AS Latitude,
            e.longitude AS Longitude,
            b.nm_bairro AS Bairro,
            c.nm_cidade AS Cidade,
            u.nm_estado AS Estado
        FROM clinica cl
        JOIN endereco e ON cl.id_endereco = e.id_endereco
        JOIN bairro b ON e.id_bairro = b.id_bairro
        JOIN cidade c ON b.id_cidade = c.id_cidade
        JOIN uf u ON c.id_uf = u.id_uf
        WHERE cl.id_clinica = ${storedIdClinica};`;

        db.query(queryEndereco, async (err, newResult) => {
            if (err) res.status(500).send("Erro ao tentar encontrar endereço no banco.")

            const storedCEP = newResult[0].CEP;
            const storedRua = newResult[0].Rua;
            const storedNumero = newResult[0].Numero;
            const storedComplemento = newResult[0].Complemento;
            const storedLatitude = newResult[0].Latitude;
            const storedLongitude = newResult[0].Longitude;
            const storedBairro = newResult[0].Bairro;
            const storedCidade = newResult[0].Cidade;
            const storedEstado = newResult[0].Estado;
            
            try {
                const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
                
                if (!passwordMatch) {
                    res.status(400).send('CNPJ ou senha estão incorretas');
                return;
            }
            
            const token = jwt.sign({id: storedIdClinica}, process.env.JWT_PASS, {
                expiresIn: '8h',
            })
            
            //secure: false por enquanto, já que ainda está localhost
            res.cookie('jwtToken', token, { httpOnly: true, secure: false, maxAge: 8 * 60 * 60 * 1000 });
            
            return res.json({
                idClinica: storedIdClinica,
                nameClinica: storedNameClinica,
                cnpjClinica: storedCnpjClinica,
                emailClinica: storedEmailClinica,
                celClinica: storedCelClinica,
                CEP: storedCEP,
                Rua: storedRua,
                Numero: storedNumero,
                Complemento: storedComplemento,
                Latitude: storedLatitude,
                Longitude: storedLongitude,
                Bairro: storedBairro,
                Cidade: storedCidade,
                Estado: storedEstado,
                token: token
            })
            
        } catch (bcryptError) {
            console.log(bcryptError);
            res.status(500).send('Erro ao verificar a senha.');
        }
        });
    });
}

const getProfileClinic = async (req, res) => {
    res.json(
        req.clinic
    )
}

const loginMedic = async (req, res) => {
    const { email, password } = req.body;

    let query = "SELECT * FROM medico WHERE nm_email = ?"; 

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

        const storedHashedPassword = result[0].pw_medic;
        const storedIdMedic = result[0].id_medico;
        const storedNameMedic = result[0].nm_medico;
        const storedEmailMedic = result[0].nm_email;
        const storedCRMVMedic = result[0].cd_crmv;

        try {
            const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

            if (!passwordMatch) {
                res.status(400).send('E-mail ou senha estão incorretas');
                return;
            }
            
            const token = jwt.sign({id: storedIdMedic}, process.env.JWT_PASS, {
                 expiresIn: '8h',
                })
        
            //secure: false por enquanto, já que ainda está localhost
            res.cookie('jwtToken', token, { httpOnly: true, secure: false, maxAge: 8 * 60 * 60 * 1000 });
            
            return res.json({
                id: storedIdMedic,
                nome: storedNameMedic,
                email: storedEmailMedic,
                celular: storedCRMVMedic,
                token: token
            })

        } catch (bcryptError) {
            console.log(bcryptError);
            res.status(500).send('Erro ao verificar a senha.');
        }
    });
}

const getProfileMedic = async (req, res) => {
    res.json(
        req.Medic
    )
}
    
    module.exports = {
    loginTuto,
    getProfileTutor,
    loginClinic,
    getProfileClinic,
    loginMedic,
    getProfileMedic
}