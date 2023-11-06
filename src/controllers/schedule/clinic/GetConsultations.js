const db = require('../../../db');

const GetConsultations = async (req, res) => {
  const idAgenda = req.params.id

  let query = `
  select 
      ag.id_agenda,
      ca.id_consulta_agendada,
      cd.id_consulta_disp,
      p.nm_pet,
      tut.nm_tutor,
      date_format(cd.dt_consulta, '%d/%m/%Y') AS dt_consulta,
      cd.hr_consulta,
      med.nm_medico
  from agenda ag
      inner join consulta_disponivel cd ON cd.id_agenda = ag.id_agenda AND cd.status_consulta = 0
      inner join consulta_agendada ca ON ca.id_consulta_disp = cd.id_consulta_disp
      inner join pet p ON p.id_pet = ca.id_pet
      inner join tutor tut ON tut.id_tutor = p.id_tutor
      inner join medico med ON cd.id_medico = med.id_medico
  where ag.id_agenda = ?;
  `
  
  try {
    db.query(query, [idAgenda], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao consultar o banco de dados.');
        return;
      }
    
      if (result.length === 0) {
          res.status(400).send('A agenda não possui nenhuma consulta marcada.');
          return;
      }

      const consultas = result.map(item => ({
        "idAgenda": item.id_agenda,
        "idConsulta": item.id_consulta_agendada,
        "idDisponibilidade": item.id_consulta_disp,
        "nomePet": item.nm_pet,
        "nomeTutor": item.nm_tutor,
        "dataConsulta": `${item.dt_consulta}`,
        "horaConsulta": `${item.hr_consulta}`,
        "nomeMedico": item.nm_medico
        })
      );

      return res.status(200).json(consultas)
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = {
  GetConsultations
}