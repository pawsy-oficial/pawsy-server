const db = require("../db")

const races = (req, res)=>{
    const typeKind = req.query.kind
    
    if(typeKind == "cat" || typeKind == "dog"){
        db.query("select id_raca, nm_raca from raca where tp_raca = ?", [typeKind], (err, results)=>{
            if(err){
                res.status(400).json({
                    erro: "não foi possivel consultar o banco de dados"
                })
                return
            }

            return res.status(200).json({
                result: results
            })
        })
    }
    else{
        res.status(400).json({erro: "Espécie não indentificada"})
    }
}

module.exports = races