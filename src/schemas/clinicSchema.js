const yup = require("yup")


const schemaClinic = yup.object({
    body: yup.object({
        clinicName: yup.string().required("Campo obrigatório 1").min(2, "O nome deve ter mais de 2 caracteres"),
        email: yup.string().required("Campo obrigatório 2").email("Digite um endereço de e-mail válido"),
        cnpj: yup.string().required("Campo obrigatório 3").length(18, "O CNPJ deve ter 11 dígitos").test('valid-cnpj', 'CNPJ inválido', value => validarCNPJ(value)),
        cell: yup.string().required("Campo obrigatório 4").matches(/^\(\d{2}\)\s\d{9}$/, "Número de celular inválido. Use o formato (99) 999999999"),
        cep: yup.string().required("Campo obrigatório 5").length(9, "CEP deve possuir 8 dígitos"),
        city: yup.string().required("Campo obrigatório 6"),
        street: yup.string().required("Campo obrigatório 7"),
        numberHome: yup.number().typeError('Deve ser um número').positive("Deve ser um número positivo").integer("Deve ser um número inteiro").required("Campo obrigatório 8"),
        complement: yup.string(),
        neighborhood: yup.string().required("Campo obrigatório 9"),
        password: yup.string().required(),
        crmv: yup.string().length(6, "crmv possui 5 digitos e mais um .").required("Campo obrigatório 10")
    })
})


function validarCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

module.exports = schemaClinic