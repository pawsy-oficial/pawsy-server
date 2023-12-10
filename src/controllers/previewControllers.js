const db = require('../db');

const ClinicPreview = async (req, res) => {
	const { id, all = false } = req.query;

	const query = `
		SELECT 
			cli.id_clinica AS storedIdClinica,
			cli.nm_clinica AS storedNameClinica,
			cli.url_imagem AS storedImg,
			cli.ds_sobre as storedDescriptionClinica,
			cli.email_clinica as storedEmailClinica,
			cli.tl_clinica as storedTellClinica,
			cli.status_loja as status_loja,
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
		if (err) {
			console.log(err);
			res.status(500).send('Erro ao consultar o banco de dados.');
			return;
		}

		if (result.length === 0) {
			res.status(401).send('Não foi possível encontrar os dados.');
			return;
		}
		const storedId = result[0].storedIdClinica;
		const storedNomeClinica = result[0].storedNameClinica;
		const storedUrlImg = result[0].storedImg;
		const storedCEP = result[0].CEP;
		const storedRua = result[0].Rua;
		const storedNumero = result[0].Numero;
		const storedComplemento = result[0].Complemento;
		const storedBairro = result[0].Bairro;
		const storedCidade = result[0].Cidade;
		const storedEstado = result[0].Estado;
		const storedStatusClinic = result[0].status_loja;

		var status

		if (storedStatusClinic === 0){
			status = 'Fechado'
		} else {
			status = 'Aberto'
		}

		const endereco = `${storedRua}, ${storedNumero} - ${storedBairro}, ${storedCidade} - ${storedEstado}, ${storedCEP}, ${storedComplemento}`;

		if (all) {
			res.status(200).json({result})
		}
		else {
			res.status(200).json({
				'Id': storedId,
				'Nome': storedNomeClinica,
				'Imagem': storedUrlImg,
				'Endereco': endereco,
				'Status': status
			})
		}
	});
}

module.exports = {
	ClinicPreview
}