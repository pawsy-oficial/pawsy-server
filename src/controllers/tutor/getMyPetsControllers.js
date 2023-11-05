const db = require("../../db")

const getAllPets = (req, res)=>{
    const idTutor = req.params.idTutor
    const queryAllPets = `
        SELECT 
            rc.nm_raca, 
            pl.tp_pelagem, 
            an.nm_animal, 
            pt.num_peso, 
            pt.dt_nascimento, 
            pt.resumo, 
            pt.nm_pet, 
            pt.url_img, 
            pt.id_pet as id_pawsy,
            pt.tx_alergia,
            pt.bl_castrado,
            pt.tx_comportamento,
            pt.tx_tratamento,
            pt.num_altura, 
            sx.nm_sexo as sexo
        FROM pet pt
            INNER JOIN raca rc ON rc.id_raca = pt.id_raca
            INNER JOIN pelagem pl ON pl.id_pelagem = pt.id_pelagem
            INNER JOIN animal an ON an.id_animal = pt.id_animal 
            INNER JOIN sexo sx ON sx.id_sexo = pt.id_sexo
        WHERE pt.id_tutor = ?
    `
    
    try {
        db.query(queryAllPets, [idTutor], (err, result)=>{
            if(err){
                res.status(400).json({error: err})
            }
    
            res.status(200).json({myPets: result})
        })
    } catch (error) {
        res.status(500).json({error: "Ocorreu um erro interno"})
    }
}

module.exports = getAllPets