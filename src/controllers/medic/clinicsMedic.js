const bd = require("../../db")

const clinicsMedic = (req, res)=>{
    const selectClinicsMedicSQL = "select cd_clinica from trabalho where id_medico = 1"

    bd.query(selectClinicsMedicSQL, (err, results)=>{
        if(err){
            res.status(400).json({message:"não foi possivel fazer essa requisição"})
        }

        res.status(200).json({result: results})
    })
}

module.exports = clinicsMedic