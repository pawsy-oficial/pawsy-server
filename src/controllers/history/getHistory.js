const db = require("../../db")

const getHistory = (req, res)=>{
    const { idPet } = req.body

    const queryHistorySQL = 
    `
        SELECT 
            hs.descricao as description,
            hs.dt_visita as dateVisit,
            cl.nm_clinica as nameClinic
        FROM historico hs
        INNER JOIN clinica cl ON cl.id_clinica = hs.id_clinica
        WHERE hs.id_pet = ?
    `

    db.query(queryHistorySQL, [ idPet ], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        res.status(200).json({ result })
    })
}

module.exports = getHistory