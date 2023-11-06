const db = require('../../../db');

const CreateAppointment = async (req, res) => {
  const {
    idConsulta,
    idPet
  } = req.body

  let query = `
    SELECT id_consulta_disp, status_consulta FROM consulta_disponivel WHERE id_consulta_disp = ?
  `

  try {
    db.query(query, [idConsulta], (err, result) => {
      if (result && result[0] && result[0].status_consulta === false) {
        return res.status(404).send('Consulta indisponível.');
      } else {
        let sqlI = `
          INSERT INTO consulta_agendada (id_consulta_disp, id_pet) VALUES (?, ?)
        `

        db.query(sqlI, [idConsulta, idPet], (err, result) => {
          if(err){
            return res.status(500).send('Erro ao acessar o banco de dados.')
          } else {
            let sqlU = `
              UPDATE consulta_disponivel SET status_consulta = 0 WHERE id_consulta_disp = ?
            `
            db.query(sqlU, [idConsulta], (err, result) => {
              if(err){
                return res.status(500).send('Erro ao acessar o banco de dados.')
              }

              return res.status(200).send('Consulta marcada com sucesso.')
            })
          }
        })
      }
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = {
  CreateAppointment
}