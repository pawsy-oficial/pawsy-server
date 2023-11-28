const db = require("../../db")

const deleteVaccine = (req, res) => {
    const {idVaccine} = req.params

    const querySQL = `SELECT id_aplicacao FROM carteira_vacinas WHERE id_aplicacao = ?`
    const deleteSQL = `DELETE FROM carteira_vacinas WHERE id_aplicacao = ?`

    db.query(querySQL, [idVaccine], (err, result)=>{
        if(err) throw err
        result.length === 0 
        ? res.status(404).json({message: "vacina não excluída"})
        : (
            db.query(deleteSQL, [idVaccine], (err, result)=>{
                if(err) throw err
                res.status(200).json({message: "vacina excluída com sucesso"})
            })
        )
    })
}

module.exports = {
    deleteVaccine
}