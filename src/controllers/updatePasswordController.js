const bcrypt = require("bcrypt")
const db = require("../db")

const updatePassword = (req, res) => {
    const { id, newPass, currentPass } = req.body
    const { userType } = req.query

    let querySQL, updateSQL

    if (userType) {
        if (userType == "medico") {
            querySQL = `SELECT id_medico, pw_medic FROM medico WHERE id_medico = ?`
            updateSQL = `UPDATE medico SET pw_medic = ? WHERE id_medico = ?`
        } else if (userType == "clinica") {
            querySQL = `SELECT id_clinica, pw_clinica FROM clinica WHERE id_clinica = ?`
            updateSQL = `UPDATE clinica SET pw_clinica = ? WHERE id_clinica = ?`
        } else if (userType == "tutor") {
            querySQL = `SELECT id_tutor, pw_tutor FROM tutor WHERE id_tutor = ?`
            updateSQL = `UPDATE tutor SET pw_tutor = ? WHERE id_tutor = ?`
        }
        else{
            res.status(400).json({error: "falta parametros"})
            return
        }
        
        try {
            db.query(querySQL, [ id ], (err, result)=>{
                if(err){
                    res.status(500).json({err})
                }
                const passDatabase = result[0].pw_clinica ?? result[0].pw_medic ?? result[0].pw_tutor
                if(result.length != 0){
                    bcrypt.compare(currentPass, passDatabase, (err, resultB)=>{
                        if(err){
                            res.status(500).json({err})
                            return
                        }
                        if(!resultB) {
                            res.status(401).json({message: "senha invalida"})
                            return
                        }
                        
                        bcrypt.hash(newPass, 10)
                        .then(e => {
                            db.query(updateSQL, [e, id], (err, result)=>{
                                if(err){
                                    res.status(500).json({err})
                                }
                                
                                res.status(200).json({message: "senha alterada"})
                            })
                        }).catch(err => res.status(500).json({err}))
                    })
                }
                else{
                    res.status(401).json({message: "usuario não encontrado"})
                    return
                }
            })


        } catch (error) {
            res.status(500).json({error})
            return
        }


    } else {
        res.status(400).json({ error: "falta parametros" })
        return
    }

}

module.exports = updatePassword