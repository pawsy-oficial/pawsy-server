const db = require("../db")

const registerTutor = (req, res) => {
    const { firstName, lastName, email, cpf, birthDate, cell, password, cep, city, state, street, numberHome, complement, neighborhood } = req.body
    
    const insertCitySQL = "insert into cidade (nm_cidade, id_uf) values (?,?)"
    const insertNeighborhoodSQL = "insert into bairro (nm_bairro, id_cidade) values (?,?)"
    const insertAddresSQL = "insert into endereco (nm_rua, num_residencia, complemento, latitude, longitude, id_bairro) values (?,?,?,?,?,?)"

    db.query(insertCitySQL, [city, state] , function (error, results) {
        if(error){
            res.status(400).json({
                Mensage: error
            })
            return
        }
        db.query(insertNeighborhoodSQL, [neighborhood, 1] , function (error, results) {
            if(error){
                res.status(400).json({
                    Mensage: error
                })
                return
            }
        })
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