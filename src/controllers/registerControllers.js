const db = require("../db")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerTutor = async (req, res) => {
    const { firstName, lastName, email, cpf, birthDate, cell, password, cep, city, state, street, numberHome, complement, neighborhood, urlProfile } = req.body
    const latitude = "12.3456"
    const longitude = "-45.6789"

    const selectEmailTutorSQL = "select nm_email, num_celular, cd_cpf from tutor where nm_email = ? or num_celular = ? or cd_cpf = ?"
    const insertCitySQL = "insert into cidade (nm_cidade, id_uf) values (?,?)"
    const insertNeighborhoodSQL = "insert into bairro (nm_bairro, id_cidade) values (?,?)"
    const insertAddresSQL = "insert into endereco (cd_cep, nm_rua, num_residencia, complemento, latitude, longitude, id_bairro) values (?,?,?,?,?,?,?)"
    const insertTutorSQL = "insert into tutor (nm_tutor, cd_cpf, dt_nascimento, nm_email, num_celular, pw_tutor, id_endereco, url_imagem) values (?,?,?,?,?,?,?,?)"

    let idInsert
    const cpfFormat = cpf.replace(/[^\d]+/g, '');
    const cellFormat = cell.replace(/[^\d]+/g, '');


    bcrypt.hash(password, saltRounds)
        .then(hash => {
            db.query(selectEmailTutorSQL, [email, cellFormat, cpfFormat], (error, results) => {
                if (error) {
                    res.status(400).json({ Message: error })
                    return
                }
                if (results.length === 0) {
                    db.query(insertCitySQL, [city, state], function (error, results) {
                        if (error) {
                            res.status(400).json({
                                Mensage: error
                            })
                            return
                        }
                        idInsert = results.insertId
                        db.query(insertNeighborhoodSQL, [neighborhood, idInsert], function (error, results) {
                            if (error) {
                                res.status(400).json({
                                    Mensage: error
                                })
                                return
                            }
                            idInsert = results.insertId
                            db.query(insertAddresSQL, [cep, street, numberHome, complement, latitude, longitude, idInsert], function (error, results) {
                                if (error) {
                                    res.status(400).json({
                                        Mensage: error
                                    })
                                    return
                                }
                                idInsert = results.insertId
                                db.query(insertTutorSQL, [firstName, cpfFormat, birthDate, email, cellFormat, hash, idInsert, urlProfile], function (error, results) {
                                    if (error) {
                                        res.status(400).json({
                                            Mensage: error
                                        })
                                        return
                                    }
        
                                    return res.status(200).json({ sucefull: "Tutor cadastrado com sucesso" })
                                })
                            })
                        })
                    })
                }
                else {
                    res.status(401).json({
                        Message: "Essa conta já está sendo usada :("
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({ error: "Ocorreu um erro no servidor" });
        });

    

}

const registerClinic = (req, res) => {
    const { clinicName, crmv, email, cnpj, cell, password, cep, city, state, street, numberHome, complement, neighborhood, urlProfile } = req.body
    
    const latitude = "12.3456"
    const longitude = "-45.6789"

    const selectEmailClinicSQL = "select email_clinica, tl_clinica, cnpj_clinica from clinica where email_clinica = ? or tl_clinica = ? or cnpj_clinica = ?"
    const insertCitySQL = "insert into cidade (nm_cidade, id_uf) values (?,?)"
    const insertNeighborhoodSQL = "insert into bairro (nm_bairro, id_cidade) values (?,?)"
    const insertAddresSQL = "insert into endereco (cd_cep, nm_rua, num_residencia, complemento, latitude, longitude, id_bairro) values (?,?,?,?,?,?,?)"
    
    const insertClinicSQL = "insert into clinica (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem) values (?,?,?,?,?,?,?,?)"
    
    let idInsert
    const cnpjFormat = cnpj.replace(/[^\d]+/g, '');
    const cellFormat = cell.replace(/[^\d]+/g, '');
    const crmvFormat = parseInt(crmv.replace(/[^\d]+/g, ''));

    bcrypt.hash(password, saltRounds)
        .then(hash => {
            db.query(selectEmailClinicSQL, [email, cellFormat, cnpjFormat], (error, results) => {
                if (error) {
                    res.status(400).json({ Message: error })
                    return
                }
                if (results.length === 0) {
                    db.query(insertCitySQL, [city, state], function (error, results) {
                        if (error) {
                            res.status(400).json({
                                Mensage: error
                            })
                            return
                        }
                        idInsert = results.insertId
                        db.query(insertNeighborhoodSQL, [neighborhood, idInsert], function (error, results) {
                            if (error) {
                                res.status(400).json({
                                    Mensage: error
                                })
                                return
                            }
                            idInsert = results.insertId
                            db.query(insertAddresSQL, [cep, street, numberHome, complement, latitude, longitude, idInsert], function (error, results) {
                                if (error) {
                                    res.status(400).json({
                                        Mensage: error
                                    })
                                    return
                                }
                                idInsert = results.insertId
                                db.query(insertClinicSQL, [clinicName, cnpjFormat, email, cellFormat, hash, idInsert, crmvFormat, urlProfile], function (error, results) {
                                    if (error) {
                                        res.status(400).json({
                                            Mensage: error
                                        })
                                        return
                                    }
        
                                    return res.status(200).json({ sucefull: "Clinica cadastrado com sucesso" })
                                })
                            })
                        })
                    })
                }
                else {
                    res.status(401).json({
                        Message: "Essa conta já está sendo usada :("
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({ error: "Ocorreu um erro no servidor" });
        });

    
}

const registerMedic = (req, res) => {
    const { firstNameMedic, lastNameMedic, crmv, email, cpf, cell, birthDate, specialty, password, urlProfile } = req.body
    
    const selectEmailMedicSQL = "select nm_email, num_celular, cd_cpf from medico where nm_email = ? or num_celular = ? or cd_cpf = ?"
    const insertMedicSQL = "INSERT INTO medico (nm_medico, cd_cpf, dt_nascimento, nm_email, num_celular, pw_medic, id_especialidade, cd_crmv, url_imagem) VALUES (?,?,?,?,?,?,?,?,?)"
    
    const cpfFormat = cpf.replace(/[^\d]+/g, '');
    const cellFormat = cell.replace(/[^\d]+/g, '');
    const crmvFormat = crmv.replace(/[^\d]+/g, '');
    
    bcrypt.hash(password, saltRounds)
        .then(hash => {
            db.query(selectEmailMedicSQL, [email, cellFormat, cpfFormat], (error, results) => {
                if (error) {
                    res.status(400).json({ Message: error })
                    return
                }
                if (results.length === 0) {
                    
                    db.query(insertMedicSQL, [firstNameMedic, cpfFormat, birthDate, email, cellFormat, hash, specialty, crmvFormat, urlProfile], function (error, results) {
                        if (error) {
                            res.status(400).json({
                                Mensage: error
                            })
                            return
                        }

                        return res.status(200).json({ sucefull: "Medico cadastrado com sucesso" })
                    })          
                }
                else {
                    res.status(401).json({
                        Message: "Essa conta já está sendo usada :("
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({ error: "Ocorreu um erro no servidor" });
        });

    
}

module.exports = {
    registerTutor,
    registerClinic,
    registerMedic
}