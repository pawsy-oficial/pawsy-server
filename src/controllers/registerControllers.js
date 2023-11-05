const dayjs = require("dayjs");
const db = require("../db")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerTutor = async (req, res) => {
    const { firstName, lastName, email, cpf, birthDate, cell, password, cep, city, state, street, numberHome, complement, neighborhood, urlProfile, latitude, longitude } = req.body

    const selectEmailTutorSQL = "select nm_email, num_celular, cd_cpf from tutor where nm_email = ? or num_celular = ? or cd_cpf = ?"
    const insertCitySQL = "insert into cidade (nm_cidade, id_uf) values (?,?)"
    const insertNeighborhoodSQL = "insert into bairro (nm_bairro, id_cidade) values (?,?)"
    const insertAddresSQL = "insert into endereco (cd_cep, nm_rua, num_residencia, complemento, latitude, longitude, id_bairro) values (?,?,?,?,?,?,?)"
    const insertTutorSQL = "insert into tutor (nm_tutor, sb_tutor, cd_cpf, dt_nascimento, nm_email, num_celular, pw_tutor, id_endereco, url_imagem) values (?,?,?,?,?,?,?,?,?)"

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
                                db.query(insertTutorSQL, [firstName, lastName, cpfFormat, birthDate, email, cellFormat, hash, idInsert, urlProfile], function (error, results) {
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
    const { clinicName, crmv, email, cnpj, cell, password, cep, city, state, street, numberHome, complement, neighborhood, urlProfile, latitude, longitude } = req.body

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

    const selectEmailMedicSQL = `
        SELECT nm_email, num_celular, cd_cpf, cd_crmv FROM medico 
        WHERE nm_email = ? or num_celular = ? or cd_cpf = ? OR cd_crmv = ?
    `
    const insertMedicSQL = `
        INSERT INTO medico (nm_medico, sb_medico, cd_cpf, dt_nascimento, nm_email, num_celular, pw_medic, id_especialidade, cd_crmv, url_imagem) VALUES (?,?,?,?,?,?,?,?,?,?)
    `


    const cpfFormat = cpf.replace(/[^\d]+/g, '');
    const cellFormat = cell.replace(/[^\d]+/g, '');
    const crmvFormat = crmv.replace(/[^\d]+/g, '');

    bcrypt.hash(password, saltRounds)
        .then(hash => {
            db.query(selectEmailMedicSQL, [email, cellFormat, cpfFormat, crmvFormat], (error, results) => {
                if (error) {
                    res.status(400).json({ Message: error })
                    return
                }
                if (results.length === 0) {

                    db.query(insertMedicSQL, [firstNameMedic, lastNameMedic, cpfFormat, birthDate, email, cellFormat, hash, specialty, crmvFormat, urlProfile], function (error, results) {
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

const registerPet = (req, res) => {
    const { name, typeKind, gender, date, description, coat, urlProfile, id_tutor, race } = req.body

    const selectSQL = "select id_tutor from tutor where id_tutor = ?"
    const insertSQL = "insert into pet (nm_pet, id_tutor, id_raca, id_pelagem, id_sexo, id_animal, dt_nascimento, resumo, url_img) values (?,?,?,?,?,?,?,?,?)"


    db.query(selectSQL, [id_tutor], (err, results) => {
        if (err) {
            res.status(400).json({ erro: "não foi possivel cadastrar esse pet" })
            return
        }
        if (results.length == 0) {
            res.status(401).json({ erro: "tutor não cadastrado na plataforma" })
            return
        }

        db.query(insertSQL, [name, id_tutor, race, coat, gender, typeKind, date, description, urlProfile], (err, results) => {
            if (err) {
                res.status(400).json({ erro: "não foi possivel cadastrar esse pet", err })
            }

            res.status(200).json({ resultado: "pet cadastrado com sucesso" })
        })

    })

}

const registerVermifuge = (req, res) => {
    const { vermifuge, id_pet, id_medic } = req.body



    const date = new Date();
    const currentDay = date.getDate();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDate = `${currentYear}-${currentMonth+1}-${currentDay}`


    // let data = new Date();
    // let dataFormatada = currentDay + "-" + currentMonth + "-" + currentDay;

    const insertSQL = "insert into carteira_vermifugo (nm_vermifugo, id_pet, id_medico, dt_aplicacao) values (?,?,?,?)"
    db.query(insertSQL, [vermifuge, id_pet, id_medic, currentDate], (err, result) => {
        if (err) {
            res.status(400).json({ erro: "erro ao consultar o banco" + err })
            return
        }
        res.status(200).json({ result: "adicionado com sucesso" })
    })
}

const registerVaccine = (req, res) => {
    const { vacina, id_clinic, id_pet, id_medic, dt_retorno } = req.body

    const currentDate = dayjs().format("YYYY-MM-DD")

    const insertSQL = "INSERT INTO carteira_vacinas (id_vacina, id_clinica, id_pet, id_medico, dt_aplicacao, dt_retorno) VALUES (?,?,?,?,?,?)"

    db.query(insertSQL, [vacina, id_clinic, id_pet, id_medic, currentDate, dt_retorno], (err, result) => {
        if (err) {
            res.status(400).json({ erro: "erro ao consultar o banco" + err })
            return;
        }
        res.status(200).json({ result })
    })
}

module.exports = {
    registerTutor,
    registerClinic,
    registerMedic,
    registerPet,
    registerVermifuge,
    registerVaccine
}