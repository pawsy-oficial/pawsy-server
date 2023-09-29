const db = require('../db');

const ClinicPreview = async (req, res) => {
 const { id } = req.body;

 const query = `
  SELECT 
      cli.id_clinica AS ID,
      cli.nm_clinica AS Nome,
      cli.url_imagem AS Imagem,
      e.cd_cep AS CEP,
      e.nm_rua AS Rua,
      e.num_residencia AS Numero,
      e.complemento AS Complemento,
      e.latitude AS Latitude,
      e.longitude AS Longitude,
      b.nm_bairro AS Bairro,
      c.nm_cidade AS Cidade,
      u.nm_estado AS Estado
  FROM clinica cli 
    JOIN endereco e ON cli.id_endereco = e.id_endereco
    JOIN bairro b ON e.id_bairro = b.id_bairro
    JOIN cidade c ON b.id_cidade = c.id_cidade
    JOIN uf u ON c.id_uf = u.id_uf
  WHERE cli.id_clinica = ?;
 `
  db.query(query, [id], async (err, result) => {
    if (err){
      console.log(err);
      res.status(500).send('Erro ao consultar o banco de dados.');
      return;
    }

    if (result.length === 0) {
      res.status(401).send('Não foi possível encontrar os dados.');
      return;
    }
    const storedId = result[0].ID;
    const storedNomeClinica = result[0].Nome;
    const storedUrlImg = result[0].Imagem;
    const storedCEP = result[0].CEP;
    const storedRua = result[0].Rua;
    const storedNumero = result[0].Numero;
    const storedComplemento = result[0].Complemento;
    const storedBairro = result[0].Bairro;
    const storedCidade = result[0].Cidade;
    const storedEstado = result[0].Estado;

    const endereco = `${storedRua}, ${storedNumero} - ${storedBairro}, ${storedCidade} - ${storedEstado}, ${storedCEP}, ${storedComplemento}`;

    return res.json({
      'Id': storedId,
      'Nome': storedNomeClinica,
      'Imagem': storedUrlImg,
      'Endereço': endereco
    })
  });
}

  module.exports = {
  ClinicPreview
}