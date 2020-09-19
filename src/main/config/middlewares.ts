import { Express, json } from 'express'
import { cors } from '../middlewares/cors'
import { contentType } from '../middlewares/contentType'

export default (app: Express): void => {
  app.use(json())
  app.use(cors)
  app.use(contentType)
}
