import { Category } from '../entities/Category'
import { categoriaRepository } from '../repositories/categoriaRepository'

type CategoryRequest = {
  name: string
  description: string
}

export class CreateCategoryService {
  async execute({ name, description }: CategoryRequest): Promise<Category | Error> {
    const repo = categoriaRepository

    const category = repo.create({
      name,
      description,
    })

    await repo.save(category)

    return category
  }
}
