const jwt = require('jsonwebtoken');
const db = require('../db');

// Middleware para verificar JWT
const authMiddlewareTutor = (req, res, next) => {
    //API REST
    //TOKEN DEVE SER MANDADO NO HEADER
    const { authorization } = req.headers
    try{

        if (!authorization){
            throw new UnauthorizedError('Não autorizado')
        }
        
        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, process.env.JWT_PASS);

        let query = `SELECT * FROM tutor WHERE id_tutor = ${id}`;

        db.query(query, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao consultar o banco de dados.');
                return;
            }
            
            if (result.length === 0) {
                res.status(401).send(UnauthorizedError);
                return;
            }

            
            const storedIdTutor = result[0].id_tutor;
            const storedNameTutor = result[0].nm_tutor;
            const storedSBTutor = result[0].sb_tutor;
            const storedEmailTutor = result[0].nm_email;
            const storedCelTutor = result[0].num_celular;
            const storedType = "Tutor";
            const storedImg = result[0].url_imagem;
            
            const queryEndereco = `
                SELECT 
                    e.cd_cep AS CEP,
                    e.nm_rua AS Rua,
                    e.num_residencia AS Numero,
                    e.complemento AS Complemento,
                    e.latitude AS Latitude,
                    e.longitude AS Longitude,
                    b.nm_bairro AS Bairro,
                    c.nm_cidade AS Cidade,
                    u.nm_estado AS Estado
                FROM tutor tt
                    JOIN endereco e ON tt.id_endereco = e.id_endereco
                    JOIN bairro b ON e.id_bairro = b.id_bairro
                    JOIN cidade c ON b.id_cidade = c.id_cidade
                    JOIN uf u ON c.id_uf = u.id_uf
                WHERE tt.id_tutor = ${storedIdTutor};
        `;

            db.query(queryEndereco, async (err, result) => {
                if (err) res.status(500).send("Erro ao tentar encontrar endereço no banco.")

                const storedCEP = result[0].CEP;
                const storedRua = result[0].Rua;
                const storedNumero = result[0].Numero;
                const storedComplemento = result[0].Complemento;
                const storedLatitude = result[0].Latitude;
                const storedLongitude = result[0].Longitude;
                const storedBairro = result[0].Bairro;
                const storedCidade = result[0].Cidade;
                const storedEstado = result[0].Estado;

                req.user = {
                    storedIdTutor, 
                    storedNameTutor, 
                    storedSBTutor,
                    storedEmailTutor, 
                    storedCelTutor, 
                    storedType, 
                    storedImg,
                    CEP: storedCEP,
                    Rua: storedRua,
                    Numero: storedNumero,
                    Complemento: storedComplemento,
                    Latitude: storedLatitude,
                    Longitude: storedLongitude,
                    Bairro: storedBairro,
                    Cidade: storedCidade,
                    Estado: storedEstado 
                }
                next()
            })
        });
    }
    catch (UnauthorizedError){
        res.status(401).send(UnauthorizedError)
    }
};

const authMiddlewareClinic = (req, res, next) => {
    //API REST
    //TOKEN DEVE SER MANDADO NO HEADER
    const { authorization } = req.headers
    try{

        if (!authorization){
            throw new UnauthorizedError('Não autorizado')
        }
        
        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, process.env.JWT_PASS);

        let query = `SELECT * FROM clinica where id_clinica = ${id}`;

        db.query(query, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao consultar o banco de dados.');
                return;
            }
            
            if (result.length === 0) {
                res.status(401).send('Não autorizado');
                return;
            }

            const storedIdClinica = result[0].id_clinica;
            const storedNameClinica = result[0].nm_clinica;
            const storedCnpjClinica = result[0].cnpj_clinica;
            const storedEmailClinica = result[0].email_clinica;
            const storedDescriptionClinica = result[0].ds_sobre;
            const storedTellClinica = result[0].tl_clinica;
            const storedImg = result[0].url_imagem;
            const storedType = "Clinica";
            const storedStatus = result[0].status_loja;

            const queryEndereco = `
                SELECT 
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
                WHERE cl.id_clinica = ${storedIdClinica};
        `;

            db.query(queryEndereco, async (err, result) => {
                if (err) res.status(500).send("Erro ao tentar encontrar endereço no banco.")

                const storedCEP = result[0].CEP;
                const storedRua = result[0].Rua;
                const storedNumero = result[0].Numero;
                const storedComplemento = result[0].Complemento;
                const storedLatitude = result[0].Latitude;
                const storedLongitude = result[0].Longitude;
                const storedBairro = result[0].Bairro;
                const storedCidade = result[0].Cidade;
                const storedEstado = result[0].Estado;

            

            req.clinic = {
                storedIdClinica, 
                storedNameClinica, 
                storedCnpjClinica, 
                storedEmailClinica, 
                storedTellClinica, 
                storedDescriptionClinica, 
                storedType,
                storedImg,
                CEP: storedCEP,
                Rua: storedRua,
                Numero: storedNumero,
                Complemento: storedComplemento,
                Latitude: storedLatitude,
                Longitude: storedLongitude,
                Bairro: storedBairro,
                Cidade: storedCidade,
                Estado: storedEstado,
                storedStatus 
            }

            next()
            })
        });
    }
    catch (UnauthorizedError){
        res.status(401).send('Não Autorizado!')
    }
};

const authMiddlewareMedic = (req, res, next) => {
    //API REST
    //TOKEN DEVE SER MANDADO NO HEADER
    const { authorization } = req.headers
    try{

        if (!authorization){
            throw new UnauthorizedError('Não autorizado')
        }
        
        const token = authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization;

        const { id } = jwt.verify(token, process.env.JWT_PASS);

        let query = `SELECT * FROM medico WHERE id_medico = ${id}`;

        db.query(query, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao consultar o banco de dados.');
                return;
            }
            
            if (result.length === 0) {
                res.status(401).send('UnauthorizedError');
                return;
            }

            const storedIdMedic = result[0].id_medico;
            const storedNameMedic = result[0].nm_medico;
            const storedEmailMedic = result[0].nm_email;
            const storedCRMVMedic = result[0].cd_crmv;
            const storedType = "Medico";
            
            req.Medic = {storedIdMedic, storedNameMedic, storedEmailMedic, storedCRMVMedic, storedType}

            next()
        });
    }
    catch (UnauthorizedError){
        res.status(401).send('UnauthorizedError')
    }
};

module.exports = {
    authMiddlewareTutor,
    authMiddlewareClinic,
    authMiddlewareMedic
};