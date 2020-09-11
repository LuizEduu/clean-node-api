import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

jest.mock('bcrypt', ()=>({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hashed_password'))
  }
}))

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_password')
    expect(hashSpy).toHaveBeenCalledWith('valid_password', salt)
  })

  it('Should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashedPassword = await sut.encrypt('valid_password')
    expect(hashedPassword).toBe('hashed_password')
  })
})
