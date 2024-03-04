import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Desafio } from './Desafio'
import { Double } from 'mongodb'

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'date' })
  date_nasc: Date
  @Column({ type: 'double precision', unique: true })
  cpf: number
  @Column({ type: 'double precision', unique: true })
  rg: number
  @Column({ type: 'text', unique: true })
  username: string
  @Column({ type: 'text' })
  password: string
  @Column({ type: 'text', unique: true })
  email: string
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_cadastro: Date
}
