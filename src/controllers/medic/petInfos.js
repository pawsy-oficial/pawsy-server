const { createDbConnection } = require("../../db/mysql2")

const petInfos = async (req, res) => {
  try {
    const bd = await createDbConnection();

    const selectPetInfoSQL = `
      SELECT pet.*, tutor.nm_tutor FROM pacientes
      JOIN pet ON pet.id_pet = pacientes.id_pet
      INNER JOIN tutor ON tutor.id_tutor = pet.id_tutor
      WHERE pacientes.id_clinica = ?
    `

    const [results] = await bd.query(selectPetInfoSQL, [req.Medic.storedIdMedic]);

    res.status(200).json({ count: results.length, results })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports = petInfos;