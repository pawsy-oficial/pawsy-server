const db = require("../../db")

const updatePet = (req, res) => {
    try {
        const { note } = req.query
    
        if (note == "true") {
            const { behavior, castrated, drug, height, treatment, weight, idPet } = req.body
    
            let updatePet = `
                UPDATE pet SET tx_comportamento = ?, bl_castrado = ?, tx_alergia = ?, num_altura = ?, tx_tratamento = ?, num_peso = ?
                WHERE id_pet = ?
            `
    
            db.query(updatePet, [ behavior, castrated, drug, height, treatment, weight, idPet ], (err, result) => {
                if (err) {
                    res.status(400).json({ error: err })
                }
    
                res.status(200).json({ res: "deu bao" })
            })
        }
        else {
            const { url_imagem, resumo, sexo, idade, idPet, namePet } = req.body
    
            let updatePet = `
            UPDATE pet
            SET url_img = ?, id_sexo = ?, dt_nascimento = ? , resumo = ?, nm_pet = ?
            WHERE id_pet = ?;`
    
            db.query(updatePet, [url_imagem, sexo, idade, resumo, namePet, idPet], (err, result) => {
                if (err) {
                    res.status(400).json({ error: err })
                }
    
                res.status(200).json({ res: "deu bao" })
    
            })
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = updatePet