import { EmailValidatorAdapter } from './EmailValidatorAdapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  },
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@example.com')
    expect(isValid).toBe(false)
  })

  it('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('johndoe@example.com')
    expect(isValid).toBe(true)
  })

  it('Should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@example.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@example.com')
  })
})
