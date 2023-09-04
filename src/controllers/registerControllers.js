const yup = require("yup")

const linkSchema = yup.object();



const registerTutor = (req, res) => {
    const { firstName, lastName, email, cpf, birthDate, cell, password, cep, city, state, addres, numberHome, complement, neighborhood } = req.body
    return res.status(200).send({
        msg: {
            firstName, lastName, email, cpf, birthDate, cell, password, cep, city, state, addres, numberHome, complement, neighborhood
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