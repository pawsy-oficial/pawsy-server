const { createDbConnection } = require("../../db/mysql2")

const getVaccines = async (req, res) => {
  try {
    const bd = await createDbConnection();
    
    const selectgetVaccinesSQL = `
    SELECT * FROM carteira_vacinas
    `
    console.log(req);

    const [results] = await bd.query(selectgetVaccinesSQL);
    console.log(results);

    res.status(200).json({ count: results.length, results })

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports = getVaccines;