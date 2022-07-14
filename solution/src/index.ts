import express, { Express, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import SalesOrderController from './controllers/SalesOrderController'
import { sequelize } from './models/Models'

const app: Express = express()
const port = 8044;

(async () => {
  await sequelize.sync()
})()

app.use(bodyParser.json())
app.use('/', new SalesOrderController().router)
app.get('/**', (req: Request, res: Response) => {
  res.status(404).send({ error: 404, message: 'not found' })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
