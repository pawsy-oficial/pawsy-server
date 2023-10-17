const yup = require("yup")

const schemaVermifuge = yup.object({
    body: yup.object({
        nameVermifuge: yup.string().required("Campo obrigatório 1")
    })
})

module.exports = schemaVermifuge