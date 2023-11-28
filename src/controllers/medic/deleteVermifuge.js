const db = require("../../db")

const deleteVermifuge = (req, res) => {
    const {idVermifugo} = req.params

    const querySQL = `SELECT id_aplicacao FROM carteira_vermifugo WHERE id_aplicacao = ?`
    const deleteSQL = `DELETE FROM carteira_vermifugo WHERE id_aplicacao = ?`

    db.query(querySQL, [idVermifugo], (err, result)=>{
        if(err) throw err
        const idAplicacao = result[0].id_aplicacao;
        result.length === 0 
        ? res.status(404).json({message: "vermifugo não excluída"})
        : (
            db.query(deleteSQL, [idAplicacao], (err, result)=>{
                if(err) throw err
                res.status(200).json({message: "vermifugo excluída com sucesso"})
            })
        )
    })
}

module.exports = {
    deleteVermifuge
}