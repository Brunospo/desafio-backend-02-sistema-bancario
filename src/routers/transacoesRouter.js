const { Router } = require('express')
const { depositar, sacar, transferir } = require('../controllers/transacoesController')
const { validarBodyDeposito, validarBodySaque, validarBodyTransferencia } = require('../middlewares/transacoesMiddleware')

const router = Router()

router.post('/depositar', validarBodyDeposito, depositar)
router.post('/sacar', validarBodySaque, sacar)
router.post('/transferir', validarBodyTransferencia, transferir)

module.exports = router