const db = require('../../../db');

const ListScheduleClinic = (req, res) => {
  const idClinica = req.params.id

  let sql = `
    select 
      *,
      date_format(dt_abertura, '%d/%m/%Y') AS dt_abertura,
      date_format(dt_fechamento, '%d/%m/%Y') AS dt_fechamento
    from AGENDA
    where id_clinica = ?;
  `;
  try {
    db.query(sql, [idClinica], (err, result) =>{
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao consultar o banco de dados.');
        return;
      }
    
      if (result.length === 0) {
          res.status(400).send('A clínica ainda não possui nenhuma agenda.');
          return;
      }

      

      const agendas = result.map(item => ({
          "idAgenda": item.id_agenda,
          "idClinica": item.id_clinica,
          "dtAbertura": item.dt_abertura,
          "dtFechamento": item.dt_fechamento,
          "obs": item.observacoes,
          "nmAgenda": item.nm_agenda
        })
      );
     
      return res.status(200).json(agendas)

    })
  } catch (error) {
    res.status(500).json({error: "Ocorreu um erro interno"})
  }
}

module.exports = {
  ListScheduleClinic
}