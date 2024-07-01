import { Request, Response } from 'express'
import { usuarioRepository } from '../repositories/usuarioRepository'
import { Usuario } from '../entities/Usuario'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt' // Adicionar bcrypt para hash de senha

export class UsuarioController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, date_nasc, cpf, rg, username, password, email } = req.body as {
      name: string
      date_nasc: string // Assume que date_nasc é uma string do request
      cpf: string
      rg: number
      username: string
      password: string
      email: string
    }

    try {
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
        email,
      )

      usuario.moeda = 1000

      const savedUsuario = await usuarioRepository.save(usuario)
      // Remove a senha do objeto antes de enviar a resposta
      const { password: omitPassword, ...responseUsuario } = savedUsuario
      res.status(201).json(responseUsuario)
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async autenticar(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as { email: string; password: string }
    const secret = 'teste123'

    try {
      if (!email || !password) {
        return res.status(422).json({ msg: 'Email e senha são obrigatórios' })
      }

      const usuario = await findUsuario(email)
      if (!usuario) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
      }

      const passwordMatch = await bcrypt.compare(password, usuario.password) // Comparar hashes de senha
      if (!passwordMatch) {
        return res.status(422).json({ msg: 'Senha incorreta' })
      }

      const token = jwt.sign({ id: usuario.id }, secret)
      return res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error)
      return res.status(500).json({ msg: 'Internal Server Error' })
    }
  }
}

async function findUsuario(email: string): Promise<Usuario | null> {
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
