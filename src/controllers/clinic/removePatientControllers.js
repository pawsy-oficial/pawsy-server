const db = require("../../db")

const removePatient = (req, res) => {
    const {idPet, idClinic} = req.params

    const querySQL = `SELECT id_clinica, id_pet FROM pacientes WHERE id_clinica = ? AND id_pet = ?`
    const deleteSQL = `DELETE FROM pacientes WHERE id_clinica = ? AND id_pet = ?`

    db.query(querySQL, [idClinic, idPet], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        result.length === 0 
        ? res.status(404).json({message: "pet ou clinica nao encontrado"})
        : (
            db.query(deleteSQL, [idClinic, idPet], (err, result)=>{
                if(err){
                    res.status(500).json({err})
                }

                res.status(200).json({message: "paciente removido com sucesso"})
            })
        )
    })
}

module.exports = {
    removePatient
}