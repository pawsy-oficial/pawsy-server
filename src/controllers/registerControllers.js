const registerTutor = (req, res)=>{
    return res.status(200).send({ msg: "Cadastro tutor" })
}
const registerClinic = (req, res)=>{
    return res.status(200).send({ msg: "Cadastro clinica" })
}
const registerMedic = (req, res)=>{
    return res.status(200).send({ msg: "Cadastro medico" })
}

module.exports = {
    registerTutor,
    registerClinic,
    registerMedic
}