const { createDbConnection } = require("../../db/mysql2")

const petInfos = async (req, res) => {
  try {
    const bd = await createDbConnection();

    const selectPetInfoSQL = `
      SELECT pet.* FROM pet
      WHERE pet.id_pet = ?
    `

    const [results] = await bd.query(selectPetInfoSQL, [req.Medic.storedIdMedic]);

    res.status(200).json({ count: results.length, results })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports = petInfos;