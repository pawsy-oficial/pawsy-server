const db = require("../../db")

const deletePostAd = (req, res)=>{
    const idAd = req.params.idAd

    const selectSQL = `SELECT * FROM marketing WHERE id_marketing = ?`
    const deleteSQL = `DELETE FROM marketing WHERE id_marketing = ?`

    db.query(selectSQL, [idAd], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        if(result.length == 0){
            res.status(404).json({
                message: "anuncio nao encontrado"
            })
            return
        }

        db.query(deleteSQL, [idAd], (err, result)=>{
            if(err){
                res.status(500).json({err})
            }

            res.status(200).json({message: "anuncio apagado com sucesso"})
        })
    })
}

module.exports = deletePostAd