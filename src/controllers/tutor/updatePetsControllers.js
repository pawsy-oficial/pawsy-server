const db = require("../../db")

const updatePet = (req, res)=>{
    const { url_imagem, resumo, raca, sexo, idade, idTutor } = req.body
    
    const updatePet = `
        UPDATE pet
        SET url_img = ?, id_sexo = ?, dt_nascimento = ?, id_raca = ?, resumo = ?
        WHERE id_pet = ?;`
    
    db.query(updatePet, [ url_imagem, sexo, idade, raca, resumo, idTutor ], (err, result)=>{
        if(err){
            res.status(400).json({ error: err })
        }

        res.status(200).json({ res: "deu bao" })

    })
}

module.exports = updatePet