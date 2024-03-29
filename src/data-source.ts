import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
const { pool } = require('pg')

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})
export const findById = async (id: number) => {
  const query = 'SELECT * FROM usuarios WHERE id = $1'
  try {
    const res = await pool.query(query, [id])
    return res.rows[0] // Retorna o primeiro resultado
  } catch (error) {
    return null
  }
}
