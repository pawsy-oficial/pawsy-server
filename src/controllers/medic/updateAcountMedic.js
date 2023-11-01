const db = require("../../db")

const updateAcountMedic = (req, res) => {
    const { name, lastName, urlImage, idMedic } = req.body

    const updatProfileTutor = `
        UPDATE medico tt
            SET 
                tt.nm_tutor = ?, 
                tt.sb_medico = ?, 
                tt.url_imagem = ?
            WHERE tt.id_tutor = ?
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