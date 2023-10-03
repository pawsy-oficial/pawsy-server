const db = require("../../db")

const getAllPets = (req, res)=>{
    const idTutor = req.params.idTutor
    const queryAllPets = `select rc.nm_raca, pl.tp_pelagem, an.nm_animal, pt.num_peso, pt.dt_nascimento, pt.resumo, pt.nm_pet, pt.url_img from pet pt
    inner join raca rc ON rc.id_raca = pt.id_raca
    inner join pelagem pl ON pl.id_pelagem = pt.id_pelagem
    inner join animal an ON an.id_animal = pt.id_animal 
    where pt.id_tutor = ?;`
    
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