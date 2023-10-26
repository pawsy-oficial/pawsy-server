const db = require("../db")

const postCommentsClinic = (req, res) => {
    const { idClinic, idTutor, scoreEvaluation, textComment } = req.body

    const query = `INSERT INTO comentarios (id_tutor, id_clinica, vl_avaliacao, ds_comentario, dt_comentario) VALUE (?,?,?,?,?);`

    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    db.query(query, [idClinic, idTutor, scoreEvaluation, textComment, date], (err, result) => {
        if (err) {
            res.status(500).json({ err })
        }

        res.status(200).json({ message: "comentário publicado" })
    })
}

const getCommentsClinic = (req, res) => {
    const idClinic = req.params.id

    const query = `
        SELECT cm.ds_comentario AS comment, cm.dt_comentario AS publishedAt, tt.nm_tutor AS nameTutor, tt.url_imagem AS imageTutor FROM comentarios cm
            INNER JOIN tutor tt ON tt.id_tutor = cm.id_tutor
            WHERE id_clinica = ?;
    `

    let data
    db.query(query, [idClinic], (err, result) => {
        if (err) {
            res.status(500).json({ err })
        }
        data = result
        db.query(`SELECT AVG(vl_avaliacao) AS average FROM comentarios WHERE id_clinica = ?`, [idClinic], (err, results)=>{
            if (err) {
                res.status(500).json({ err })
            }
            const average = results[0]
            res.status(200).json({ comments: data, average})
        })
    })
}

module.exports = {
    postCommentsClinic,
    getCommentsClinic
}