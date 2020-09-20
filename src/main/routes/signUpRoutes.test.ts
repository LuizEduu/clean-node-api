import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongoHelper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('Should return an account on success', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(200)
  })
})
