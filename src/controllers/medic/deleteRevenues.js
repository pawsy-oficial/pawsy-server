const db = require("../../db")

const deleteRevenues = (req, res) => {
    const {idMedic} = req.params

    const querySQL = `SELECT id_receita FROM receitas WHERE id_receita = ?`
    const deleteSQL = `DELETE FROM receitas WHERE id_receita = ?`

    db.query(querySQL, [idMedic], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        result.length === 0 
        ? res.status(404).json({message: "receita não excluída"})
        : (
            db.query(deleteSQL, [idMedic], (err, result)=>{
                if(err){
                    res.status(500).json({err})
                }

                res.status(200).json({message: "receita excluída com sucesso"})
            })
        )
    })
}

module.exports = {
    deleteRevenues
}