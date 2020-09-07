import { DbAddAccount } from './DbAddAccount'
import {
  Encrypter,
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
} from './DbAddAccountProtocols'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(password: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'hashed_password',
      }
      return await new Promise((resolve) => resolve(fakeAccount))
    }
  }

  return new AddAccountRepository()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  }
}

describe('DbAddAccount Usecase', () => {
  it('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('123456')
  })

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const accountData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashed_password',
    })
  })

  it('Should throw if DbAddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const accountData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
