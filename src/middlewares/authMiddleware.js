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
            const storedEmailTutor = result[0].nm_email;
            const storedCelTutor = result[0].num_celular;
            
            req.user = {storedIdTutor, storedNameTutor, storedEmailTutor, storedCelTutor}

            next()
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
            
            req.clinic = {storedIdClinica, storedNameClinica, storedCnpjClinica, storedEmailClinica}

            next()
        });
    }
    catch (UnauthorizedError){
        res.status(401).send(UnauthorizedError)
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
        
        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, process.env.JWT_PASS);

        let query = `SELECT * FROM medico WHERE id_medico = ${id}`;

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

            const storedIdMedic = result[0].id_medico;
            const storedNameMedic = result[0].nm_medico;
            const storedEmailMedic = result[0].nm_email;
            const storedCRMVMedic = result[0].cd_crmv;
            
            req.Medic = {storedIdMedic, storedNameMedic, storedEmailMedic, storedCRMVMedic}

            next()
        });
    }
    catch (UnauthorizedError){
        res.status(401).send(UnauthorizedError)
    }
};

module.exports = {
    authMiddlewareTutor,
    authMiddlewareClinic,
    authMiddlewareMedic
};