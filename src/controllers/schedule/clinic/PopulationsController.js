const db = require('../../../db');

const TipoConsulta = async (req, res) => {

  const query = `
    select * from tipo_consulta;
  `
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao consultar o banco de dados.');
      return;
    }
    
    if (result.length === 0) {
        res.status(401).send('Não foi possível encontrar os dados.');
        return;
    }

    const consultas = result.map(row => {
      return {
        id: row.id_tipo,
        tipo: row.nm_tipo
      };
    });

    return res.json({ 
      consultas
    });
  })
  

}

const MedicosIntegrados = async (req, res) => {
  const { idClinica } = req.body

  const query = `
    select 
      trb.cd_trabalho,
      mdc.nm_medico,
      esp.nm_especialidade
    from clinica cc
      join trabalho trb on trb.cd_clinica = cc.id_clinica
      join medico mdc on mdc.id_medico = trb.cd_medico
      join especialidade esp on esp.id_especialidade = mdc.id_especialidade
    where cc.id_clinica = ?;
  `

  db.query(query, [idClinica], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao consultar o banco de dados.');
      return;
    }
    
    if (result.length === 0) {
        res.status(401).send('Não foi possível encontrar os dados.');
        return;
    }

    const formattedResult = result.map(item => ({
      "Cód. Integração": item.cd_trabalho,
      "Médico Integrado": item.nm_medico,
      "Especialidade": item.nm_especialidade
      })
    );

    return res.json(
      formattedResult
    );
  })
}

module.exports = {
  TipoConsulta,
  MedicosIntegrados
}