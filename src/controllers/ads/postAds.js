const db = require("../../db")

const postAds = (req, res)=>{
    const { title, description, startTime, finishTime, urlImage, idAD } = req.body

    const query = `
        insert into MARKETING(nm_titulo, nm_descricao, tmp_inicial, tmp_final, img_marketing, id_anuncio) 
	    value (?,?,?,?,?,?);
    `

    db.query(query, [title, description, startTime, finishTime, urlImage, idAD], (err, types)=>{
        if(err){
            res.status(500).json({err})
        }

        res.status(200).json({
            message: "publicado com sucesso" 
        })
    })
}

module.exports = postAds