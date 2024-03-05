import { Router } from 'express'
import { UsuarioController } from './controllers/UsuarioController'
import { DesafioController } from './controllers/DesafioController'

const routes = Router()

routes.post('/usuario', new UsuarioController().create)
routes.post('/desafio', new DesafioController().create)
routes.post('/aceitarDesafio', new DesafioController().aceitarDesafio)
routes.get('/listarDesafios', new DesafioController().listarDesafios)

export default routes
