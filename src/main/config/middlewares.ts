import { Express, json } from 'express'
import { cors, contentType } from '../middlewares'

export default (app: Express): void => {
  app.use(json())
  app.use(cors)
  app.use(contentType)
}
