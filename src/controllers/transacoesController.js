const banco = require('../database/bancodedados')
const { buscarConta, atualizarBancoDeDados } = require("../utils/utils")

const { format } = require('date-fns')

const depositar = async (req, res) => {
    const { numero_conta, valor } = req.body

    const conta = buscarConta(numero_conta)
    conta.saldo += valor

    const deposito = {
        data: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
        numero_conta,
        valor
    }

    banco.depositos.push(deposito)

    const registrarDeposito = await atualizarBancoDeDados(banco)

    if (!registrarDeposito) {
        return res.status(400).json({"mensagem": "Erro ao atualizar saldo e registrar deposito no banco de dados."})        
    }

    res.status(204).json({})
}

const sacar = async (req, res) => {
    const { numero_conta, valor } = req.body

    const conta = buscarConta(numero_conta)
    conta.saldo -= valor

    const saque = {
        data: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
        numero_conta,
        valor
    }

    banco.saques.push(saque)

    const registrarSaque = await atualizarBancoDeDados(banco)

    if (!registrarSaque) {
        return res.status(400).json({"mensagem": "Erro ao atualizar saldo e registrar saque no banco de dados."})        
    }

    res.status(204).json({})
}

const transferir = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body

    const contaOrigem = buscarConta(numero_conta_origem)
    const contaDestino = buscarConta(numero_conta_destino)

    contaOrigem.saldo -= valor
    contaDestino.saldo += valor

    const transferencia = {
        data: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    banco.transferencias.push(transferencia)

    const registrarTransferencia = await atualizarBancoDeDados(banco)

    if (!registrarTransferencia) {
        return res.status(400).json({"mensagem": "Erro ao atualizar saldo e registrar transferencia no banco de dados."})        
    }

    res.status(204).json({})
}

module.exports = {
    depositar,
    sacar,
    transferir
}