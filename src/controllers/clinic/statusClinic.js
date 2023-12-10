const db = require("../../db");

const statusClinic = async (req, res) => {

  const idClinic = req.params.id;

  let query = `
    SELECT status_loja FROM clinica WHERE id_clinica = ?
  `;

  await db.query(query, [idClinic], async (err, result) => {
    try {
      if (err){
        return res.status(500).json(err)
      }
      
      if (result[0].status_loja == true){
        let sql = `
          UPDATE clinica SET status_loja = 0 WHERE id_clinica = ?
        `;

        await db.query(sql, [idClinic], async (errr, resultt) => {
          if (err){
            return res.status(500).json(err)
          }

          return res.status(200).json(0)
        });
      } else{
        let sql = `
          UPDATE clinica SET status_loja = 1 WHERE id_clinica = ?
        `;

        await db.query(sql, [idClinic], async (errr, resultt) => {
          if (err){
            return res.status(500).json(err)
          }

          return res.status(200).json(1)
        });
      }

    } catch (error) {
      return res.status(500).json(error)
    }
  });
  
};

const viewStatusClinic = async (req, res) => {

  const idClinic = req.params.id;

  let query = `
    SELECT status_loja FROM clinica WHERE id_clinica = ?
  `;

  await db.query(query, [idClinic], async (err, result) => {
    try {
      if (err){
        return res.status(500).json(err)
      }

      if (result[0].status_loja == true){
        return res.status(200).json(true)
      } else{
        return res.status(200).json(false)
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  });

};

module.exports = {
  statusClinic,
  viewStatusClinic
}