const dayjs = require("dayjs")
const db = require("../../db")

const getAllTypeAds = (req, res)=>{
    const query = `SELECT * FROM anuncio`

    db.query(query, (err, types)=>{
        if(err){
            res.status(500).json({err})
        }

        res.status(200).json({types})
    })
}

const getAllAds = (req, res)=>{

    const id = req.params.idClinic

    const query = `
        select mk.id_marketing as idPost, mk.nm_titulo as title, mk.nm_descricao as description, mk.tmp_inicial as startTime, mk.tmp_final, mk.img_marketing as urlImage, an.nm_anuncio as typeAd
            from marketing mk
            inner join anuncio an ON an.id_anuncio = mk.id_anuncio
            where ?
    `

    db.query(query, [id], (err, Ads)=>{
        if(err){
            res.status(500).json({err})
        }

        const formatDateAds = Ads.map(ad => (
            { ...ad,  tmp_final: dayjs(ad.tmp_final).format("YYYY-MM-DD HH:mm") }
        )) 
        const filterAds = formatDateAds.filter(m => dayjs(m.tmp_final).isAfter(dayjs().format("YYYY-MM-DD HH:mm")))

        Ads = filterAds

        res.status(200).json({Ads})
    })
}

module.exports = {
    getAllTypeAds,
    getAllAds
}