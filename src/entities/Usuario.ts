import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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

  constructor(
    name: string,
    date_nasc: Date,
    cpf: number,
    rg: number,
    username: string,
    password: string,
    email: string,
  ) {
    this.name = name
    this.date_nasc = date_nasc
    this.cpf = cpf
    this.rg = rg
    this.username = username
    this.password = password
    this.email = email
  }
}
