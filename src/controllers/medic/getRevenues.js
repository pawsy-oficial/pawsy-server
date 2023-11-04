const { createDbConnection } = require("../../db/mysql2")

const getRevenues = async (req, res) => {
  try {
    const bd = await createDbConnection();

    const selectGetRevenuesSQL = `
    SELECT * FROM receitas
    JOIN tupla_receita ON receitas.id_TuplaReceita = tupla_receita.id_TuplaReceita
    JOIN pet ON receitas.id_pet = pet.id_pet
    JOIN tutor ON tutor.id_tutor = pet.id_tutor
    JOIN medico ON receitas.id_medico = medico.id_medico
    `

    const [results] = await bd.query(selectGetRevenuesSQL);

    res.status(200).json({ count: results.length, results })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports = getRevenues;