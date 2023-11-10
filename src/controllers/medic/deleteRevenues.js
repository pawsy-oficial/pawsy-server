const db = require("../../db")

const deleteRevenues = (req, res) => {
    const {idMedic} = req.params

    const querySQL = `SELECT id_receita FROM receitas WHERE id_receita = ?`
    const deleteSQL = `DELETE FROM receitas WHERE id_receita = 1`

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
    deleteRevenues
}