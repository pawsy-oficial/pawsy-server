const db = require("../../db")

const updateAcountMedic = (req, res) => {
    const { name, lastName, urlImage, idMedic } = req.body

    const updatProfileTutor = `
        UPDATE medico md
            SET 
                md.nm_medico = ?, 
                md.sb_medico = ?, 
                md.url_imagem = ?
            WHERE md.id_medico = ?
    `

    db.query(
        updatProfileTutor,
        [name, lastName, urlImage, idMedic],
        (err, result) => {
            if(err){
                res.status(500).json({err})
            }

            res.status(200).json({
                result: "atualizado com sucesso"
            })
        }
    )

}

module.exports = {
    updateAcountMedic
}