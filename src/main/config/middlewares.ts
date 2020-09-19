import { Express, json } from 'express'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(json())
  app.use(cors )
}
