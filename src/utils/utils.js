const banco = require('../database/bancodedados')

const path = require('path')
const fs = require('fs/promises')

const databasePath = path.join('src', 'database', 'bancodedados.js')

const existeNumeroDeConta = (numConta) => {
    return banco.contas.some(conta => conta.numero === numConta)
}

const buscarConta = (numConta) => {
    return banco.contas.find(conta => conta.numero === numConta)
}

const senhaCorreta = (numConta, senha) => {
    const conta = buscarConta(numConta)

    return conta.usuario.senha === senha
}

const haSaldo = (numConta, valor) => {
    const conta = buscarConta(numConta)

    return conta.saldo >= valor
}

const atualizarBancoDeDados = async (obj) => {
    const bancoString = JSON.stringify(obj)

    try {
        await fs.writeFile(databasePath, 'module.exports = ')
        await fs.appendFile(databasePath, bancoString)
        
        return true

    } catch (error) {

        return false
    }
}

module.exports = {
    existeNumeroDeConta,
    buscarConta,
    atualizarBancoDeDados,
    senhaCorreta,
    haSaldo
}