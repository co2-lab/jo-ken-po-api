import { Messages } from './../messagens'
import { Request, Response } from 'express'
import { usuarioRepository } from '../repositories/usuarioRepository'
import { Usuario } from '../entities/Usuario'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt' // Adicionar bcrypt para hash de senha

export class UsuarioController {
  async create (req: Request, res: Response): Promise<Response> {
    // eslint-disable-next-line camelcase
    const { name, date_nasc, cpf, rg, username, password, email } =
      req.body as {
        name: string
        date_nasc: string // Assume que date_nasc é uma string do request
        cpf: string
        rg: number
        username: string
        password: string
        email: string
      }

    try {
      // Verifica se o usuário já existe
      const usuarioExistente = await this.verificarUsuarioExistente(email, username)
      if (usuarioExistente) {
        return res.status(422).json({ message: Messages.USER_ALREADY_EXISTS })
      }
      const hashedPassword = await bcrypt.hash(password, 10) // Gerar hash da senha
      const cpfNumber = parseFloat(cpf.replace(/\D/g, ''))
      const formattedDataNasc = new Date(date_nasc)

      const usuario = new Usuario(
        name,
        formattedDataNasc,
        cpfNumber,
        rg,
        username,
        hashedPassword,
        email
      )

      usuario.moeda = 1000

      const savedUsuario = await usuarioRepository.save(usuario)
      // Remove a senha do objeto antes de enviar a resposta
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: omitPassword, ...responseUsuario } = savedUsuario
      return res.status(201).json(responseUsuario)
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      return res.status(500).json({ message: Messages.INTERNAL_SERVER_ERROR })
    }
  }

  async autenticar (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as { email: string; password: string }
    const secret = 'teste123'

    try {
      if (!email || !password) {
        return res.status(422).json({ message: Messages.EMAIL_AND_PASSWORD_REQUIRED })
      }

      const usuario = await findUsuario(email)
      if (!usuario) {
        return res.status(404).json({ message: Messages.NO_USERS_FOUND })
      }

      const passwordMatch = await bcrypt.compare(password, usuario.password) // Comparar hashes de senha
      if (!passwordMatch) {
        return res.status(422).json({ message: Messages.INCORRECT_PASSWORD })
      }

      const token = jwt.sign({ id: usuario.id }, secret)
      return res
        .status(200)
        .json({ msg: Messages.AUTHENTICATION_SUCCESS, token })
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error)
      return res.status(500).json({ message: Messages.INTERNAL_SERVER_ERROR })
    }
  }

  async verificarUsuarioExistente (email: string, username: string): Promise<boolean> {
    try {
      const usuarioPorEmail = await usuarioRepository.findOne({ where: { email } })
      const usuarioPorUsername = await usuarioRepository.findOne({ where: { username } })
      return usuarioPorEmail !== null || usuarioPorUsername !== null
    } catch (error) {
      console.error('Erro ao verificar se o usuário já existe:', error)
      return false
    }
  }
}

async function findUsuario (email: string): Promise<Usuario | null> {
  try {
    return await usuarioRepository
      .createQueryBuilder('usuarios')
      .where('usuarios.email = :email', { email })
      .getOne()
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return null
  }
}
