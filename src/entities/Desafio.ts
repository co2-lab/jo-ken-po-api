import { Usuario } from './Usuario'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('desafios')
export class Desafio {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text' })
  esolhaDoUsuarioCriador!: string

  @Column({ type: 'text', nullable: true })
  nome?: string

  @Column({ type: 'text', nullable: true })
  escolhaDoUsuarioAceitou?: string

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_criador' })
  usuarioCriador: Usuario

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_acetou' })
  usuarioAceitou: Usuario

  @Column({ type: 'text', nullable: true })
  resultado?: string

  @Column({ type: 'decimal', nullable: true })
  valorDaAposta?: number

  constructor() {}
}
