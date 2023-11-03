const db = require("../../db")

const removeMedic = (req, res) => {
    const {idMedic, idClinic} = req.params

    const querySQL = `SELECT cd_clinica, cd_medico FROM trabalho WHERE cd_clinica = ? AND cd_medico = ?`
    const deleteSQL = `DELETE FROM trabalho WHERE cd_clinica = ? AND cd_medico = ?`

    db.query(querySQL, [idClinic, idMedic], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        result.length === 0 
        ? res.status(404).json({message: "medico ou clinica nao encontrado"})
        : (
            db.query(deleteSQL, [idClinic, idMedic], (err, result)=>{
                if(err){
                    res.status(500).json({err})
                }

                res.status(200).json({message: "medico removido com sucesso"})
            })
        )
    })
}

module.exports = {
    removeMedic
}