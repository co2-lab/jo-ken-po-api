import { AppDataSource } from '../data-source'
import { Desafio } from '../entities/Desafio'

export const desafioRepository = AppDataSource.getRepository(Desafio)
