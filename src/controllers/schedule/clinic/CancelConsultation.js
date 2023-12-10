const db = require('../../../db');

const CancelConsultation = async (req, res) => {

  const ag = req.params.ag
  const disp = req.params.disp

  let sql = `
    UPDATE consulta_disponivel SET status_consulta = 1 WHERE id_consulta_disp = ?;
  `;

  db.query(sql, [disp], async (err, result) => {
    if (err){
      return res.status(500).json(err);
    }

    let query = `
      DELETE FROM consulta_agendada WHERE id_consulta_disp = ? AND id_consulta_agendada = ?; 
    `

    db.query(query, [disp, ag], async (err, result) => {
      if (err){
        return res.status(500).json(err);
      }

      return res.status(200).json({
        "Message": "Consulta cancelada com sucesso!"
      })
    })
  });
};

const HistoricoConsultation = async (req, res) => {

  const idPet = req.params.pet
  const idClinica = req.params.cli
  const ag = req.params.ag

  let data = new Date();
  let dia = String(data.getDate()).padStart(2, '0');
  let mes = String(data.getMonth() + 1).padStart(2, '0');
  let ano = data.getFullYear();
  const now = ano + '-' + mes + '-' + dia;

  let sql = `
    INSERT INTO historico (id_pet, dt_visita, id_clinica, id_consulta) 
    VALUES (?, ?, ?, ?)
  `
  
  db.query(sql, [idPet, now, idClinica, ag], async (err, result) => {
    if (err){
      return res.status(500).json(err);
    }

    return res.status(200).json({'Message': 'Histórico preenchido!'})
  })

};

module.exports = {
  CancelConsultation,
  HistoricoConsultation
}