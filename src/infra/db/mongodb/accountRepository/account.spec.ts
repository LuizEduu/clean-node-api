import { MongoHelper } from '../helpers/mongoHelper'
import { AccountMongoRepository } from './Account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('John Doe')
    expect(account.email).toBe('johndoe@example.com')
    expect(account.password).toBe('123456')
  })
})
