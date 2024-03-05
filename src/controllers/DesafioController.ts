import { Request, Response } from 'express'
import { desafioRepository } from '../repositories/desafioRepository'
import { usuarioRepository } from '../repositories/usuarioRepository'
import { Desafio } from '../entities/Desafio'

export class DesafioController {
  async create(req: Request, res: Response) {
    const { id } = req.body
    console.log(id)
    try {
      const newUsuario = await findUsuario(id)
      console.log(newUsuario)
      let desafio = new Desafio()
      if (newUsuario != null) {
        desafio.usuarioCriador = newUsuario
        desafio = await desafioRepository.save(desafio)
        return res.status(201).json({ message: 'Desafio Criado' })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async create1(req: Request, res: Response) {
    const { id } = req.body
    console.log(id)
    try {
      const newUsuario = await findUsuario(id)
      console.log(newUsuario)
      let desafio = new Desafio()
      if (newUsuario != null) {
        desafio.usuarioAceitou = newUsuario
        desafio = await desafioRepository.save(desafio)
        return res.status(201).json({ message: 'Desafio Aceito' })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

async function findUsuario(id: number) {
  try {
    return await usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.id = :id', { id })
      .getOne()
  } catch (error) {
    console.error('Erro ao Informar  usuário:', error)
  }
}
