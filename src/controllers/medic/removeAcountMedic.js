const db = require("../../db")

const removeAcountMedic = (req, res) => {
    const {idMedic} = req.params

    const querySQL = `SELECT id_medico FROM medico WHERE id_medico = ?`
    const deleteSQL = `DELETE FROM medico WHERE id_medico = ?`

    db.query(querySQL, [idMedic], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        result.length === 0 
        ? res.status(404).json({message: "clinica nao encontrada"})
        : (
            db.query(deleteSQL, [idMedic], (err, result)=>{
                if(err){
                    res.status(500).json({err})
                }

                res.status(200).json({message: "clinica removido com sucesso"})
            })
        )
    })
}

module.exports = {
    removeAcountMedic
}