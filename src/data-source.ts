import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: 'postgres',
  password: 'root',
  database: 'api_rest_typescript',
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})
export const findById = async (id: number) => {
  const query = 'SELECT * FROM usuarios WHERE id = $1'
  try {
    // const res = await pool.query(query, [id])
    // return res.rows[0] // Retorna o primeiro resultado
  } catch (error) {
    return null
  }
}

console.log('passei Aqui')
