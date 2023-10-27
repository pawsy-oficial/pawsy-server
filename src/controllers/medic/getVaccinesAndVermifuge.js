const db = require("../../db");
const { createDbConnection } = require("../../db/mysql2")

const getVaccines = async (req, res) => {
	try {
		const bd = await createDbConnection();

		const selectgetVaccinesSQL = `
    SELECT * FROM carteira_vacinas
    `

		const [results] = await bd.query(selectgetVaccinesSQL);

		res.status(200).json({ count: results.length, results })

	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" })
	}
}
const getAllTypeVaccines = async (req, res) => {
	const query = `select * from vacinas`

	db.query(query, (err, result)=>{
		if(err){
			res.status(500).json({err})
		}

		res.status(200).json({result})
	})
}

module.exports = {
	getVaccines,
	getAllTypeVaccines
};