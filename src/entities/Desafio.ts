import { Usuario } from './Usuario'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('desafios')
export class Desafio {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  esolhaDoUsuarioCriador: Usuario

  @Column({ type: 'text', nullable: true })
  escolhaDoUsuarioAceitou: Usuario

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_criador' })
  usuarioCriador: Usuario

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_acetou' })
  usuarioAceitou: Usuario

  constructor() {}
}
