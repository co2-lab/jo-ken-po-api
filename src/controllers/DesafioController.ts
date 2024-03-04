import { Request, Response } from 'express'
import { desafioRepository } from '../repositories/desafioRepository'
import { usuarioRepository } from '../repositories/usuarioRespository'
import { Desafio } from '../entities/Desafio'

export class DesafioController {
  async create(req: Request, res: Response) {
    const { id } = req.body

    try {
      let usuario = await usuarioRepository.findOne(id)
      let desafio = new Desafio()
      if (usuario != null) desafio.usuarioCriador = usuario
      desafio = await desafioRepository.save(desafio)
      return res.status(201).json(desafio)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Insternal Server Error' })
    }
  }
}
