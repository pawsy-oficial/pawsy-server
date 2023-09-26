const db = require("../db")

const tutorCoordinates = (req, res)=>{
    const { idTutor } = req.body
    if(!idTutor){
        res.json({erro : "falta de parametros"})
    }

    const queryCoordinate = `
        select en.latitude, en.longitude from tutor tt
	        inner join endereco en ON tt.id_endereco = en.id_endereco
            where id_tutor = ?;
    `

    db.query(queryCoordinate, [ idTutor ] ,(err, result)=>{
        if(err){
            res.json({ message: err })
        }

        res.json(result)
    })
}

module.exports = {
    tutorCoordinates
}