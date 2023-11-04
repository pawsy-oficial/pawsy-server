const db = require("../../db");
const { createDbConnection } = require("../../db/mysql2")

const getVaccines = async (req, res) => {
	const idPet = req.params.idPet
	try {
		const bd = await createDbConnection();

		const selectgetVaccinesSQL = `
			SELECT 
				cv.id_aplicacao as idAplication, 
				cv.dt_aplicacao as dateAplication, 
				cv.dt_retorno as dateReturn, 
				CONCAT(md.nm_medico , ' ' , md.sb_medico) as nameMedic,
				md.cd_crmv as crmv,
				vc.nm_vacina as nameVaccine
			FROM carteira_vacinas cv 
				INNER JOIN vacinas vc ON vc.id_vacina = cv.id_vacina
				INNER JOIN medico md ON md.id_medico = cv.id_medico 
				WHERE id_pet = ?
		`

		const [results] = await bd.query(selectgetVaccinesSQL, [idPet]);

		res.status(200).json({ count: results.length, results })

	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" })
	}
}

const getAllTypeVaccines = async (req, res) => {
	const { breedType } = req.query

	const query = `SELECT id_vacina as idVaccine, nm_vacina as nameVaccine FROM vacinas WHERE tp_vacina = ? OR tp_vacina = "all"`

	db.query(query, [breedType], (error, result) => {
		if (error) {
			res.status(500).json({
				error: error
			})
		}
		res.status(200).json({
			result
		})
	})
}

const getAllVermifuges = async (req, res) => {
	const { idPet, idTutor} = req.params
	try {
		const bd = await createDbConnection();

		const selectaddNewVermifugeSQL = `
			SELECT cv.id_aplicacao, cv.nm_vermifugo, cv.dt_aplicacao FROM carteira_vermifugo cv
			INNER JOIN pet pt ON pt.id_pet = cv.id_pet
			INNER JOIN tutor tt ON tt.id_tutor = pt.id_tutor
			WHERE cv.id_pet = ? AND tt.id_tutor = ?
	  	`

		const [results] = await bd.query(selectaddNewVermifugeSQL, [idPet, idTutor]);

		res.status(200).json({ count: results.length, results })

	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" })
	}
}

module.exports = {
	getVaccines,
	getAllTypeVaccines,
	getAllVermifuges
};