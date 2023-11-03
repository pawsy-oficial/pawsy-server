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
        tutor.nm_tutor as TutorName
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

module.exports = clinicsPet;
