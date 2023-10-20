const { createDbConnection } = require("../../db/mysql2")

const addNewVermifuge = async (req, res) => {
  try {
    const bd = await createDbConnection();
    
    const selectaddNewVermifugeSQL = `
    SELECT * FROM carteira_vermifugo
    `
    console.log(req);

    const [results] = await bd.query(selectaddNewVermifugeSQL);

    res.status(200).json({ count: results.length, results })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports = addNewVermifuge;