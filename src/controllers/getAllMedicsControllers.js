const db = require("../db")

const getAllMedics = (req, res)=>{
    const {id = null, crmv = null} = req.query

    if(id == undefined || crmv == undefined){
        return res.status(400).json({erro: "não há parametros para consulta"})
    }



    db.query("select nm_medico, url_imagem from medico where id_medico = ? or cd_crmv = ?", [id, crmv], (err, result)=>{
        if(err){
            return res.status(400).json({erro: "ocorreu um erro"})
        }
        
        if(result.length == 0){
            return res.status(404).json({response: "médico veterinário não encontrado"})
        }
        
        return res.status(200).json({result})
    })
}

module.exports = getAllMedics