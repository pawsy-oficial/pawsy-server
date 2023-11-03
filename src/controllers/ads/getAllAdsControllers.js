const dayjs = require("dayjs")
const db = require("../../db")

const getAllTypeAds = (req, res) => {
    const query = `SELECT * FROM anuncio`

    db.query(query, (err, types) => {
        if (err) {
            res.status(500).json({ err })
        }

        res.status(200).json({ types })
    })
}

const getAllAds = (req, res) => {

    const id = req.params.idClinic
    const { filter } = req.query

    const query = `
        select mk.id_marketing as idPost, mk.nm_titulo as title, mk.nm_descricao as description, mk.tmp_inicial as startTime, mk.tmp_final, mk.tm_qnt_dias as limitDay, mk.img_marketing as urlImage, an.nm_anuncio as typeAd, cl.nm_clinica as nameClinic, mk.id_clinica as idClinic, cl.url_imagem as urlImageClinic
            from marketing mk
            inner join anuncio an ON an.id_anuncio = mk.id_anuncio
            inner join clinica cl ON cl.id_clinica = mk.id_clinica
            where mk.id_clinica = ?
    `

    const queryPreview = id != "all" && filter != "vaccine"
        ? `
            select mk.id_marketing as idPost, mk.nm_titulo as title, mk.nm_descricao as description, mk.tmp_final, mk.img_marketing as imgPost, cl.nm_clinica as nameClinic, mk.id_clinica as idClinic, cl.url_imagem as urlImageClinic
                from marketing mk
                inner join anuncio an ON an.id_anuncio = mk.id_anuncio
                inner join clinica cl ON cl.id_clinica = mk.id_clinica
                where cl.id_clinica = ?
        `
        : `
            select mk.id_marketing as idPost, mk.nm_titulo as title, mk.nm_descricao as description, mk.tmp_final, mk.img_marketing as imgPost, cl.nm_clinica as nameClinic, mk.id_clinica as idClinic, cl.url_imagem as urlImageClinic
                from marketing mk
                inner join anuncio an ON an.id_anuncio = mk.id_anuncio
                inner join clinica cl ON cl.id_clinica = mk.id_clinica
                where an.id_anuncio = 1;
        `

    db.query((filter == "preview" ? queryPreview : query), [id], (err, Ads) => {
        if (err) {
            res.status(500).json({ err })
        }
        // console.log(Ads);
        const formatDateAds = Ads.map(ad => (
            { ...ad, tmp_final: dayjs(ad.tmp_final).format("YYYY-MM-DD HH:mm") }
        ))
        const filterAds = formatDateAds.filter(m => dayjs(m.tmp_final).isAfter(dayjs().format("YYYY-MM-DD HH:mm")))

        Ads = filterAds

        if (filter == "preview") {
            const adsPreview = []
            for (let i = 0; i < Ads.length; i++) {
                if ((i + 1) <= 20) {
                    adsPreview.push(Ads[i])
                }
                else break
            }

            res.status(200).json({ adsPreview })
        }
        else {
            res.status(200).json({ Ads })
        }
    })
}

module.exports = {
    getAllTypeAds,
    getAllAds
}