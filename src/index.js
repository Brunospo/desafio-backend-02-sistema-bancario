const express = require('express')
const contasRouter = require('./routers/contasRouter')
const transacoesRouter = require('./routers/transacoesRouter')

const app = express()

app.use(express.json())
app.use('/contas', contasRouter)
app.use('/transacoes', transacoesRouter)

app.listen(3000, () => console.log('Servidor rodando...'))