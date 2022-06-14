const banco = require('../database/bancodedados')

const existeCpf = (cpf) => {
    return banco.contas.some(conta => conta.usuario.cpf === cpf)
}

const existeEmail = (email) => {
    return banco.contas.some(conta => conta.usuario.email === email)
}

module.exports = {
    existeCpf,
    existeEmail
}