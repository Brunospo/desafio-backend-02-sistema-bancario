const { Router } = require('express')
const { listarContas, criarConta, atualizarConta, excluirConta, exibirSaldo, exibirExtrato } = require('../controllers/contasController')
const { validarBody, validarNumeroDaConta, validarNumeroDaContaESenha } = require('../middlewares/contasMiddleware')

const router = Router()

router.get('/', listarContas)
router.post('/', validarBody ,criarConta)
router.put('/:numeroConta/usuario', validarNumeroDaConta , validarBody, atualizarConta)
router.delete('/:numeroConta', validarNumeroDaConta , excluirConta)

router.get('/saldo', validarNumeroDaContaESenha, exibirSaldo)
router.get('/extrato', validarNumeroDaContaESenha, exibirExtrato)

module.exports = router