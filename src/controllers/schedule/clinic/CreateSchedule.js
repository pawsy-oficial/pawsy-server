const db = require('../../../db');

const CreateSchedule = async (req, res) => {
    const { 
      idClinica, 
      nm_agenda, 
      dtOpen, 
      dtClose, 
      dt_restricao, 
      id_vet, 
      hr_disponivel, 
      intervalo, 
      tipo_consulta, 
      dias_disponiveis, 
      observacao 
    } = req.body;
    
    if (!idClinica || !nm_agenda || !dtOpen || !dtClose) {
        return res.status(400).json({ error: "Dados de entrada inválidos." });
    }

    try {
      await db.beginTransaction();

      const agendaResult = await db.query(
        "INSERT INTO agenda (id_clinica, dt_abertura, dt_fechamento, observacoes, nm_agenda) VALUES (?, ?, ?, ?, ?)", 
        [idClinica, dtOpen, dtClose, observacao, nm_agenda]
      );
      console.log("agendaResult", agendaResult);
        
        const idAgenda = agendaResult.insertId;
        
        if (Array.isArray(dt_restricao)) {
          for (const restricao of dt_restricao) {
              await db.query(
                "INSERT INTO restricao (dt_restricao, id_agenda) VALUES (?, ?)", 
                [restricao, idAgenda]
              );
          }
        }

        if (Array.isArray(id_vet)) {
          for (const vet of id_vet) {
            const horario = hr_disponivel[vet];
            const tipo = tipo_consulta[vet];
            const intv = intervalo[vet];
            
            if (horario && tipo && intv) {
                const [disponibilidadeResult] = await db.query(
                  "INSERT INTO disponibilidade (id_medico, id_agenda, hr_entrada, hr_saida, tp_consulta, tm_intervalo) VALUES (?, ?, ?, ?, ?, ?)",
                  [vet, idAgenda, horario.entrada, horario.saida, tipo, intv]
                );
                console.log("disponibilidadeResult", disponibilidadeResult);
                const diasSelecionados = dias_disponiveis[vet];

                for (const nomeDia of diasSelecionados) {
                    const [diaRows] = await db.query(
                      "SELECT id_dia FROM dia_semana WHERE nm_dia = ?", 
                      [nomeDia]
                    );
                    console.log("diaRows", diaRows);
                    if (diaRows.length) {
                        const idDia = diaRows[0].id_dia;
                        await db.query(
                          "INSERT INTO dias_disponiveis (id_disponibilidade, id_dia_semana) VALUES (?, ?)", 
                          [disponibilidadeResult.insertId, idDia]
                        );
                    } else {
                        throw new Error(`Dia desconhecido: ${nomeDia}`);
                    }
                }
            } else {
                throw new Error(`Dados incompletos para o médico ${vet}`);
            }
          }
        }
        
        await db.commit();
        res.status(200).json({ success: true, message: "Agenda criada com sucesso!", idAgenda: idAgenda });
    } catch (error) {
        await db.rollback();
        res.status(500).json({ success: false, message: "Erro ao criar a agenda.", error: error.message });
    }
};

module.exports = { 
  CreateSchedule
};