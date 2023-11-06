const db = require("../../db")

const postHistory = (req, res)=>{
    const { id_pet, id_clinic, description } = req.body

    const insertHistorySQL = 
    `
        INSERT INTO historico( id_pet, id_clinica, descricao, dt_visita ) VALUES (?,?,?,?)
    `
    const currentDate = new Date()

    db.query(insertHistorySQL, [ id_pet, id_clinic, description, currentDate ], (err, result)=>{
        if(err){
            res.status(500).json({err})
        }

        res.status(200).json({ message: "acao registrada" })
    })
}

module.exports = postHistory