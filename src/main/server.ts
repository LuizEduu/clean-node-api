import { MongoHelper } from '../infra/db/mongodb/helpers/mongoHelper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => {
      console.log('server is running')
    })
  })
  .catch(console.error)
