const db = require("../../db")
const dayjs = require("dayjs")

const currentDate = dayjs()

const postAds = (req, res) => {
    const { title, description, urlImage, idAD, idClinic, limitTime } = req.body


    if(!title || !description || !urlImage || !idAD || !idClinic || !limitTime){
        res.status(400).json({messaeg: "Falta de parametros"})
        return
    }

    const nextDate = currentDate.add(limitTime, "day")
    const formatNextDate = dayjs(nextDate).format("YYYY-MM-DD HH:mm:ss")
    const formatCurrentDate = dayjs(currentDate).format("YYYY-MM-DD HH:mm:ss")

    const query = `
        insert into MARKETING(nm_titulo, nm_descricao, tmp_inicial, tmp_final, img_marketing, id_anuncio, id_clinica, tm_qnt_dias) 
        value (?,?,?,?,?,?,?,?);
    `

    db.query(query, [title, description, formatCurrentDate, formatNextDate, urlImage, idAD, idClinic, limitTime], (err, types)=>{
        if(err){
            res.status(500).json({err})
        }

        res.status(200).json({
            message: "publicado com sucesso"
        })
    })
}

module.exports = postAds