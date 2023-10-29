const db = require("../../db")

const removeAcountTutor = (req, res) => {
    const { idTutor } = req.params

    const querySQL = `SELECT id_tutor FROM tutor WHERE id_tutor = ?`
    const deleteSQL = `DELETE FROM tutor WHERE id_tutor = ?`
    
    db.query(querySQL, [idTutor], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        result.length === 0 
        ? res.status(404).json({message: "tutor nao encontrado"})
        : (
            db.query(deleteSQL, [idTutor], (err, result)=>{
                if(err){
                    res.status(500).json({err})
                }

                res.status(200).json({message: "tutor removido com sucesso"})
            })
        )
    })
}

module.exports = {
    removeAcountTutor
}