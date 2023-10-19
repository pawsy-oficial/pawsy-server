const db = require("../db")

const getAllConsultation = (req, res)=>{
    const queryConsultation = `select * from tipo_consulta`

    db.query(queryConsultation, (err, response)=>{
        if(err){
            res.status(500).json({err})
        }

        res.status(200).json({
            response
        })
    })
}

const getAllMyPets = (req, res)=>{
    const idTutor = req.params.idTutor
    const queryAllPets = `select rc.nm_raca, pl.tp_pelagem, an.nm_animal, pt.num_peso, pt.dt_nascimento, pt.resumo, pt.nm_pet, pt.url_img, pt.id_pet as id_pawsy, sx.nm_sexo as sexo from pet pt
    inner join raca rc ON rc.id_raca = pt.id_raca
    inner join pelagem pl ON pl.id_pelagem = pt.id_pelagem
    inner join animal an ON an.id_animal = pt.id_animal 
    inner join sexo sx ON sx.id_sexo = pt.id_sexo
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

module.exports = {
    getAllConsultation,
    getAllMyPets,
    getAllMedics
}