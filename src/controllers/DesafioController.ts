import { Request, Response } from 'express'
import { desafioRepository } from '../repositories/desafioRepository'
import { usuarioRepository } from '../repositories/usuarioRepository'
import { Desafio } from '../entities/Desafio'

export class DesafioController {
  async listarDesafios() {
    const desafios = await findAll()
    return desafios
  }

  async create(req: Request, res: Response) {
    const { id, escolhaDoUsuarioCriador } = req.body
    console.log(id)
    try {
      const newUsuario = await findUsuario(id)
      console.log(newUsuario)
      let desafio = new Desafio()
      if (newUsuario != null) {
        desafio.usuarioCriador = newUsuario
        desafio.esolhaDoUsuarioCriador = escolhaDoUsuarioCriador
        desafio = await desafioRepository.save(desafio)
        return res.status(201).json({ message: 'Desafio Criado' })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async aceitarDesafio(req: Request, res: Response) {
    const { idAceitou, idDesafio, escolhaDoUsuarioAceitou } = req.body
    console.log(idAceitou)
    try {
      const newUsuario = await findUsuario(idAceitou)
      console.log(newUsuario)
      let desafio = await findDesafio(idDesafio)
      if (newUsuario != null && desafio != null) {
        desafio.usuarioAceitou = newUsuario
        desafio.escolhaDoUsuarioAceitou = escolhaDoUsuarioAceitou
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
      .createQueryBuilder('usuarios')
      .where('usuarios.id = :id', { id })
      .getOne()
  } catch (error) {
    console.error('Erro ao Informar  usuário:', error)
  }
}

async function findDesafio(id: number) {
  try {
    return await desafioRepository
      .createQueryBuilder('desafios')
      .where('desafios.id = :id', { id })
      .getOne()
  } catch (error) {
    console.error('Erro ao Buscar Desafio', error)
  }
}

async function findAll(): Promise<Desafio[]> {
  const desafios = await desafioRepository.createQueryBuilder('desafio').getMany()
  return desafios
}
