import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import RegistrarUsuarioController from './controllers/RegistrarUsuarioController'
import RegistrarUsuario from './core/usuario/RegistrarUsuario'
import ColecaoUsuarioDB from './adapters/db/knex/ColecaoUsuarioDB'
import CriptoReal from './adapters/auth/BcryptAdapter'
import LoginUsuario from './core/usuario/LoginUsuario'
import LoginUsuarioController from './controllers/LoginUsuarioController'
import JwpAdapter from './adapters/auth/JwtAdapter'
import SalvarTransacao from './core/transacao/SalvarTransacao'
import SalvarTransacaoController from './controllers/SalvarTransacaoController'
import UsuarioMiddleware from './controllers/UsuarioMiddleware'

const app = express()
const porta = process.env.PORTA ?? 3001
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.listen(porta, () => {
    console.log(`🔥 Server is running on port ${porta}`);
    
})

 // ------------------------------------ Rotas abertas

 const provedorToken = new JwpAdapter(process.env.JWT_SECRET!)
const colecaoUsuario = new ColecaoUsuarioDB()
const provedorCripto = new CriptoReal()

const registrarUsuario = new RegistrarUsuario(colecaoUsuario, provedorCripto)
const loginUsuario = new LoginUsuario(colecaoUsuario, provedorCripto, provedorToken)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

 // ------------------------------------ Rotas autenticadas

    const usuarioMiddleware = UsuarioMiddleware(colecaoUsuario, provedorToken)

const salvarTransacao = new SalvarTransacao()
new SalvarTransacaoController(app, salvarTransacao, usuarioMiddleware)

