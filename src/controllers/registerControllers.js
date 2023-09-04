const db = require("../db")

const registerTutor = (req, res) => {
    const { firstName, lastName, email, cpf, birthDate, cell, password, cep, city, state, street, numberHome, complement, neighborhood } = req.body
    res.send("dasdsadsadasd")
    // db.query("select * from vacinas", function (error, results) {
    //     if(error){
    //         res.status(400).json({
    //             Mensage: error
    //         })
    //         return
    //     }
    //     return res.json(results)
    // })
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