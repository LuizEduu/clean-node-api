import { DbAddAccount } from '../../data/usecases/addAccount/DbAddAccount'
import { BcryptAdapter } from '../../infra/criptography/BcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/accountRepository/Account'
import SignUpController from '../../presentation/controllers/signup/SignUpController'
import { EmailValidatorAdapter } from '../../presentation/utils/EmailValidatorAdapter'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bCrypterAdapter = new BcryptAdapter(salt)
  const addAccount = new DbAddAccount(bCrypterAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, addAccount)
}
