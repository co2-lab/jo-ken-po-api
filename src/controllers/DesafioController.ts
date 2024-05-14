import { desafioRepository } from "./../repositories/desafioRepository";
import { usuarioRepository } from "./../repositories/usuarioRepository";
import { Request, Response } from "express";
import { Desafio } from "../entities/Desafio";

export class DesafioController {
  async create(req: Request, res: Response) {
    const { id, escolhaDoUsuarioCriador } = req.body;
    console.log(id, escolhaDoUsuarioCriador);
    try {
      const newUsuario = await findUsuario(id);
      console.log(newUsuario);

      let desafio = new Desafio();
      if (newUsuario != null) {
        desafio.usuarioCriador = newUsuario;
        desafio.esolhaDoUsuarioCriador = escolhaDoUsuarioCriador;
      }

      desafio = await desafioRepository.save(desafio);
      return res.status(201).json({ message: "Desafio Criado" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async buscarDesafios(request: Request, response: Response) {
    const desafios = await execute();
    return response.json(desafios);
  }

  async aceitarDesafio(req: Request, res: Response) {
    const { idAceitou, idDesafio, escolhaDoUsuarioAceitou } = req.body;
    console.log(idAceitou);
    try {
      const newUsuario = await findUsuario(idAceitou);
      console.log(newUsuario);

      let desafio = await findDesafio(idDesafio);
      let pedra = "Pedra";
      let tesoura = "Tesoura";
      let papel = "Papel";
      let empate = "Empate";
      console.log(desafio);
      if (newUsuario != null && desafio != null) {
        desafio.usuarioAceitou = newUsuario;
        desafio.escolhaDoUsuarioAceitou = escolhaDoUsuarioAceitou;
        if (
          desafio.esolhaDoUsuarioCriador === desafio.escolhaDoUsuarioAceitou
        ) {
          desafio.resultado = empate;
          desafio = await desafioRepository.save(desafio);
          return res.status(201).json(desafio);
        } else if (
          (desafio.esolhaDoUsuarioCriador == pedra &&
            escolhaDoUsuarioAceitou == tesoura) ||
          (desafio.esolhaDoUsuarioCriador == tesoura &&
            escolhaDoUsuarioAceitou == papel) ||
          (desafio.esolhaDoUsuarioCriador == papel &&
            escolhaDoUsuarioAceitou == pedra)
        ) {
          desafio.resultado = desafio.esolhaDoUsuarioCriador;
          desafio = await desafioRepository.save(desafio);
          return res.status(201).json(desafio);
        } else {
          desafio.resultado = escolhaDoUsuarioAceitou;
          desafio = await desafioRepository.save(desafio);
          return res.status(201).json(desafio);
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

async function findUsuario(id: number) {
  try {
    return await usuarioRepository
      .createQueryBuilder("usuarios")
      .where("usuarios.id = :id", { id })
      .getOne();
  } catch (error) {
    console.error("Erro ao Informar  usuário:", error);
  }
}

async function findDesafio(id: number) {
  try {
    return await desafioRepository
      .createQueryBuilder("desafios")
      .where("desafios.id = :id", { id })
      .getOne();
  } catch (error) {
    console.error("Erro ao Buscar Desafio", error);
  }
}




async function execute() {
  const repo = desafioRepository;
  const desafios = await repo.find();
  return desafios;
}
