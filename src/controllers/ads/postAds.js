const db = require("../../db")
const dayjs = require("dayjs")

const currentDate = dayjs()

const postAds = (req, res) => {
    const { title, description, urlImage, idAD, idClinic, limitTime } = req.body

    const nextDate = currentDate.add(limitTime, "day")
    const formatNextDate = dayjs(nextDate).format("YYYY-MM-DD HH:mm:ss")
    const formatCurrentDate = dayjs(currentDate).format("YYYY-MM-DD HH:mm:ss")

    const query = `
        insert into MARKETING(nm_titulo, nm_descricao, tmp_inicial, tmp_final, img_marketing, id_anuncio, id_clinica) 
        value (?,?,?,?,?,?,?);
    `

    db.query(query, [title, description, formatCurrentDate, formatNextDate, urlImage, idAD, idClinic], (err, types)=>{
        if(err){
            res.status(500).json({err})
        }

        res.status(200).json({
            message: "publicado com sucesso"
        })
    })
}

module.exports = postAds