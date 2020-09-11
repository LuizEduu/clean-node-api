import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hashed_password'))
  },
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_password')
    expect(hashSpy).toHaveBeenCalledWith('valid_password', salt)
  })

  it('Should return a hash on success', async () => {
    const sut = makeSut()
    const hashedPassword = await sut.encrypt('valid_password')
    expect(hashedPassword).toBe('hashed_password')
  })

  it('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest
      .spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const promise = sut.encrypt('valid_password')
    await expect(promise).rejects.toThrow()
  })
})
