const dayjs = require("dayjs")
const db = require("../../db")

const updatePostAd = (req, res)=>{
    let { title, description, endTime, urlImage, idTypeAd, qttDays, idPost } = req.body

    const selectSQL = `SELECT * FROM marketing WHERE id_marketing = ?`
    const updateSQL = `
        UPDATE marketing 
            SET nm_titulo = ?, nm_descricao = ?, tmp_final = ?, img_marketing = ?, id_anuncio = ?, tm_qnt_dias = ?
            WHERE id_marketing = ?
    `


    endTime = dayjs().add(qttDays, 'day')
    const formatDateEndTime = dayjs(endTime).format("YYYY-MM-DD HH:mm")

    db.query(selectSQL, [idPost], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        if(result.length == 0){
            res.status(404).json({
                message: "anuncio nao encontrado"
            })
            return
        }

        db.query(updateSQL, [title, description, formatDateEndTime, urlImage, idTypeAd, qttDays, idPost], (err, result)=>{
            if(err){
                res.status(500).json({err})
            }

            res.status(200).json({message: "anuncio atualizado com sucesso"})
        })
    })
}

module.exports = updatePostAd