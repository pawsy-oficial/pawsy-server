const db = require("../db");

const WellbeingAlgorithm = async (req, res) => {
  const idPet = req.params.id;

  let sql = `
  SELECT 
  MAX(p.num_peso) AS num_peso,
  MAX(p.num_altura) AS num_altura,
  MAX(p.passeio) AS passeio,
  MAX(cd.dt_consulta) AS ultima_consulta,
  MAX(vac.nm_vacina) AS nm_vacina,
  MAX(va.dt_aplicacao) AS dt_aplicacao_vacina,
  MAX(cv.dt_aplicacao) AS dt_aplicacao_vermifugo,
  MAX(cv.nm_vermifugo) AS nm_vermifugo,
  MAX(an.nm_animal) AS nm_animal
FROM pet p
INNER JOIN consulta_agendada ca ON ca.id_pet = p.id_pet
INNER JOIN consulta_disponivel cd ON cd.id_consulta_disp = ca.id_consulta_disp
INNER JOIN carteira_vacinas va ON va.id_pet = p.id_pet
INNER JOIN vacinas vac ON vac.id_vacina = va.id_vacina
INNER JOIN carteira_vermifugo cv ON cv.id_pet = p.id_pet
INNER JOIN animal an ON an.id_animal = p.id_animal
WHERE p.id_pet = ?;

  `;

  try {
    db.query(sql, [idPet], (err, result) => {
      if (err) {
        return res.status(500).send('Problemas ao realizar a query.');
      }

      if (result.length === 0) {
        res.status(400).send('Não há dados suficientes para tirar conclusões.');
        return;
      }

      const peso = result[0].num_peso;
      const altura = result[0].num_altura;
      const passeio = result[0].passeio;
      const ultimaConsulta = result[0].ultima_consulta;
      const vacina = result[0].nm_vacina;
      const vermifugo = result[0].nm_vermifugo;
      const especie = result[0].nm_animal

      const horasDesdeUltimoPasseio = Math.floor((Date.now() - new Date(passeio).getTime()) / 3600000); // Converter milissegundos para horas

      const horasDesdeUltimaConsulta = Math.floor((Date.now() - new Date(ultimaConsulta).getTime()) / 3600000);

      let nivelBemEstar = 1;

      if (peso > 10) {
        nivelBemEstar = 4;
      } else if (peso > 5) {
        nivelBemEstar = 3;
      } else if (horasDesdeUltimoPasseio <= 48) {
        nivelBemEstar = 4;
      } else if (horasDesdeUltimaConsulta <= 2920) {
        nivelBemEstar = 4;
      } else if (vacina != null && vermifugo != null) {
        nivelBemEstar = 4;
      } else if (altura < 20) {
        nivelBemEstar = 2;
      }

      res.status(200).json({ nivelBemEstar });
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getInfosBem = async (req, res) => {

  const idPet = req.params.id;

  let query = `
  SELECT 
    MAX(p.num_peso) AS num_peso,
    MAX(p.num_altura) AS num_altura,
    MAX(DATE_FORMAT(p.passeio, '%d/%m/%Y %H:%i')) AS passeio,
    MAX(DATE_FORMAT(cdd.dt_consulta, "%d/%m/%Y")) AS ultima_consulta,
    MAX(vac.nm_vacina) AS nm_vacina,
    MAX(DATE_FORMAT(va.dt_aplicacao, "%d/%m/%Y")) AS dt_aplicacao_vacina,
    MAX(DATE_FORMAT(cv.dt_aplicacao, "%d/%m/%Y")) AS dt_aplicacao_vermifugo,
    MAX(cv.nm_vermifugo) AS nm_vermifugo,
    MAX(DATE_FORMAT(his.dt_visita, "%d/%m/%Y")) AS ultima_consulta_feita,
    MAX(an.nm_animal) AS nm_animal
  FROM pet p
    LEFT JOIN consulta_agendada ca ON ca.id_pet = p.id_pet
    LEFT JOIN carteira_vacinas va ON va.id_pet = p.id_pet
    LEFT JOIN vacinas vac ON vac.id_vacina = va.id_vacina
    LEFT JOIN carteira_vermifugo cv ON cv.id_pet = p.id_pet
    LEFT JOIN animal an ON an.id_animal = p.id_animal
    LEFT JOIN consulta_disponivel cdd ON cdd.id_consulta_disp = ca.id_consulta_disp AND cdd.status_consulta = 0
    LEFT JOIN historico his ON his.id_consulta = ca.id_consulta_agendada
  WHERE p.id_pet = ?;
  `

    try { 
      db.query(query, [idPet], async (err, result) => {
        if (err) {
          return res.status(500).send('Problemas ao realizar a query.');
        }
        
        if (result.length === 0) {
          res.status(400).send('Não há dados suficientes para tirar conclusões.');
          return;
        }
        
        const infos = result.map(r => ({
            peso: r.num_peso,
            altura: r.num_altura,
            passeio: r.passeio,
            consulta: r.ultima_consulta,
            vacina: r.nm_vacina,
            dataAplicacaoVacina: r.dt_aplicacao_vacina,
            vermifugado: r.nm_vermifugo,
            dataAplicacaoVerificador: r.dt_aplicacao_vermifugo,
            ultimaConsultaFeita: r.ultima_consulta_feita,
            nomeAnimal: r.nm_animal
          })
        );

        return res.status(200).json(infos)
      });
      
    } catch (error) {
      return res.status(500).json(error)
    }
};

const Passeio = async (req, res) => {

  const idPet = req.params.id;

  let sql = `
    UPDATE pet
      SET passeio = NOW()
    WHERE id_pet = ?
  `

  db.query(sql, [idPet], async (err, result) => {
    if (err) {
      return res.status(500).send({message: 'Erro no banco de dados'});
    }

    return res.status(200).json('Passeio registrado com sucesso!')
  })

};
  
  module.exports = {
    WellbeingAlgorithm,
    getInfosBem,
    Passeio
  };