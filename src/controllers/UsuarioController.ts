import { Request, Response } from 'express'
import { usuarioRepository } from '../repositories/usuarioRepository'
import { Usuario } from '../entities/Usuario'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UsuarioController {
  async create(req: Request, res: Response) {
    const { name, date_nasc, cpf, rg, username, password, email } = req.body

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    let usuario: Usuario = new Usuario(name, date_nasc, cpf, rg, username, passwordHash, email)

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
  async autenticar(req: Request, res: Response) {
    const { email, password } = req.body
    const secret = 'teste123'
    if (!email) {
      return res.status(422).json({ msg: 'o email é obrigatorio' })
    }
    if (!password) {
      return res.status(422).json({ msg: 'o password é obrigatorio' })
    }

    //buscar no banco e validar tanto usuario
    const usuario = await findUsuario(email)
    console.log(usuario)
    const checkPassword = null
    if (usuario != null) {
      const checkPassword = await bcrypt.compare(password, usuario.password)

      if (checkPassword == null) {
        return res.status(422).json({ msg: 'Senha incorreta' })
      }

      try {
        const token = jwt.sign(
          {
            id: usuario.id,
          },
          secret,
        )
        res.status(200).json({ msg: 'Autenticacao realizada com sucesso', token })
      } catch (error) {
        console.log(error)
        res.status(500).json({
          msg: error,
        })
      }
    } else {
      return res.status(422).json({ msg: 'Usuario Não Encontrado' })
    }
  }
}

async function findUsuario(email: string) {
  try {
    return await usuarioRepository
      .createQueryBuilder('usuarios')
      .where('usuarios.email = :email', { email })
      .getOne()
  } catch (error) {
    console.error('Erro ao Informar  usuário:', error)
  }
}
