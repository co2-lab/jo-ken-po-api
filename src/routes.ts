import { Router } from 'express'
import { UsuarioController } from './controllers/UsuarioController'
import { DesafioController } from './controllers/DesafioController'

const routes = Router()

routes.post('/usuario', new UsuarioController().create)
routes.post('/desafio', new DesafioController().create)
routes.post('/desafio/1', new DesafioController().create1)

export default routes
