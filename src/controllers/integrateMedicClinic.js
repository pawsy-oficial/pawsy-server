const db = require('../db');

const integrateMedicClinic = async (req, res) => {
    const { id, crmv, cd_clinica } = req.body;

    if (!id && !crmv) {
        return res.status(400).json({ error: "ID ou CRMV é necessário para a requisição." });
    }

    let medicId;

    if (id) {
        medicId = id;
        proceedWithIntegration(medicId);
    } else if (crmv) {
        const getIdQuery = `SELECT id_medico FROM medico WHERE cd_crmv = ?`;

        db.query(getIdQuery, [crmv], (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Erro ao obter ID do médico." });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: "Médico não encontrado." });
            }

            medicId = results[0].id_medico;
            proceedWithIntegration(medicId);
        });
    }

    function proceedWithIntegration(medicId) {
        const queryCheck = `
      SELECT * FROM trabalho 
      WHERE cd_medico = ? AND cd_clinica = ?
    `;

        db.query(queryCheck, [medicId, cd_clinica], (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Erro ao verificar a integração do médico." });
            }
            if (results.length > 0) {
                return res.status(401).json({ error: "Médico já integrado nesta clínica." });
            }

            const queryInsert = `
        INSERT INTO trabalho (cd_medico, cd_clinica, dt_inscricao)
        VALUES (?, ?, ?)
      `;
			console.log(medicId, cd_clinica);
            db.query(queryInsert, [medicId, cd_clinica, new Date()], (errorInsert) => {
                if (errorInsert) {
                    return res.status(500).json({ error: "Erro ao integrar médico à clínica." });
                }

                const queryMedicInfo = `SELECT * FROM medico WHERE id_medico = ?`;

                db.query(queryMedicInfo, [medicId], (errorInfo, medicInfo) => {
                    if (errorInfo) {
                        return res.status(500).json({ error: "Erro ao obter informações do médico." });
                    }

                    const medicData = medicInfo[0];
                    const medicName = medicData.nm_medico;
                    const medicCPF = medicData.cd_cpf;
                    const medicBirthdate = medicData.dt_nascimento;
                    const medicEmail = medicData.nm_email;
                    const medicCellphone = medicData.num_celular;
                    const medicSpecialtyId = medicData.id_especialidade;
                    const medicAddressId = medicData.id_endereco;
                    const medicCRMV = medicData.cd_crmv;
                    const medicImageURL = medicData.url_imagem;

                    return res.status(201).json({
                        message: "Médico integrado com sucesso!",
                        nome: medicName,
                        crmv: medicCRMV,
                        email: medicEmail,
                        especialidade: medicSpecialtyId,
                        imagem: medicImageURL
                    });
                });
            });
        });
    }
}

// const getAllMedicsClinic = (req, res) => {
// 	const id = req.params.idlinic

// 	const queryMedics = `
// 		SELECT md.nm_medico, md.url_imagem, md.id_medico FROM trabalho tb
// 		INNER JOIN medico md ON md.id_medico = tb.cd_medico
// 		where tb.cd_clinica = ?;
// 	`
// }

module.exports = {
    integrateMedicClinic
}