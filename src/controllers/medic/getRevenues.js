const db = require("../../db")
const { createDbConnection } = require("../../db/mysql2")

const getRevenues = async (req, res) => {
	const { idRevenues } = req.params


	const headerQuery = `
		  SELECT 
			rc.id_receita,
			pt.nm_pet,
			pt.dt_nascimento,
			an.nm_animal,
			sx.nm_sexo,
			tt.nm_tutor,
			rc.id_medico,
			CONCAT(md.nm_medico, " ", md.sb_medico) as nm_medico,
			md.cd_crmv,
			rc.dt_validade,
			rc.dt_emisao,
			tpr.nm_TipoReceita
		  FROM receitas rc
			INNER JOIN pet pt ON pt.id_pet = rc.id_pet
			INNER JOIN animal an ON an.id_animal = pt.id_animal
			INNER JOIN sexo sx ON sx.id_sexo = pt.id_sexo
			INNER JOIN tutor tt ON tt.id_tutor = pt.id_tutor
			INNER JOIN medico md ON md.id_medico = rc.id_medico
			INNER JOIN tp_receita tpr ON tpr.id_TipoReceita = rc.id_TipoReceita
		  WHERE id_receita = ?;
		`;

	// Consulta para os medicamentos
	const medicamentosQuery = `
		  SELECT * FROM tupla_receita WHERE id_receita = ?;
		`;

	const result = {};

	// Executar a consulta do cabeçalho
	db.query(headerQuery, [ idRevenues ], (err, headerData) => {
		if (err) {
			console.log('Erro na consulta do cabeçalho: ' + err);
			res.status(500).json({ error: 'Erro no servidor' });
			return;
		}

		result.header = headerData;

		// Executar a consulta dos medicamentos
		db.query(medicamentosQuery, [ idRevenues ], (err, medicamentosData) => {
			if (err) {
				console.log('Erro na consulta dos medicamentos: ' + err);
				res.status(500).json({ error: 'Erro no servidor' });
				return;
			}

			result.medicamentos = medicamentosData;

			// Enviar o resultado como JSON
			res.json(result);
		});
	});


}

const getAllRevenues = (req, res) => {
	const { idPet } = req.params

	const selectSQL = `
		SELECT rc.*, CONCAT(md.nm_medico, " ", md.sb_medico) as nm_medico FROM receitas rc
			INNER JOIN medico md ON md.id_medico = rc.id_medico
		where id_pet = ?
	`

	db.query(selectSQL, [ idPet ], (err, result)=>{
		if(err){
			res.status(500).json({err})
		}

		res.status(200).json({result})
	})
}

const getAllTypeRevenue = async (req, res) => {
	try {
		const bd = await createDbConnection();

		const selectGetTypeRevenueSQL = `SELECT * FROM tp_receita`

		const [results] = await bd.query(selectGetTypeRevenueSQL);

		res.status(200).json({ count: results.length, results })
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" })
	}
}

module.exports = { getAllTypeRevenue, getRevenues, getAllRevenues };