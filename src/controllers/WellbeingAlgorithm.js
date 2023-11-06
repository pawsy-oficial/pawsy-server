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

module.exports = {
  WellbeingAlgorithm
};