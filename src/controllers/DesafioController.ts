import { Usuario } from './../entities/Usuario'
import { desafioRepository } from './../repositories/desafioRepository'
import { usuarioRepository } from './../repositories/usuarioRepository'
import { Request, Response } from 'express'
import { Desafio } from '../entities/Desafio'

export class DesafioController {
  async create(req: Request, res: Response): Promise<Response> {
    const { id, escolhaDoUsuarioCriador, valorDaAposta } = req.body
    console.log(id, escolhaDoUsuarioCriador, valorDaAposta)

    try {
      validarAposta(valorDaAposta)

      const newUsuario = await findUsuario(id)
      console.log(newUsuario)

      let desafio = new Desafio()
      if (newUsuario != null) {
        desafio.usuarioCriador = newUsuario
        desafio.esolhaDoUsuarioCriador = escolhaDoUsuarioCriador
        desafio.valorDaAposta = valorDaAposta
      }

      desafio = await desafioRepository.save(desafio)
      return res.status(201).json({ message: 'Desafio Criado' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async consultarApostasPorUsuario(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { userId } = req.params
    try {
      const usuario = await findUsuario(parseInt(userId))
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }
      const apostasCriadas = await desafioRepository.find({
        where: { usuarioCriador: usuario },
      })
      const apostasAceitas = await desafioRepository.find({
        where: { usuarioAceitou: usuario },
      })

      const todasApostas = { ...apostasCriadas, ...apostasAceitas }

      return res.status(200).json(todasApostas)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async usuarioComMaisApostas(req: Request, res: Response): Promise<Response> {
    try {
      const usuarios = await usuarioRepository.find()
      let maxApostas = 0
      let usuarioComMaisApostas: Usuario | null = null

      for (const usuario of usuarios) {
        const apostasCriadas = await desafioRepository.count({
          where: { usuarioCriador: usuario },
        })
        const apostasAceitas = await desafioRepository.count({
          where: { usuarioAceitou: usuario },
        })
        const totalApostas = apostasCriadas + apostasAceitas

        if (totalApostas > maxApostas) {
          maxApostas = totalApostas
          usuarioComMaisApostas = usuario
        }
      }
      if (usuarioComMaisApostas) {
        return res
          .status(200)
          .json({ usuario: usuarioComMaisApostas, apostas: maxApostas })
      } else {
        return res.status(404).json({ message: 'Nenhum usuário Encontrado' })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async maioresApostas(req: Request, res: Response): Promise<Response> {
    try {
      const desafios = await desafioRepository
        .createQueryBuilder('desafio')
        .orderBy('desafio.valorDaAposta', 'DESC')
        .limit(3)
        .getMany()

      if (desafios.length > 0) {
        return res.status(200).json(desafios)
      } else {
        return res.status(404).json({ message: 'Nenhuma Aposta encontrada' })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async maioresGanhadores(req: Request, res: Response): Promise<Response> {
    try {
      const usuarios = await usuarioRepository.find()
      const ganhadores: { usuario: Usuario; vitorias: number }[] = []

      for (const usuario of usuarios) {
        const vitorias = await desafioRepository.count({
          where: { resultado: usuario.id.toString() },
        })
        if (vitorias > 0) {
          ganhadores.push({ usuario, vitorias })
        }
      }

      ganhadores.sort((a, b) => b.vitorias - a.vitorias)
      const maioresGanhadores = ganhadores.slice(0, 5)
      return res.status(200).json(maioresGanhadores)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async buscarDesafios(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const desafios = await execute()
      return response.json(desafios)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'interna Server Error' })
    }
  }

  async aceitarDesafio(req: Request, res: Response): Promise<Response> {
    const { idAceitou, idDesafio, escolhaDoUsuarioAceitou, valorDaAposta } =
      req.body
    console.log(idAceitou)

    try {
      validarAposta(valorDaAposta)
      const newUsuario = await findUsuario(idAceitou)
      console.log(newUsuario)

      let desafio = await findDesafio(idDesafio)
      let pedra = 'Pedra'
      let tesoura = 'Tesoura'
      let papel = 'Papel'
      let empate = 'Empate'
      console.log(desafio)

      if (newUsuario != null && desafio != null) {
        desafio.usuarioAceitou = newUsuario
        desafio.escolhaDoUsuarioAceitou = escolhaDoUsuarioAceitou

        if (!verificarvalorAposta(desafio, valorDaAposta, res)) {
          return res.status(400).json({
            message: 'O valor da Aposta não Corresponde ao valor Original',
          })
        }

        if (desafio.valorDaAposta !== valorDaAposta) {
          return res.status(400).json({
            message: ' O valor da Aposta não corresponde ao valor Original',
          })
        }

        if (
          desafio.esolhaDoUsuarioCriador === desafio.escolhaDoUsuarioAceitou
        ) {
          desafio.resultado = empate
        } else if (
          (desafio.esolhaDoUsuarioCriador == pedra &&
            escolhaDoUsuarioAceitou == tesoura) ||
          (desafio.esolhaDoUsuarioCriador == tesoura &&
            escolhaDoUsuarioAceitou == papel) ||
          (desafio.esolhaDoUsuarioCriador == papel &&
            escolhaDoUsuarioAceitou == pedra)
        ) {
          desafio.resultado = desafio.esolhaDoUsuarioCriador
        } else {
          desafio.resultado = escolhaDoUsuarioAceitou
        }
        desafio = await desafioRepository.save(desafio)
        return res.status(201).json(desafio)
      }

      return res
        .status(404)
        .json({ message: 'Usuário ou Desafio não encontrado' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

function validarAposta(valorDaAposta: number): void {
  if (valorDaAposta < 10 || valorDaAposta > 10000) {
    throw new Error('O valor da aposta deve estar entre 10 e 10.000')
  }
}

function verificarvalorAposta(
  desafio: Desafio,
  valorDaAposta: number,
  res: Response,
): boolean {
  if (desafio.valorDaAposta !== valorDaAposta) {
    res
      .status(400)
      .json({ message: 'O valor da aposta não corresponde ao valor original' })
    return false
  }
  return true
}

async function findUsuario(id: number): Promise<Usuario | null> {
  try {
    return await usuarioRepository
      .createQueryBuilder('usuarios')
      .where('usuarios.id = :id', { id })
      .getOne()
  } catch (error) {
    console.error('Erro ao Informar  usuário:', error)
    return null
  }
}

async function findDesafio(id: number): Promise<Desafio | null> {
  try {
    return await desafioRepository
      .createQueryBuilder('desafios')
      .where('desafios.id = :id', { id })
      .getOne()
  } catch (error) {
    console.error('Erro ao Buscar Desafio', error)
    return null
  }
}

async function execute(): Promise<Desafio[]> {
  try {
    return await desafioRepository.find()
  } catch (error) {
    console.error('Erro ao Buscar Desafio', error)
    return []
  }
}
