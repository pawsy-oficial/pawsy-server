const db = require("../../db")

const deleteRevenues = (req, res) => {
    const {idRevenue} = req.params

    const querySQL = `SELECT id_receita FROM receitas WHERE id_receita = ?`
    const deleteSQL = `UPDATE receitas SET is_valid = 0 WHERE id_receita = ?`

    db.query(querySQL, [idRevenue], (err, result)=>{
        if(err) throw err
        result.length === 0 
        ? res.status(404).json({message: "receita não excluída"})
        : (
            db.query(deleteSQL, [idRevenue], (err, result)=>{
                if(err) throw err
                res.status(200).json({message: "receita excluída com sucesso"})
            })
        )
    })
}

module.exports = {
    deleteRevenues
}