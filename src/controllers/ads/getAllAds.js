const db = require("../../db")

const getAllTypeAds = (req, res)=>{
    const query = `SELECT * FROM anuncio`

    db.query(query, (err, types)=>{
        if(err){
            res.status(500).json({err})
        }

        res.status(200).json({types})
    })
}

module.exports = getAllTypeAds