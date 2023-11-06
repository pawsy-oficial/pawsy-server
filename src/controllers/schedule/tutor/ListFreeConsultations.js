const db = require('../../../db');

const ListFreeConsultations = (req, res) => {
  const idAgenda = req.params.id

  let sql = `
    SELECT
      cd.id_consulta_disp 'id_consulta_disp',
      date_format(cd.dt_consulta, '%d/%m/%Y') 'dt_consulta',
      cd.hr_consulta 'hr_consulta',
      med.id_medico 'id_medico',
      med.nm_medico 'nm_medico',
      esp.nm_especialidade 'tp_consulta',
      ag.id_clinica 'id_clinica'
    FROM consulta_disponivel cd
      INNER JOIN medico med on med.id_medico = cd.id_medico
      INNER JOIN especialidade esp on esp.id_especialidade = med.id_especialidade
      INNER JOIN agenda ag ON ag.id_agenda = cd.id_agenda
    WHERE cd.id_agenda = ? and status_consulta = 1;
  `;

  try {
    db.query(sql, [idAgenda], (err, result) =>{
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao consultar o banco de dados.');
        return;
      }
    
      if (result.length === 0) {
          res.status(400).send('A agenda não foi ativada.');
          return;
      }

      const consultas = result.map(item => ({
        "idConsulta": item.id_consulta_disp,
        "dtConsulta": item.dt_consulta,
        "hrConsulta": item.hr_consulta,
        "idMedico": item.id_medico,
        "nmMedico": item.nm_medico,
        "tpConsulta": item.tp_consulta,
        "idClinic": item.id_clinica
      })
    );

    return res.status(200).json(consultas)

    })
  } catch (error) {
    res.status(500).json({error: "Ocorreu um erro interno"})
  }
}

module.exports = {
  ListFreeConsultations
}