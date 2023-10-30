const { createDbConnection } = require("../../db/mysql2")

const clinicsMedic = async (req, res) => {
  try {
    const bd = await createDbConnection();
    
    const selectClinicsMedicSQL = `
    SELECT clinica.id_clinica, clinica.nm_clinica, clinica.url_imagem, clinica.status_loja FROM trabalho
    JOIN clinica ON trabalho.cd_clinica = clinica.id_clinica
    WHERE trabalho.cd_medico = ?
    `
    // console.log(req);

    const [results] = await bd.query(selectClinicsMedicSQL, [req.Medic.storedIdMedic]);

    res.status(200).json({ count: results.length, results })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports = clinicsMedic;