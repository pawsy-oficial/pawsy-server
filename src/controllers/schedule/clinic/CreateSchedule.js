const db = require('../../../db');
const util = require('util');

const CreateSchedule = (req, res) => {
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

        let sql = "INSERT INTO agenda (id_clinica, dt_abertura, dt_fechamento, observacoes, nm_agenda) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [idClinica, dtOpen, dtClose, observacao, nm_agenda], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao inserir na tabela agenda.');
            }

            sql = "SELECT id_agenda FROM agenda WHERE id_clinica = ? ORDER BY id_agenda DESC LIMIT 1";
            db.query(sql, [idClinica], async (err, agendaResult) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao consultar o banco de dados.');
                }

                const idAgenda = agendaResult[0].id_agenda;
                console.log(idAgenda);

                if (Array.isArray(dt_restricao)) {
                    for (const restricao of dt_restricao) {
                        sql = "INSERT INTO restricao (dt_restricao, id_agenda) VALUES (?, ?)";
                        await db.query(sql, [restricao.data, idAgenda]);
                    }
                }

                if (Array.isArray(disponibilidades)) {
                    for (const disponibilidade of disponibilidades) {
                        const { medicoId, specialty: especialidade, hr_open_medic, hr_close_medic, interval: intervalo, week: dias_disponiveis } = disponibilidade;
                        console.log(disponibilidade);

                        const queryAsync = (sql, params) => {
                          return new Promise((resolve, reject) => {
                              db.query(sql, params, (err, result) => {
                                  if (err) reject(err);
                                  else resolve(result);
                              });
                          });
                      };
                      

                        sql = "INSERT INTO disponibilidade (id_medico, id_agenda, hr_entrada, hr_saida, tp_consulta, tm_intervalo) VALUES (?, ?, ?, ?, ?, ?)";
                        const disponibilidadeResult = await queryAsync(sql, [medicoId, idAgenda, hr_open_medic, hr_close_medic, especialidade, intervalo]);

                        for (const nomeDia of dias_disponiveis) {
                          const results = await db.query("SELECT id_dia FROM dia_semana WHERE nm_dia = ?", [nomeDia]);
                          if (results && results[0] && results[0].id_dia) {
                              const idDia = results[0].id_dia;
                              await db.query("INSERT INTO dias_disponiveis (id_disponibilidade, id_dia_semana) VALUES (?, ?)", [disponibilidadeResult.insertId, idDia]);
                          } else {
                              throw new Error(`Dia desconhecido: ${nomeDia}`);
                          }

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