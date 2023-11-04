const { createDbConnection } = require("../../db/mysql2")

const clinicsPet = async (req, res) => {
  try {
    const bd = await createDbConnection();

    const selectClinicsPetSQL = `
      SELECT 
        pt.id_pet as PetID, 
        rc.nm_raca as BreedName, 
        pl.tp_pelagem as CoatType, 
        sx.nm_sexo as Gender, 
        an.nm_animal as AnimalType, 
        pt.dt_nascimento as BirthDate, 
        pt.resumo as Summary, 
        pt.nm_pet as PetName, 
        pt.url_img as PetImage, 
        tutor.nm_tutor as TutorName,
        tutor.id_tutor as TutorId
      FROM pacientes pc
      INNER JOIN pet pt ON pt.id_pet = pc.id_pet
      INNER JOIN pelagem pl ON pl.id_pelagem = pt.id_pelagem
      INNER JOIN raca rc ON rc.id_raca = pt.id_raca
      INNER JOIN sexo sx ON sx.id_sexo = pt.id_sexo
      INNER JOIN animal an ON an.id_animal = pt.id_animal
      INNER JOIN tutor ON tutor.id_tutor = pt.id_tutor
      WHERE pc.id_clinica = ?;
    `

    const [results] = await bd.query(selectClinicsPetSQL, [req.Medic.storedIdMedic]);

    res.status(200).json({ count: results.length, results })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const getAllPetsTutor = async (req, res) => {
  const { idTutor, idClinic } = req.params
  
  try {
    const bd = await createDbConnection()

    const selectPetsTutorSQL = `
      SELECT pt.nm_pet, pt.url_img, tt.nm_tutor, pt.id_pet, tt.url_imagem FROM pacientes pc
        INNER JOIN pet pt ON pt.id_pet = pc.id_pet
        INNER JOIN tutor tt ON tt.id_tutor = pt.id_tutor
        WHERE pc.id_clinica = ? AND tt.id_tutor = ?;
    `
    const [ results ] = await bd.query(selectPetsTutorSQL, [idClinic, idTutor])

    res.status(200).json({results})
    
  } catch (error) {
    res.status(500).json({error})
  }
}

module.exports = {
  clinicsPet,
  getAllPetsTutor
};
