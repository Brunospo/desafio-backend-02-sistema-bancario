const { existeCpf, existeEmail } = require('../utils/contasUtils')
const { existeNumeroDeConta, senhaCorreta } = require('../utils/utils')

const validarBody = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({"mensagem": "Todos os campos devem ser informados."})
    }

    if (existeCpf(cpf)) {
        return res.status(400).json({"mensagem": "Já existe uma conta com o cpf informado!"})
    }

    if (existeEmail(email)) {
        return res.status(400).json({"mensagem": "Já existe uma conta com o e-mail informado!"})
    }

    next()
}

const validarNumeroDaConta = (req, res, next) => {
    const { numeroConta } = req.params

    if (!existeNumeroDeConta(numeroConta)) {
        return res.status(404).json({"mensagem": "Conta bancária não encontada!"})
    }

    next()
}

const validarNumeroDaContaESenha = (req, res, next) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta) {
        return res.status(400).json({"mensagem": "O numero da conta não foi informado."})
    }

    if (!senha) {
        return res.status(400).json({"mensagem": "A senha da conta não foi informada."})
    }

    if (!existeNumeroDeConta(numero_conta)) {
        return res.status(404).json({"mensagem": "Conta bancária não encontada!"})
    }

    if (!senhaCorreta(numero_conta, senha)) {
        return res.status(403).json({"mensagem":"A senha não é válida para a conta informada."})
    }

    next()

}

module.exports = {
    validarBody,
    validarNumeroDaConta,
    validarNumeroDaContaESenha
}