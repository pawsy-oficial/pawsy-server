const yup = require("yup")

const schemaPet = yup.object({
    body: yup.object({
        name: yup.string().required("Campo obrigatório 1").min(2, "O nome deve ter no mínimo 2 caracteres"),
        typeKind: yup.string().oneOf(["1", "2"], "valor invalido").required("Qual a espécie do seu pet?"),
        gender: yup.string().oneOf(["1", "2"], "valor invalido").required("Campo obrigatório"),
        date: yup.date().typeError("Deve ser uma data").required("Campo obrigatório 2"),
        description: yup.string().max(250, "Limite atingido (250)"),
        coat: yup.string().oneOf(["1","2","3"]).required("Campo obrigatório 3"),
        urlProfile: yup.string().required("url obrigatório").test("valido", "caminho invalido", value => validarUrl(value)),
        race: yup.string().required("Campo obrigatório 4"),
        id_tutor: yup.number().required("campo obrigatório 5")
    })
})

function validarUrl(caminho){
    if(!caminho.includes("_pawsy_")){
        return false
    }

    return true
}

module.exports = schemaPet