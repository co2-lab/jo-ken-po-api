import { desafioRepository } from '../repositories/desafioRepository'

export class GetAllCategoryService {
  async execute() {
    const repo = desafioRepository
    const desafios = await repo.find()
    return desafios
  }
}
