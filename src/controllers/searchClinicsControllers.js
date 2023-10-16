const db = require("../db")

const searchClinicsControllers = (req, res)=>{
    const { clinicName } = req.query

    const querySearch = `
        SELECT cl.id_clinica, cl.nm_clinica, cl.url_imagem, cl.status_loja, en.nm_rua, en.num_residencia FROM clinica cl
	        inner join endereco en ON en.id_endereco = cl.id_endereco
            WHERE nm_clinica LIKE "%"?"%"
    `
    db.query(querySearch, [clinicName], (err, result)=>{
        if(err){
            res.status(400).json({err: err})
        }
        res.status(200).json({result})
    })    

}

module.exports = {
    searchClinicsControllers
}