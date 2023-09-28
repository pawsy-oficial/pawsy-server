const bd = require("../db")

const cepState = (req, res)=>{
    const selectUfSQL = "select * from uf"

    bd.query(selectUfSQL, (err, results)=>{
        if(err){
            res.status(400).json({message:"não foi possivel fazer essa requisição"})
        }

        res.status(200).json({result: results})
    })
}


module.exports = vermifuge