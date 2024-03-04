// usuarioRepository.ts
import { getRepository } from 'typeorm'
import { Usuario } from '../entities/Usuario'

export const usuarioRepository = AppDataSource.getRepository(Usuario)

export const usuarioRepository = {
  async findOne(id: number) {
    const repository = getRepository(Usuario)
    return await repository.findOne(id)
  },
}
