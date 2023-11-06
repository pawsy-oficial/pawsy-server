const db = require('../db');

const pets = (req, res)=>{
	const { idPet, cpfTutor } = req.query;

	const checkPetOwnershipQuery = `
		SELECT id_pet, url_img, nm_pet FROM pet 
		JOIN tutor ON pet.id_tutor = tutor.id_tutor 
		WHERE pet.id_pet = ? OR tutor.cd_cpf = ?
	`

	if(!idPet && !cpfTutor){
		res.status(400).json({ error: "ID do pet ou CPF do tutor são necessários para a requisição" });
		return
	}
	
	db.query(checkPetOwnershipQuery, [idPet, cpfTutor], (err, result)=>{ 
		if (err) {
			return res.status(500).json({ error: "Erro ao verificar a propriedade do pet." });
		}

		res.status(200).json({result: result})
	})
}

const integratePetPatientClinic = async (req, res) => {
	const { id_pet, cpf_tutor, id_clinica } = req.body;
	if ((!id_pet || !cpf_tutor) && !id_clinica) {
		return res.status(400).json({ error: "ID do pet, CPF do tutor e ID da clínica são necessários para a requisição." });
	}

	const checkPetOwnershipQuery = `
		SELECT id_pet, url_img, nm_pet FROM pet 
		JOIN tutor ON pet.id_tutor = tutor.id_tutor 
		WHERE pet.id_pet = ? OR tutor.cd_cpf = ?
  	`;

	db.query(checkPetOwnershipQuery, [id_pet, cpf_tutor], (error, ownershipResults) => {
		if (error) {
			return res.status(500).json({ error: "Erro ao verificar a propriedade do pet." });
		}

		if (ownershipResults.length === 0) {
			if(cpf_tutor){
				return res.status(404).json({ error: "Tutor não possui nenhum pet cadastrado"});
			}
			else if(id_pet){
				return res.status(404).json({ error: "Pet não encontrado"});
			}
		}

		const queryCheck = `
			SELECT * FROM pacientes 
			WHERE id_pet = ? AND id_clinica = ?
		`;

		db.query(queryCheck, [id_pet, id_clinica], (error, results) => {
			if (error) {
				return res.status(500).json({ error: "Erro ao verificar a integração do pet-paciente." });
			}

			if (results.length > 0) {
				return res.status(400).json({ error: "Pet já cadastrado nesta clínica." });
			}

			const queryInsert = `
				INSERT INTO pacientes (id_pet, id_clinica)
				VALUES (?, ?)
			`;

			db.query(queryInsert, [id_pet, id_clinica], (errorInsert) => {
				if (errorInsert) {
					return res.status(500).json({ error: "Erro ao integrar pet-paciente à clínica." });
				}

				res.status(200).json({message: "Pet-paciente integrado com sucesso!"})
				/*const queryPetInfo = `
					SELECT 
						pet.nm_pet, 
						raca.nm_raca AS raca, 
						pelagem.tp_pelagem AS pelagem, 
						sexo.nm_sexo AS sexo, 
						animal.nm_animal AS tipo_animal, 
						pet.url_img AS imagem_pet
					FROM pet 
					JOIN raca ON pet.id_raca = raca.id_raca
					JOIN pelagem ON pet.id_pelagem = pelagem.id_pelagem
					JOIN sexo ON pet.id_sexo = sexo.id_sexo
					JOIN animal ON pet.id_animal = animal.id_animal
					WHERE pet.id_pet = ?
				`;

				db.query(queryPetInfo, [id_pet], (errorInfo, petInfo) => {
					if (errorInfo) {
						console.error("SQL Error:", errorInfo);  // Adicionando mais logs para diagnóstico
						console.error("Using id_pet value:", id_pet);  // Log do valor que você está passando para a consulta
						return res.status(500).json({ error: "Erro ao obter informações do pet-paciente." });
					}

					const petData = petInfo[0];

					return res.status(201).json({
						message: "Pet-paciente integrado com sucesso!",
						nome: petData.nm_pet,
						raca: petData.raca,
						pelagem: petData.pelagem,
						sexo: petData.sexo,
						tipo_animal: petData.tipo_animal,
						imagem: petData.imagem_pet
					});
				});*/
			});
		});
	});
}

const getAllPatientsClinic = (req, res) => {
	
	const idClinic = req.params.idClinic

	const queryAllPatients = `
		select pt.nm_pet as namePet, pt.url_img as imagePet, tt.nm_tutor as nameTutor, pt.id_pet as id, sx.nm_sexo from pacientes pc
		inner join pet pt ON pt.id_pet = pc.id_pet
		inner join tutor tt ON tt.id_tutor = pt.id_tutor
		inner join sexo sx ON sx.id_sexo = pt.id_sexo
		where id_clinica = ?;
	`

	db.query(queryAllPatients, [idClinic], (err, result)=>{
		if(err){
			res.status(500).json({error: err})
		}

		res.status(200).json({result})
	})
}

const countPatientsClinic = (req, res) => {
	const idClinic = req.params.idClinic;

	const queryCountPatients = `
			select an.nm_animal as especie, count(an.nm_animal) as quantidade from pacientes pc
			inner join pet pt ON pt.id_pet = pc.id_pet
			inner join animal an ON an.id_animal = pt.id_animal
			where id_clinica = ?
			group by an.nm_animal;
	`;

	db.query(queryCountPatients, [idClinic], (err, result) => {
			if (err) {
					return res.status(500).json({ error: err });
			}
			const resultObj = {};
			result.forEach(item => {
					resultObj[item.especie] = item.quantidade;
			});

			const client = [
					{
							"especie": "cachorro",
							"quantidade": resultObj["cachorro"] || 0
					},
					{
							"especie": "gato",
							"quantidade": resultObj["gato"] || 0
					}
			];

			res.status(200).json({ client });
	});
}

module.exports = {
	integratePetPatientClinic,
	pets,
	getAllPatientsClinic,
	countPatientsClinic
}
