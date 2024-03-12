import { GetAllCategoryController } from './controllers/GetAllCategoryController'
import { CreateCategoryController } from './controllers/CreateCategoryController'
import { Router } from 'express'
import { UsuarioController } from './controllers/UsuarioController'
import { DesafioController } from './controllers/DesafioController'

const routes = Router()

routes.post('/usuario', new UsuarioController().create)
routes.post('/desafio', new DesafioController().create)
routes.post('/aceitarDesafio', new DesafioController().aceitarDesafio)
routes.get('/listarDesafios', new DesafioController().listarDesafios)
routes.post('/categories', new CreateCategoryController().handle)
routes.get('/categories', new GetAllCategoryController().handle)

export default routes
