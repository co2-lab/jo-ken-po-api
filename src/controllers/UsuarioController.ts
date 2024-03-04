import { Usuario } from './../entities/Usuario'
import { Request, Response } from 'express'
import { usuarioRepository } from '../repositories/usuarioRespository'
import { Usuario } from '../entities/Usuario'

export class UsuarioController {
  async create(req: Request, res: Response) {
    const { usuario } = req.body

    try {
      if (usuario != null) usuarioRepository.save(usuario)

      const newUsuario = await usuarioRepository.save(usuario)
      return res.status(201).json(newUsuario)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
