import { AppDataSource } from '../data-source'
import { Category } from '../entities/Category'

export const categoriaRepository = AppDataSource.getRepository(Category)
