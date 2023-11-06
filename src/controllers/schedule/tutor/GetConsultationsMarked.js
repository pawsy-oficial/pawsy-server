const db = require('../../../db');

const GetConsultationsMarked = async (req, res) => {
  const idTutor = req.params.id

  let query = `
    select 
      cli.nm_clinica,
      cli.url_imagem,
      p.nm_pet,
      date_format(cd.dt_consulta, '%d/%m/%Y') AS dt_consulta,
      cd.hr_consulta,
      esp.nm_especialidade,
      med.nm_medico
  FROM consulta_agendada ca
    inner join consulta_disponivel cd ON ca.id_consulta_disp = cd.id_consulta_disp
    inner join agenda ag ON ag.id_agenda = cd.id_agenda
    inner join clinica cli ON cli.id_clinica = ag.id_clinica
    inner join pet p ON p.id_pet = ca.id_pet
    inner join medico med ON cd.id_medico = med.id_medico
    inner join especialidade esp ON esp.id_especialidade = med.id_especialidade
  where p.id_tutor = ? and cd.status_consulta = 0;
  `

  try {
    db.query(query, [idTutor], (err, result) =>{
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao consultar o banco de dados.');
        return;
      }
    
      if (result.length === 0) {
          res.status(400).send('O tutor não possui nenhuma consulta marcada.');
          return;
      }

      const consultas = result.map(item => ({
        "nmClinic": item.nm_clinica,
        "nmPet": item.nm_pet,
        "urlImg": item.url_imagem,
        "dtConsulta": item.dt_consulta,
        "hrConsulta": item.hr_consulta,
        "nmEspecialidade": item.nm_especialidade,
        "nmMedico": item.nm_medico
        })
      );

      return res.status(200).json(consultas)
   });
  } catch (error) {
    res.status(500).json({error: "Ocorreu um erro interno"})
  }
}

module.exports = {
  GetConsultationsMarked
}