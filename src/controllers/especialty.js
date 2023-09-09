const db = require("../db")

const getSpecialty = (req, res)=>{
    db.query("select * from especialidade", (err, result)=>{
        if(err){
            return res.status(400).json({error: err})
        }

        return res.status(200).json({result: result})
    })
}

module.exports = getSpecialty