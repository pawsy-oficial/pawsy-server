const db = require("../../db")

const removeAcountMedic = (req, res) => {
    const {idMedic} = req.params

    const querySQL = `SELECT id_medico FROM medico WHERE id_medico = ?`
    const deleteSQL = `UPDATE medico SET bl_disabled = 1 WHERE id_medico = ?`

    db.query(querySQL, [idMedic], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        result.length === 0 
        ? res.status(404).json({message: "medico nao encontrada"})
        : (
            db.query(deleteSQL, [idMedic], (err, result)=>{
                if(err){
                    res.status(500).json({err})
                }

                res.status(200).json({message: "medico desativada com sucesso"})
            })
        )
    })
}

module.exports = {
    removeAcountMedic
}