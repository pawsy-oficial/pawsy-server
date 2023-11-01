const db = require('../../../db');
const util = require('util');
db.query = util.promisify(db.query);

function timeToJsDate(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
} //converte o datetime do sql

const GenerateAvailableConsultations = async (req, res) => {
    const { idAgenda } = req.body;

    try {
        
        let statusAgenda = "SELECT status FROM agenda WHERE id_agenda = ?";
        let situationStatus = await db.query(statusAgenda, [idAgenda]);

        if (situationStatus[0].status == true || situationStatus[0].status == 1){
            return res.status(400).send('Agenda já foi ativada.');
        }         

        let sql = "SELECT * FROM agenda WHERE id_agenda = ?";
        let agenda = await db.query(sql, [idAgenda]);

        if (!agenda[0]) {
            return res.status(404).send('Agenda não encontrada.');
        }

        sql = "SELECT dt_restricao FROM restricao WHERE id_agenda = ?";
        let restricoes = await db.query(sql, [idAgenda]);
        let datasRestricao = restricoes.map(r => r.dt_restricao);

        sql = "SELECT * FROM disponibilidade WHERE id_agenda = ?";
        let disponibilidades = await db.query(sql, [idAgenda]);

        for (let disponibilidade of disponibilidades) {
            sql = "SELECT nm_dia FROM dias_disponiveis JOIN dia_semana ON dias_disponiveis.id_dia_semana = dia_semana.id_dia WHERE id_disponibilidade = ?";
            let diasDisponiveis = await db.query(sql, [disponibilidade.id_disponibilidade]);
            let diasTrabalho = diasDisponiveis.map(d => d.nm_dia);

            for (let dt = new Date(agenda[0].dt_abertura); dt <= new Date(agenda[0].dt_fechamento); dt.setDate(dt.getDate() + 1)) {
                const weekdayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
                let nomeDia = weekdayNames[dt.getDay()];

                if (diasTrabalho.includes(nomeDia) && !datasRestricao.includes(dt.toISOString().split('T')[0])) {
                    let hr = timeToJsDate(disponibilidade.hr_entrada);
                    const hrEnd = timeToJsDate(disponibilidade.hr_saida);
                    
                    while (hr < hrEnd) {
                        sql = "INSERT INTO consulta_disponivel (dt_consulta, hr_consulta, id_medico, id_agenda) VALUES (?, ?, ?, ?)";
                        await db.query(sql, [dt, `${hr.getHours()}:${hr.getMinutes()}:00`, disponibilidade.id_medico, idAgenda]);
                        hr.setMinutes(hr.getMinutes() + disponibilidade.tm_intervalo);
                    }
                }
            }
        }

        statusSql = "UPDATE agenda SET status = true WHERE id_agenda = ?";
        await db.query(statusSql, [idAgenda]);

        res.status(200).send('Consultas disponíveis geradas com sucesso.');

    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao gerar consultas disponíveis.", error: error.message });
    }
};

module.exports = { 
    GenerateAvailableConsultations
};
