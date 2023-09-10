const db = require("../db")

const verifyPet = (req, res)=>{
    const id = req.params.id
    
    db.query("select id_pet from pet where id_tutor = ?", [id], (err, result)=>{
        if(err){
            return res.status(400).json({err})
        }
        if(result.length > 0){
            return res.status(200).json({petRegister: true})
        }
     
        return res.status(200).json({petRegister: false})
    })
}

module.exports = verifyPet