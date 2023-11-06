const db = require('../../../db');
const util = require('util');

const CreateSchedule = async (req, res) => {
    const { 
        "idClinic": idClinica,
        "open-date": dtOpen, 
        "close-date": dtClose, 
        "agenda-name": nm_agenda,
        restriction: dt_restricao,
        Available: disponibilidades,
        observation: observacao 
    } = req.body;

    try {
        db.query = util.promisify(db.query);

        if (!idClinica || !dtOpen || !dtClose || !nm_agenda || !disponibilidades || disponibilidades.length === 0) {
            return res.status(400).json({ message: "Campos obrigatórios não preenchidos ou pelo menos um médico deve ser cadastrado na agenda." });
        }

        const abertura = new Date(dtOpen);
        const fechamento = new Date(dtClose);
        if (abertura >= fechamento) {
            return res.status(400).json({ message: "Data de fechamento deve ser posterior à data de abertura." });
        }

        if (Array.isArray(dt_restricao)) {
            for (const restricao of dt_restricao) {
                const dataRestricao = new Date(restricao.data);
                if (dataRestricao <= abertura || dataRestricao >= fechamento) {
                    return res.status(400).json({ message: "Data de restrição fora do período da agenda." });
                }
            }
        }

        let sql = "INSERT INTO agenda (id_clinica, dt_abertura, dt_fechamento, observacoes, nm_agenda) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [idClinica, dtOpen, dtClose, observacao, nm_agenda], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: 'Erro ao inserir na tabela agenda.' });
            }

            sql = "SELECT id_agenda FROM agenda WHERE id_clinica = ? ORDER BY id_agenda DESC LIMIT 1";
            db.query(sql, [idClinica], async (err, agendaResult) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ success: false, message: 'Erro ao consultar o banco de dados.' });
                }

                const idAgenda = agendaResult[0].id_agenda;
                console.log(idAgenda);

                const existingMedicos = new Set();

                for (const disponibilidade of disponibilidades) {
                    const { medicoId, specialty: especialidade, hr_open_medic, hr_close_medic, interval: intervalo, week: dias_disponiveis } = disponibilidade;
                    console.log(disponibilidade);

                    if (existingMedicos.has(medicoId)) {
                        return res.status(400).json({ message: "Médico já cadastrado na agenda." });
                    }
                    existingMedicos.add(medicoId);

                    const queryAsync = (sql, params) => {
                        return new Promise((resolve, reject) => {
                            db.query(sql, params, (err, result) => {
                                if (err) reject(err);
                                else resolve(result);
                            });
                        });
                    }

                    sql = "INSERT INTO disponibilidade (id_medico, id_agenda, hr_entrada, hr_saida, tp_consulta, tm_intervalo) VALUES (?, ?, ?, ?, ?, ?)";
                    const disponibilidadeResult = await queryAsync(sql, [medicoId, idAgenda, hr_open_medic, hr_close_medic, especialidade, intervalo]);

                    for (const nomeDia of dias_disponiveis) {
                        const results = await db.query("SELECT id_dia FROM dia_semana WHERE nm_dia = ?", [nomeDia]);
                        if (results && results[0] && results[0].id_dia) {
                            const idDia = results[0].id_dia;
                            await db.query("INSERT INTO dias_disponiveis (id_disponibilidade, id_dia_semana) VALUES (?, ?)", [disponibilidadeResult.insertId, idDia]);
                        } else {
                            return res.status(400).json({ message: `Dia desconhecido: ${nomeDia}` });
                        }
                    }
                }

                res.status(200).json({ success: true, message: "Agenda criada com sucesso!", idAgenda: idAgenda });
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao criar a agenda.", error: error.message });
    }
};

module.exports = { 
    CreateSchedule
};
