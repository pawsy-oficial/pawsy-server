const bcrypt = require("bcrypt")
const db = require("../db")

const updatePassword = (req, res) => {
    const { id, newPass, currentPass } = req.body
    const { userType } = req.query

    if (userType) {
        if (userType == "medico") {
            let queryMedic = `SELECT id_medico, pw_medic FROM medico WHERE id_medico = ?`
            let updatePass = `UPDATE medico SET pw_medic = ? WHERE id_medico = ?`

            try {
                db.query(queryMedic, [ id ], (err, result)=>{
                    if(err){
                        res.status(500).json({err})
                    }

                    if(result.length != 0){
                        const pass = result[0].pw_medic
                        bcrypt.compare(currentPass, pass, (err, resultB)=>{
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
                                db.query(updatePass, [e, id], (err, result)=>{
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
                    }
                })


            } catch (error) {
                res.status(500).json({error})
            }
        } else if (userType == "clinica") {
            let queryClinic = `SELECT id_clinica, pw_clinica FROM clinica WHERE id_clinica = ?`
            let updatePass = `UPDATE clinica SET pw_clinica = ? WHERE id_clinica = ?`

            try {
                db.query(queryClinic, [ id ], (err, result)=>{
                    if(err){
                        res.status(500).json({err})
                    }

                    if(result.length != 0){
                        const pass = result[0].pw_clinica
                        bcrypt.compare(currentPass, pass, (err, resultB)=>{
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
                                db.query(updatePass, [e, id], (err, result)=>{
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
                    }
                })


            } catch (error) {
                res.status(500).json({error})
            }

        } else if (userType == "tutor") {
            let queryClinic = `SELECT id_tutor, pw_tutor FROM tutor WHERE id_tutor = ?`
            let updatePass = `UPDATE tutor SET pw_tutor = ? WHERE id_tutor = ?`

            try {
                db.query(queryClinic, [ id ], (err, result)=>{
                    if(err){
                        res.status(500).json({err})
                    }

                    if(result.length != 0){
                        const pass = result[0].pw_tutor
                        bcrypt.compare(currentPass, pass, (err, resultB)=>{
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
                                db.query(updatePass, [e, id], (err, result)=>{
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
                    }
                })


            } catch (error) {
                res.status(500).json({error})
            }
        }
    } else {
        res.status(400).json({ error: "falta parametros" })
    }

}

module.exports = updatePassword