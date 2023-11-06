const db = require('../../../db');

const VerifyStatusSchedule = async (req, res) => {
  const idAgenda = req.params.id

  let sql = `
    SELECT * FROM agenda WHERE id_agenda = ?
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

      if (result[0].status == true || result[0].status == 1) {
        res.status(200).send(true)
      } 
      else {
        res.status(200).send(false)
      }
    })
  } catch (error) {
    res.status(500).send(error)
  }
} 

module.exports = {
  VerifyStatusSchedule
}