import express, { response, request, NextFunction } from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json())
  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PATCH,DELETE')
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    )
    next()
  })

  app.use(routes)
  const port = process.env.port || 3000
  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})
