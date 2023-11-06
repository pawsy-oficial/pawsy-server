const db = require('../../../db');

const GetTypesConsultationsSchedule = async (req, res) => {
  const idAgenda = req.params.id

  let sql = `
    SELECT 
      dis.tp_consulta 'tp_consulta',
      dis.id_medico 'id_medico'
    FROM disponibilidade dis 
      WHERE dis.id_agenda = ?
  `

  try {
    db.query(sql, [idAgenda], (err, result) =>{
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao consultar o banco de dados.');
        return;
      }
    
      if (result.length === 0) {
          res.status(400).send('A agenda não existe.');
          return;
      }

      const tipos = result.map(item => ({
        "key": item.id_medico,
        "nm_tipo": item.tp_consulta
        })
      );

      return res.status(200).json(tipos)
   });
  } catch (error) {
    res.status(500).json({error: "Ocorreu um erro interno"})
  }
}

const GetMedicsSchedule = (req, res) => {
  const idAgenda = req.params.id

  let sql = `
    SELECT 
      dis.id_medico 'id_medico',
      med.nm_medico 'nm_medico'
    FROM disponibilidade dis 
    INNER JOIN medico med ON med.id_medico = dis.id_medico
      WHERE dis.id_agenda = ?
  `

  try {
    db.query(sql, [idAgenda], (err, result) =>{
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao consultar o banco de dados.');
        return;
      }
    
      if (result.length === 0) {
          res.status(400).send('A agenda não existe.');
          return;
      }

      const medicos = result.map(item => ({
        "id": item.id_medico,
        "medico": item.nm_medico
        })
      );

      return res.status(200).json(medicos)
   });
  } catch (error) {
    res.status(500).json({error: "Ocorreu um erro interno"})
  }
}

const GetPetsTutor = (req, res) => {
  const idTutor = req.params.id

  let sql = `
    SELECT 
      p.id_pet 'id_pet',
      p.nm_pet 'nm_pet',
      p.url_img
    FROM pet p 
      WHERE p.id_tutor = ?
  `

  try {
    db.query(sql, [idTutor], (err, result) =>{
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao consultar o banco de dados.');
        return;
      }
    
      if (result.length === 0) {
          res.status(400).send('A agenda não existe.');
          return;
      }

      const allPets = result.map(item => ({
        "idPet": item.id_pet,
        "nmPet":item.nm_pet,
        "urlImg": item.url_img
        })
      );

      return res.status(200).json(allPets)
   });
  } catch (error) {
    res.status(500).json({error: "Ocorreu um erro interno"})
  }
}

const GetClinicsInfo = async (req, res) => {
  const idClinic = req.params.id

  const query = `
    SELECT 
      cli.id_clinica AS ID,
      cli.nm_clinica AS Nome,
      cli.url_imagem AS Imagem,
      e.cd_cep AS CEP,
      e.nm_rua AS Rua,
      e.num_residencia AS Numero,
      e.latitude AS Latitude,
      e.longitude AS Longitude,
      b.nm_bairro AS Bairro,
      c.nm_cidade AS Cidade,
      u.nm_estado AS Estado
    FROM clinica cli 
    JOIN endereco e ON cli.id_endereco = e.id_endereco
    JOIN bairro b ON e.id_bairro = b.id_bairro
    JOIN cidade c ON b.id_cidade = c.id_cidade
    JOIN uf u ON c.id_uf = u.id_uf
    WHERE cli.id_clinica = ?
  `;

  try {
    db.query(query, [idClinic], async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao consultar o banco de dados.');
        return;
      }
  
      if (result.length === 0) {
        res.status(401).send('Não foi possível encontrar os dados.');
        return;
      }
      
        const storedId = result[0].ID;
        const storedNomeClinica = result[0].Nome;
        const storedUrlImg = result[0].Imagem;
        const storedCEP = result[0].CEP;
        const storedRua = result[0].Rua;
        const storedNumero = result[0].Numero;
        const storedBairro = result[0].Bairro;
        const storedCidade = result[0].Cidade;
        const storedEstado = result[0].Estado;
  
        const endereco = `${storedRua}, ${storedNumero} - ${storedBairro}, ${storedCidade} - ${storedEstado}, ${storedCEP}`;
  
        const clinics = {
          'Id': storedId,
          'Nome': storedNomeClinica,
          'Imagem': storedUrlImg,
          'Endereco': endereco,
        };
      
  
      return res.json(clinics);
    });
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = {
  GetTypesConsultationsSchedule,
  GetMedicsSchedule,
  GetPetsTutor,
  GetClinicsInfo
}