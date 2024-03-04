import { Usuario } from './Usuario'
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('desafios')
export class Desafio {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_criador' })
  usuarioCriador: Usuario

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_acetou' })
  usuarioAceitou: Usuario

  constructor() {}
}
