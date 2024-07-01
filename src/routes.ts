import { Router } from 'express'
import { UsuarioController } from './controllers/UsuarioController'
import { DesafioController } from './controllers/DesafioController'
import express, { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')
const routes = Router()
const desafioController = new DesafioController()
const usuarioController = new UsuarioController()

routes.post('/usuario', new UsuarioController().create)
routes.post('/usuario/autenticar', new UsuarioController().autenticar)
routes.post('/desafio', new DesafioController().create)
routes.post('/aceitarDesafio', new DesafioController().aceitarDesafio)
routes.get('/buscarDesafios', new DesafioController().buscarDesafios)
routes.get('/usuarioComMaisApostas', (req, res) =>
  desafioController.usuarioComMaisApostas(req, res),
)
routes.get('/maioresApostas', (req, res) =>
  desafioController.maioresApostas(req, res),
)
routes.get('/maioresGanhadores', (req, res) =>
  desafioController.maioresGanhadores(req, res),
)
routes.get('/apostas/:userId', (req, res) =>
  desafioController.consultarApostasPorUsuario(req, res),
)
routes.post('/usuarios', (req, res) => usuarioController.create(req, res))

function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(404).json({ msg: 'Acesso negado' })
  }
  try {
    const secret = process.env.secret
    jwt.verify(token, secret)
    next()
  } catch {
    return res.status(404).json({ msg: 'Token Invalido' })
  }
}
export default routes
