const db = require("../../db")

const updatePet = (req, res)=>{
    const { url_imagem, resumo, sexo, idade, idPet, namePet } = req.body
    
    const updatePet = `
        UPDATE pet
        SET url_img = ?, id_sexo = ?, dt_nascimento = ? , resumo = ?, nm_pet = ?
        WHERE id_pet = ?;`
    
    db.query(updatePet, [ url_imagem, sexo, idade, resumo, namePet, idPet ], (err, result)=>{
        if(err){
            res.status(400).json({ error: err })
        }

        res.status(200).json({ res: "deu bao" })

    })
}

module.exports = updatePet