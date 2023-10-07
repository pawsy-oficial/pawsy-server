const db = require("../../db")

const updateClinic = (req, res) => {
    const { cep, city, complement, image, nameClinic, neighborhood, numberHome, numberTell, state, street, uf, latitude, longitude, idClinic } = req.body

    const updateClinic = `
        UPDATE clinica
        SET tl_clinica = ?, nm_clinica = ?, url_imagem = ?
        WHERE id_clinica = ?;`
    const updateAddress = `
        UPDATE endereco
        SET cd_cep = ?, nm_rua = ?, num_residencia = ?, complemento = ?, latitude = ?, longitude = ?
        WHERE id_endereco = ?;`
    const updateNeighborhood = `
        UPDATE bairro
        SET nm_bairro = ?
        WHERE id_bairro = ?;`
    const updateCity = `
        UPDATE cidade
        SET nm_cidade = ?
        WHERE id_cidade = ?;`

    db.query(`SELECT tl_clinica from clinica where tl_clinica = ?`, [numberTell], (err, result) => {
        if(err){
            res.status(500).json({ error: "Ocorreu um erro interno" })
        }
        if(result.length > 0){
            res.status(401).json({error: "Telefone já está em uso"})
            return
        }

        db.query(updateClinic, [numberTell, nameClinic, image, idClinic], (err) => {
            if (err) {
                res.status(500).json({ error: "Ocorreu um erro interno" })
            }

            db.query(`select id_endereco from clinica where id_clinica = ?;`, [4], (err, result) => {
                if (err) {
                    res.status(500).json({ error: "Ocorreu um erro interno" })
                }
                db.query(updateAddress, [cep, street, numberHome, complement, latitude, longitude, result[0].id_endereco])
                db.query(`select id_bairro from endereco where id_endereco = ?`, [result[0].id_endereco], (err, result) => {
                    if (err) {
                        res.status(500).json({ error: "Ocorreu um erro interno" })
                    }

                    db.query(updateNeighborhood, [neighborhood, result[0].id_bairro])
                    db.query(`select id_cidade from bairro where id_bairro = ?`, [result[0].id_bairro], (err, result) => {
                        if (err) {
                            res.status(500).json({ error: "Ocorreu um erro interno" })
                        }

                        db.query(updateCity, [city, result[0].id_cidade])

                        res.status(200).json({ msg: "atualizado com sucesso" })
                    })
                })
            })
        })
    })
}

module.exports = {
    updateClinic
}