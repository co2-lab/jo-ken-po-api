import { Usuario } from '../entities/Usuario'
import { AppDataSource } from '../data-source'

export const usuarioRepository = AppDataSource.getRepository(Usuario)
