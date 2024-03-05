import { Request, Response } from 'express'
import { usuarioRepository } from '../repositories/usuarioRepository'
import { Usuario } from '../entities/Usuario'

export class UsuarioController {
  async create(req: Request, res: Response) {
    const { name, date_nasc, cpf, rg, username, password, email } = req.body
    let usuario: Usuario = new Usuario(name, date_nasc, cpf, rg, username, password, email)

    try {
      if (usuario != null) {
        usuario = await usuarioRepository.save(usuario)
        console.log(usuario)
      }
      return res.status(201).json(usuario)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
