const { existeNumeroDeConta, senhaCorreta, haSaldo } = require('../utils/utils')

const validarBodyDeposito = (req, res, next) => {
    const { numero_conta, valor } = req.body

    if (!numero_conta) {
        return res.status(400).json({"mensagem": "O número da conta é obrigatório!"})
    }

    if (valor === undefined) {
        return res.status(400).json({"mensagem": "O valor do deposito é obrigatório!"})
    }

    if (!existeNumeroDeConta(numero_conta)) {
        return res.status(404).json({"mensagem": "Conta bancária não encontada!"})
    }

    if (Number(valor) <= 0) {
        return res.status(400).json({"mensagem": "Não é permitido depósitos com valores negativos ou zerados."})
    }

    next()
}

const validarBodySaque = (req, res, next) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta) {
        return res.status(400).json({"mensagem": "O número da conta é obrigatório!"})
    }

    if (valor === undefined) {
        return res.status(400).json({"mensagem": "O valor do saque é obrigatório!"})
    }

    if (!senha) {
        return res.status(400).json({"mensagem": "A senha é obrigatória!"})
    }

    if (!existeNumeroDeConta(numero_conta)) {
        return res.status(404).json({"mensagem": "Conta bancária não encontada!"})
    }

    if (!senhaCorreta(numero_conta, senha)) {
        return res.status(403).json({"mensagem":"A senha não é válida para a conta informada."})
    }

    if (valor <= 0) {
        return res.status(400).json({"mensagem":"O valor de saque não pode ser menor ou igual a zero!"})
    }

    if (!haSaldo(numero_conta, valor)) {
        return res.status(400).json({"mensagem":"Não há saldo disponível para saque."})
    }

    next()
}

const validarBodyTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_origem) {
        return res.status(400).json({"mensagem": "O número da conta de origem é obrigatório!"})
    }

    if (!numero_conta_destino) {
        return res.status(400).json({"mensagem": "O número da conta de destino é obrigatório!"})
    }

    if (valor === undefined) {
        return res.status(400).json({"mensagem": "O valor da transferencia é obrigatório!"})
    }

    if (!senha) {
        return res.status(400).json({"mensagem": "A senha é obrigatória!"})
    }

    if (!existeNumeroDeConta(numero_conta_origem)) {
        return res.status(404).json({"mensagem": "Conta bancária de origem não encontada!"})
    }

    if (!existeNumeroDeConta(numero_conta_destino)) {
        return res.status(404).json({"mensagem": "Conta bancária de destino não encontada!"})
    }

    if (numero_conta_destino === numero_conta_origem) {
        return res.status(400).json({"mensagem": "Os números das contas de destino e origem são iguais!"})
    }

    if (!senhaCorreta(numero_conta_origem, senha)) {
        return res.status(403).json({"mensagem":"A senha não é válida para a conta de origem informada."})
    }

    if (valor <= 0) {
        return res.status(400).json({"mensagem":"O valor da transferencia não pode ser menor ou igual a zero!"})
    }

    if (!haSaldo(numero_conta_origem, valor)) {
        return res.status(400).json({"mensagem":"Não há saldo disponível para transferencia."})
    }

    next()
}

module.exports = {
    validarBodyDeposito,
    validarBodySaque,
    validarBodyTransferencia
}