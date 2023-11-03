const db = require("../../db")

const removeAcountClinic = (req, res) => {
    const {idClinic} = req.params

    const querySQL = `SELECT id_clinica FROM clinica WHERE id_clinica = ?`
    const deleteSQL = `UPDATE clinica SET bl_disabled = 1 WHERE id_clinica = ?`

    db.query(querySQL, [idClinic], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        result.length === 0 
        ? res.status(404).json({message: "clinica nao encontrada"})
        : (
            db.query(deleteSQL, [idClinic], (err, result)=>{
                if(err){
                    res.status(500).json({err})
                }

                res.status(200).json({message: "clinica removido com sucesso"})
            })
        )
    })
}

module.exports = {
    removeAcountClinic
}