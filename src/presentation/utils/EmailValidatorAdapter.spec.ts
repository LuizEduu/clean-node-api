import { EmailValidatorAdapter } from './EmailValidator'

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@example.com')
    expect(isValid).toBe(false)
  })
})
