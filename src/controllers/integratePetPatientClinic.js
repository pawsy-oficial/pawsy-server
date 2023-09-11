const db = require('../db');

const integratePetPatientClinic = async (req, res) => {
  const { id_pet, cpf_tutor, id_clinica } = req.body;

  if (!id_pet || !cpf_tutor || !id_clinica) {
    return res.status(400).json({ error: "ID do pet, CPF do tutor e ID da clínica são necessários para a requisição." });
  }

  const checkPetOwnershipQuery = `
    SELECT * FROM pet 
    JOIN tutor ON pet.id_tutor = tutor.id_tutor 
    WHERE pet.id_pet = ? AND tutor.cd_cpf = ?
  `;

  db.query(checkPetOwnershipQuery, [id_pet, cpf_tutor], (error, ownershipResults) => {
    if (error) {
      return res.status(500).json({ error: "Erro ao verificar a propriedade do pet." });
    }

    if (ownershipResults.length === 0) {
      return res.status(400).json({ error: "O pet especificado não pertence ao tutor com o CPF fornecido." });
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
        return res.status(400).json({ error: "Pet-paciente já integrado nesta clínica." });
      }

      const queryInsert = `
        INSERT INTO pacientes (id_pet, id_clinica)
        VALUES (?, ?)
      `;

      db.query(queryInsert, [id_pet, id_clinica], (errorInsert) => {
        if (errorInsert) {
          return res.status(500).json({ error: "Erro ao integrar pet-paciente à clínica." });
        }

        const queryPetInfo = `
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
        });
      });
    });
  });
}

module.exports = {
  integratePetPatientClinic
}
