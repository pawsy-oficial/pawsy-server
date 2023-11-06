const db = require('../../../db');

const ListClinicPreview = async (req, res) => {
  const query = `
    SELECT 
      cli.id_clinica AS ID,
      cli.nm_clinica AS Nome,
      cli.url_imagem AS Imagem,
      e.cd_cep AS CEP,
      e.nm_rua AS Rua,
      e.num_residencia AS Numero,
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
  `;

  db.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao consultar o banco de dados.');
      return;
    }

    if (result.length === 0) {
      res.status(401).send('Não foi possível encontrar os dados.');
      return;
    }

    const clinics = result.map((clinic) => {
      const storedId = clinic.ID;
      const storedNomeClinica = clinic.Nome;
      const storedUrlImg = clinic.Imagem;
      const storedCEP = clinic.CEP;
      const storedRua = clinic.Rua;
      const storedNumero = clinic.Numero;
      const storedBairro = clinic.Bairro;
      const storedCidade = clinic.Cidade;
      const storedEstado = clinic.Estado;

      const endereco = `${storedRua}, ${storedNumero} - ${storedBairro}, ${storedCidade} - ${storedEstado}, ${storedCEP}`;

      return {
        'Id': storedId,
        'Nome': storedNomeClinica,
        'Imagem': storedUrlImg,
        'Endereco': endereco,
      };
    });

    return res.json(clinics);
  });
};

module.exports = {
  ListClinicPreview
};
