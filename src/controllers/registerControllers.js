const db = require("../db")

const registerTutor = (req, res) => {
    const { firstName, lastName, email, cpf, birthDate, cell, password, cep, city, state, street, numberHome, complement, neighborhood } = req.body
    const latitude = "12.3456"
    const longitude = "-45.6789"

    const selectEmailTutorSQL = "select nm_email, num_celular, cd_cpf from tutor where nm_email = ? or num_celular = ? or cd_cpf = ?"
    const insertCitySQL = "insert into cidade (nm_cidade, id_uf) values (?,?)"
    const insertNeighborhoodSQL = "insert into bairro (nm_bairro, id_cidade) values (?,?)"
    const insertAddresSQL = "insert into endereco (cd_cep, nm_rua, num_residencia, complemento, latitude, longitude, id_bairro) values (?,?,?,?,?,?,?)"
    const insertTutorSQL = "insert into tutor (nm_tutor, cd_cpf, dt_nascimento, nm_email, num_celular, pw_tutor, id_endereco, url_imagem) values (?,?,?,?,?,?,?,?)"

    let idInsert
    const cpfFormat = cpf.replace(/[^\d]+/g,'');
    const cellFormat = cell.replace(/[^\d]+/g,'');


    db.query(selectEmailTutorSQL, [email, cell, cpfFormat], (error, results)=>{
        if(error){
            res.status(400).json({Message: error})
            return
        }
        if(results.length === 0){
            db.query(insertCitySQL, [city, state] , function (error, results) {
                if(error){
                    res.status(400).json({
                        Mensage: error
                    })
                    return
                }
                idInsert = results.insertId
                db.query(insertNeighborhoodSQL, [neighborhood, idInsert] , function (error, results) {
                    if(error){
                        res.status(400).json({
                            Mensage: error
                        })
                        return
                    }
                    idInsert = results.insertId
                    db.query(insertAddresSQL, [cep, street, numberHome, complement, latitude, longitude, idInsert] , function (error, results) {
                        if(error){
                            res.status(400).json({
                                Mensage: error
                            })
                            return
                        }
                        idInsert = results.insertId
                        db.query(insertTutorSQL, [firstName, cpfFormat, birthDate, email, cellFormat, password, idInsert, "https://pawsy.com/caminho/img.jpg"] , function (error, results) {
                            if(error){
                                res.status(400).json({
                                    Mensage: error
                                })
                                return
                            }
                            return res.status(200).json({sucefull: "Tutor cadastrado com sucesso"})
                        })
                    })
                })
            })
        }
        else{
            res.status(401).json({
                Message: "Essa conta já está sendo usada :("
            })
        }
    })

}




const registerClinic = (req, res) => {
    return res.status(200).send({ msg: "Cadastro clinica" })
}
const registerMedic = (req, res) => {
    return res.status(200).send({ msg: "Cadastro medico" })
}

module.exports = {
    registerTutor,
    registerClinic,
    registerMedic
}