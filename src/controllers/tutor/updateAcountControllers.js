const db = require("../../db")

const updateAddressTutor = (req, res) => {
    const { cep, street, numberHome, complement, latitude, longitude, neighborhood, city, uf, idTutor } = req.body

    const updatProfileTutor = `
        UPDATE tutor tt
            INNER JOIN endereco ed ON ed.id_endereco = tt.id_endereco
            INNER JOIN bairro br ON br.id_bairro = ed.id_bairro
            INNER JOIN cidade cd ON cd.id_cidade = br.id_cidade
            SET 
                ed.cd_cep = ?, 
                ed.nm_rua = ?, 
                ed.num_residencia = ?, 
                ed.complemento = ?, 
                ed.latitude = ?, 
                ed.longitude = ?, 
                br.nm_bairro = ?, 
                cd.nm_cidade = ?, 
                cd.id_uf = ? 
            WHERE tt.id_tutor = ?
    `

    db.query(
        updatProfileTutor,
        [cep, street, numberHome, complement, latitude, longitude, neighborhood, city, uf, idTutor],
        (err, result) => {
            if(err){
                res.status(500).json({err})
            }

            res.status(200).json({
                result
            })
        }
    )

}
const updateAcountTutor = (req, res) => {
    const { name, lastName, urlImage, idTutor } = req.body

    const updatProfileTutor = `
        UPDATE tutor tt
            SET 
                tt.nm_tutor = ?, 
                tt.sb_tutor = ?, 
                tt.url_imagem = ?
            WHERE tt.id_tutor = ?
    `

    db.query(
        updatProfileTutor,
        [name, lastName, urlImage, idTutor],
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
    updateAcountTutor,
    updateAddressTutor
}