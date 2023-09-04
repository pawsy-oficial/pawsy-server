const yup = require("yup")

const linkSchema = yup.object({
    body: yup.object({
        firstName: yup.string().required("Campo obrigatório").min(2, "O nome deve ter mais de 2 caracteres"),
        lastName: yup.string().required("Campo obrigatório").min(2, "O sobrenome deve ter mais de 2 caracteres"),
        email: yup.string().required("Campo obrigatório").email("Digite um endereço de e-mail válido"),
        cpf: yup.string().required("Campo obrigatório").length(14, "O CPF deve ter 11 dígitos").test("cpf-valido", "CPF inválido", (cpf) => handleValidationCPF(cpf)),
        cell: yup.string().required("Campo obrigatório").matches(/^\(\d{2}\)\s\d{9}$/, "Número de celular inválido. Use o formato (99) 999999999"),
        birthDate: yup.date().typeError('Deve ser uma data').required("Campo obrigatório"),
        cep: yup.string().required("Campo obrigatório").length(9, "CEP deve possuir 8 dígitos"),
        city: yup.string().required("Campo obrigatório"),
        street: yup.string().required("Campo obrigatório"),
        numberHome: yup.number().typeError('Deve ser um número').positive("Deve ser um número positivo").integer("Deve ser um número inteiro").required("Campo obrigatório"),
        complement: yup.string(),
        neighborhood: yup.string().required("Campo obrigatório"),
        password: yup.string().required(),
    })
});

function handleValidationCPF(cpf) {
    const format = cpf.replace(/[^\d]+/g,'');
    let firstDigit = format[9];
    let secondDigit = format[10];

    if (format == "00000000000" || 
        format == "11111111111" || 
        format == "22222222222" || 
        format == "33333333333" || 
        format == "44444444444" || 
        format == "55555555555" || 
        format == "66666666666" || 
        format == "77777777777" || 
        format == "88888888888" || 
        format == "99999999999")
        return false;

    const firstDigitCalculate = calculateDigits(format, 10, 8);

    const secondDigitCalculate = calculateDigits(format, 11, 9);

    return (firstDigit == firstDigitCalculate) && (secondDigit == secondDigitCalculate)
}

function calculateDigits(digits, count, repeat) {
    let countMultiple = count;
    let sumDigits = 0;

    for (let i = 0; i <= repeat; i++) {
        const calc = parseInt(digits[i]) * countMultiple;
        sumDigits += calc;
        countMultiple--;
    }

    let resultDigit = sumDigits % 11;

    if (resultDigit == 0 || resultDigit == 1) {
        return 0;
    } else {
        return 11 - resultDigit;
    }
}


module.exports = linkSchema