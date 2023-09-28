const db = require("../db")

const tutorCoordinates = (req, res)=>{
    const { idTutor } = req.query

    if(!idTutor){
        res.json({erro : "falta de parametros"})
    }

    const queryCoordinate = `
        select en.latitude, en.longitude from tutor tt
	        inner join endereco en ON tt.id_endereco = en.id_endereco
            where id_tutor = ?;
    `

    db.query(queryCoordinate, [ idTutor ] ,(err, result)=>{
        if(err){
            res.json({ message: err })
        }

        res.json(result)
    })
}

const ClinicCoordinates = (req, res) => {
    
    const query = `
    SELECT c.id_clinica, e.latitude, e.longitude
        FROM clinica c
    JOIN endereco e ON c.id_endereco = e.id_endereco; 
    `

    db.query(query, async (err, result) =>{
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao consultar o banco de dados.');
            return;
        }
        
        if (result.length === 0) {
            res.status(400).send('Erro: clínicas não encontradas.');
            return;
        }

        const formattedResult = result.map(item => ({
            "Id Clinica": item.id_clinica,
            "longitude": item.longitude,
            "latitude": item.latitude
        }));

        return res.json(formattedResult);
    })
}


module.exports = {
    tutorCoordinates,
    ClinicCoordinates
}