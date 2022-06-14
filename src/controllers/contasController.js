const banco = require('../database/bancodedados')
const { buscarConta, atualizarBancoDeDados } = require('../utils/utils')

const { v4: uuidv4 } = require('uuid')

const listarContas = (req, res) => {
    const { senha_banco } = req.query

    if (!senha_banco) {
        return res.status(400).json({"mensagem": "A senha do banco não foi informada!"})
    }

    if (senha_banco !== banco.banco.senha){
        return res.status(401).json({"mensagem": "A senha do banco informada é inválida!"})
    }

    res.status(200).json(banco.contas)
}

const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const conta = {
        numero: uuidv4(),
        saldo: 0,
        usuario: { 
            nome, cpf, data_nascimento, telefone, email, senha 
        }
    }

    banco.contas.push(conta)

    const inserir = await atualizarBancoDeDados(banco)

    if (!inserir) {
        return res.status(400).json({"mensagem": "Erro ao inserir no banco de dados."})        
    } 

    res.status(204).send()
}

const atualizarConta = async (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const conta = buscarConta(numeroConta)

    conta.usuario = {
        nome, cpf, data_nascimento, telefone, email, senha
    }

    const atualizar = await atualizarBancoDeDados(banco)

    if (!atualizar) {
        return res.status(400).json({"mensagem": "Erro ao atualizar usuário no banco de dados."})        
    }

    res.status(204).json()
}

const excluirConta = async (req, res) => {
    const { numeroConta } = req.params

    const conta = buscarConta(numeroConta)

    if (conta.saldo > 0) {
        return res.status(400).json({"mensagem": "A conta só pode ser removida se o saldo for zero!"})
    }

    banco.contas = banco.contas.filter(conta => conta.numero !== numeroConta)

    const excluir = await atualizarBancoDeDados(banco)

    if (!excluir) {
        return res.status(400).json({"mensagem": "Erro ao excluir usuário no banco de dados."})        
    }
    
    res.status(204).json({})
}

const exibirSaldo = (req, res) => {
    const { numero_conta } = req.query

    const conta = buscarConta(numero_conta)

    res.status(200).json({ "saldo": conta.saldo })
}

const exibirExtrato = (req, res) => {
    const { numero_conta } = req.query

    const transferenciasEnviadas = banco.transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta)
    const transferenciasRecebidas = banco.transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta)
    const depositos = banco.depositos.filter(deposito => deposito.numero_conta === numero_conta)
    const saques = banco.saques.filter(saque => saque.numero_conta === numero_conta)

    res.status(200).json({depositos, saques, transferenciasEnviadas, transferenciasRecebidas})
}

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    excluirConta,
    exibirSaldo,
    exibirExtrato
}