import { Router } from 'express'
import { UsuarioController } from './controllers/UsuarioController'
import { DesafioController } from './controllers/DesafioController'
import express, { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')
const routes = Router()

routes.post('/usuario', new UsuarioController().create)
routes.post('/usuario/autenticar', new UsuarioController().autenticar)
routes.post('/desafio', new DesafioController().create)
routes.post('/aceitarDesafio', new DesafioController().aceitarDesafio)
routes.get('/buscarDesafios', new DesafioController().buscarDesafios)

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
